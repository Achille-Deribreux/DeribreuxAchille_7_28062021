const models = require ('../models');
const utils  = require('../utils/utils');
const fs = require('fs');
require('dotenv').config();


exports.getAll = (req, res, next)=>{

    models.Posts.findAll({
        order: [['createdAt', 'DESC']]
    })
    .then((posts)=> res.status(203).json(posts))
    .catch((error) => res.status(400).json({ error }));
}
exports.createPost = (req, res, next)=>{
    let userId = utils.getUserId(req.headers.authorization)
    let content = req.body.content;
    models.Users.findOne({
        where: { id: userId }
    })
    .then(user =>{
        if(req.file){
        const newPost = models.Posts.create({
            UserId : userId,
            content: content,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            likes:0,
            userliked : ''
        })
        .then(newPost => { res.status(201).json({ 'post': newPost,'user' : user }) }) //Besoin des objets en réponse ?

        .catch(error => {
            res.status(500).json({ error })
        })
        }else{
            const newPost = models.Posts.create({
                UserId : userId,
                content: content,
            })
            .then(newPost => { res.status(201).json({ 'post': newPost,'user' : user }) }) //Besoin des objets en réponse ? 
            .catch(error => {
                res.status(500).json({ error })
            })
        }

    })
    .catch(err => { res.status(500).json({ err }) });
}

exports.getUserPosts = (req, res, next)=>{
    let user_id = req.params.id;
    models.Posts.findAll({
        order: [['createdAt', 'DESC']],
        where: { userid: user_id }
    })
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch((error) => res.status(400).json({ error }));
}

exports.getOnePost = (req, res, next ) => {
    let post_id = req.params.id;
    models.Posts.findOne({
        where: { id: post_id }
    })
    .then(post => {
        res.status(200).json(post)
    })
    .catch((error) => res.status(400).json({ error }));
}


exports.modifyPost = (req, res, next ) => {
    let id = utils.getUserId(req.headers.authorization);
    models.Users.findOne({
        where: { id: id }
    })
    .then(user => {
        if (user && (user.isAdmin == true || user.id == req.body.author)) {
            models.Posts
                .findOne({
                    where: { id: req.body.postId }
                })
                .then((postFind) =>{
                    if (req.file){
                        const filename = postFind.imageUrl.split('/images/')[1];
                    fs.unlink(`images/${filename}`, () => {
                        models.Posts.update(
                            {   
                                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                                content: req.body.content
                            },
                            { where: { id: req.body.postId } }
                        )
                        .then(() => res.status(201).json({ 'userId': id}))
                        .catch(err => res.status(500).json(err))
                    })}
                    else{
                        models.Posts.update(
                            {
                                content: req.body.content
                            },
                            { where: { id: req.body.postId } }
                        )
                        .then(() => res.status(201).json({ 'userId': id}))
                        .catch(err => res.status(500).json(err))
                    }
                })
                .catch(err => res.status(500).json(err))
        }
        else {
            res.status(401).json({ error: 'Utilisateur non autorisé à modifier ce post' })
        }
    })
    .catch(error => res.status(500).json(error));
}
exports.deletePost = (req, res, next ) => {

    let id = utils.getUserId(req.headers.authorization);
    models.Users.findOne({
        where: { id: id }
    })
    .then(user => {
        if (user && (user.isAdmin == true || user.id == req.body.author)) {
            models.Posts
                .findOne({
                    where: { id: req.body.postId }
                })
                .then((postFind) => {
                    if (postFind.imageUrl) {
                        const filename = postFind.imageUrl.split('/images/')[1];
                        fs.unlink(`images/${filename}`, () => {
                            models.Posts
                                .destroy({
                                    where: { id: postFind.id }
                                })
                                .then(() => res.end())
                                .catch(err => res.status(500).json(err))
                        })
                    }
                    else {
                        models.Posts
                            .destroy({
                                where: { id: postFind.id }
                            })
                            .then(() => res.end())
                            .catch(err => res.status(500).json(err))
                    }
                })
                .catch(err => res.status(500).json(err))
        }
        else {
            res.status(401).json({ error: 'Utilisateur non autorisé à modifier ce post' })
        }
    }
    )
    .catch(error => res.status(500).json(error));
}


exports.postComment = (req, res, next ) => {
    let userid = utils.getUserId(req.headers.authorization);
    models.Posts.findOne(
        {
            where: {id:req.body.postid}
        })
        .then((postFind) => {
            const newComment = models.Comments.create({
                PostId : req.body.postid,
                UserId : userid,
                content: req.body.content
            })
            .then((newComment) => {
                console.log("comment", newComment);
                res.status(201).json(newComment);
            })
            .catch((error) => res.status(500).json({ error }));
        })
        .catch(err => res.status(500).json(err))
}

exports.getAllComments = (req, res, next ) => {
    models.Comments.findAll({
        where: { postId : req.params.id },
        order: [['createdAt', 'ASC']]
    })
    .then((comments) => {
        res.status(203).json(comments)})
    .catch((error) => res.status(400).json({ error }));
}

exports.deleteComment = (req, res, next ) => { 
    let id = utils.getUserId(req.headers.authorization);
    models.Users.findOne({
        where: { id: id }
    })
    .then(user => {
        if (user && (user.isAdmin == true || user.id == req.body.author)) {
            models.Comments
                .findOne({
                    where: { id: req.body.commentId }
                })
                .then((commentFind) => {
                    models.Comments
                    .destroy({
                        where: { id: commentFind.id }
                    })
                    .then(() => res.status(200).json("commentaire supprimé !"))
                    .catch(err => res.status(500).json(err))
                })
                .catch(error => res.status(500).json(error));
            }
    })
    .catch(error => res.status(500).json(error));
}


exports.likePost = (req, res, next ) => { 
    let userId = req.body.userId;
    let postid = req.body.postId;

    models.Posts.findOne(
        {
            where: {id:postid}
        })
        .then((postFind) => {
            let userLikedString =  postFind.userliked;
            let userLikedStringConcat = userLikedString.concat(userId+";");
            let likes = postFind.likes + 1;
            models.Posts.update(
                {
                    userliked : userLikedStringConcat,
                    likes : likes
                },
                { where: { id: postid } }
            )
            .then(() => res.status(201).json('liked !'))
            .catch(err => res.status(500).json(err))
        
        })
        .catch(err => res.status(500).json(err))

}

exports.unLikePost = (req, res, next) => {
    let userId = req.body.userId;
    let postid = req.body.postId;

    models.Posts.findOne(
        {
            where: {id:postid}
        })
        .then((postFind) => {
            let userLikedString =  postFind.userliked;
            console.log("string récupéré", userLikedString)
            let userLikedStringArray = userLikedString.split(";");
            console.log("string split en array", userLikedStringArray)
            console.log("user id", userId)
            for (let i = 0;i < userLikedStringArray.length;i++){
                console.log("valeurs qui défilent", userLikedStringArray[i])
                if (userLikedStringArray[i] == (userId)){
                    userLikedStringArray.splice(i,1);
                    console.log("après slice", userLikedStringArray);
                }
            }
            console.log("avant join", userLikedStringArray);
            let concatUserLikedStringArray = userLikedStringArray.join(';')
            console.log("après join", concatUserLikedStringArray);
            let likes = postFind.likes - 1;

            models.Posts.update(
                {
                    userliked : concatUserLikedStringArray,
                    likes : likes
                },
                { where: { id: postid } }
            )
            .then(() => res.status(201).json('unliked !'))
            .catch(err => res.status(500).json(err))
        
        })
        .catch(err => res.status(500).json(err))
}

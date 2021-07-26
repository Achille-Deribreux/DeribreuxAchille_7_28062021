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
    
    //attachement à faire
    models.Users.findOne({
        where: { id: userId }
    })
    .then(user =>{
        const newPost = models.Posts.create({
            UserId : userId,
            content: content,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        })
        .then(newPost => { res.status(201).json({ 'post': newPost,'user' : user }) }) //Besoin des objets en réponse ? 
        .catch(error => {
            res.status(500).json({ error })
        })

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
            models.Posts.update(
                    { //req.file ? {imgUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`}:{null}
                        content: req.body.content
                       
                    },
                    { where: { id: req.body.postId } }
                )
                .then(() => res.status(201).json({ 'userId': id}))
                .catch(err => res.status(500).json(err))
        }
        else {
            res.status(401).json({ error: 'Utilisateur non autorisé à modifier ce post' })
        }
    }
    )
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

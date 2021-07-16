const models = require ('../models');
const utils  = require('../utils/utils');
require('dotenv').config();


exports.getAll = (req, res, next)=>{

    models.Posts.findAll({
        order: [['createdAt', 'DESC']]
    })
    .then((posts)=> res.status(203).json(posts))
    .catch((error) => res.status(400).json({ error }));
}

exports.createPost = (req, res, next)=>{
    console.log("filename",req.file.filename)
    console.log("content",req.body.content)



    let userId = utils.getUserId(req.headers.authorization)
    console.log(userId);
    let content = req.body.content;
    //attachement à faire
    models.Users.findOne({
        where: { id: userId }
    })
    .then(user =>{
        const newPost = models.Posts.create({
            UserId : userId,
            content: content,
            imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}` 
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
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
    let userId = utils.getUserId(req.headers.authorization)
    let content = req.body.content;
    //attachement à faire
    console.log(userId);
    models.Users.findOne({
        where: { id: userId }
    })
    .then(user =>{
        const newPost = models.Posts.create({
            UserId : userId,
            content: content,
            time:Date.now(), // A dégager
            userliked:"none" //A dégager
        })
        .then(newPost => { res.status(201).json({ 'post': newPost,'user' : user }) }) //Besoin des objets en réponse ? 
                    .catch(error => {
                        res.status(500).json({ error })
                    })

    })
    .catch(err => { res.status(500).json({ err }) });
}
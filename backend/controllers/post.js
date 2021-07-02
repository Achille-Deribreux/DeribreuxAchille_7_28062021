const models = require ('../models');
require('dotenv').config();


exports.getAll = (req, res, next)=>{

    models.Posts.finAll({
        order: [['createdAt', 'DESC']]
    })
    .then((posts)=> res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error }));
}

exports.createPost = (req, res, next)=>{
    
}
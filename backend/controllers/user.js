//Imports

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require ('../models');
const utils  = require('../utils/utils');
const fs = require('fs');
require('dotenv').config();

//Méthode création de compte
exports.signup = (req, res, next)=>{

    let mail = req.body.mail;
    let firstname = req.body.prenom;
    let password = req.body.password;
    let lastname = req.body.nom;
    let team = req.body.team;
    let isAdmin = req.body.isAdmin;
//Vérifications à introduire

    if (mail == null || password == null ) {
        res.status(400).json({ error: 'il manque un paramètre' })
    }
    
    models.Users.findOne({
        attributes: ['mail'],
        where: { mail: mail }
    })
    .then(user => {
        if (!user) {
            bcrypt.hash(password, 10)
            .then((hash) => {
                if(req.file){
                    const newUser = models.Users.create({
                        mail: mail,
                        firstname: firstname,
                        password: hash,
                        lastname:lastname,
                        team:team,
                        isadmin : isAdmin,
                        profileurl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                    })
                        .then(newUser => { 
                            
                            res.status(201).json({
                             'id': newUser.id,
                             'token': jwt.sign(
                                { userId: newUser.id },
                                process.env.TOKEN_KEY,
                                { expiresIn: '24h' }
                              ),
                              isAuth : true
                            }) 
                        })
                        .catch(error => {
                            res.status(500).json({ error })
                        })
                }
                else{
                // Création de l'user
                console.log("req",req.body.isAdmin);
                console.log(isAdmin);
                console.log("on bloque avant le enwUser")
                const newUser = models.Users.create({
                    mail: mail,
                    firstname: firstname,
                    password: hash,
                    lastname:lastname,
                    team:team,
                    isadmin : isAdmin,
                    //profileurl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                })
                    .then(newUser => { 
                        console.log("on arrive ici")
                        
                        res.status(201).json({
                         'id': newUser.id,
                         token: jwt.sign(
                            { userId: newUser.id },
                            process.env.TOKEN_KEY,
                            { expiresIn: '24h' }
                          ),
                          isAuth : true
                        }) 
                    })
                    .catch(error => {
                        res.status(500).json({ error })
                    })}
            })
            .catch(err => { res.status(500).json({ err }) });
        }
        else {
            res.status(409).json({ error: "Utilisateur existant" })
        }
    })      
    .catch(err => { res.status(500).json({ err }) });
}



//méthode de connexion
exports.login = (req, res, next)=>{
    let mail = req.body.mail;
    let password = req.body.password;

    models.Users.findOne({
        attributes: ['mail', 'password','id'],
        where: { mail: mail }
        })
    .then(user =>{
        if (!user){
            return res.status(401).json({error : "utilisateur non trouvé !"})
        }
        bcrypt.compare(password, user.password)
            .then(valid=>{
                if(!valid){
                    return res.status(401).json({error : "mdp incorrect!"})
                }
                res.status(200).json({
                    userId : user.id,
                    token: jwt.sign(
                        { userId: user.id },
                        process.env.TOKEN_KEY,
                        { expiresIn: '24h' }
                      ),
                      isAuth : true
                });
            })
            .catch(error => res.status(500).json({error}))    
    })
    .catch(error => res.status(500).json({error}));
}

exports.getUser= (req, res, next) => {
    let user_id = req.params.id;
    models.Users.findOne({
        where: {id: user_id}
    })
    .then(user =>{
        if (!user){
            return res.status(401).json({error : "utilisateur non trouvé !"})
        }
        else{
            return res.status(200).json({'user':user})
        }
    })
    .catch(error => res.status(500).json({error}));
}

exports.getUsers= (req, res, next) => {
    models.Users.findAll({
        order: [['createdAt', 'DESC']]
    })
    .then((users)=> res.status(203).json(users))
    .catch((error) => res.status(400).json({ error }));
}

exports.getUserId = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const userId = jwt.verify(token,  process.env.TOKEN_KEY);
        return res.status(200).json({"userId" : userId});
    }catch {
        res.status(401).json({
          error: new Error('Invalid Token!')
        });
    }
}

exports.updateUser = (req, res, next) => {
    let id = utils.getUserId(req.headers.authorization);
    models.Users.findOne({
        where: { id: id }
    })
    .then(user => {
        if (req.body.password){
            bcrypt.hash(req.body.password, 10)
            .then((hash) => {
                models.Users.update(
                    { 
                    password : hash
                    },
                    { where: { id: id } }
                )
                .then(() => res.status(200).json("Réussi"))
                .catch(err => res.status(500).json(err))
            })
            .catch((error) => res.status(500).json({ error }));
        }     
        if (req.file){
            if (user.profileurl){
                const filename = user.profileurl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    models.Users.update(
                        { 
                        mail : req.body.mail,
                        firstname : req.body.prenom,
                        lastname: req.body.nom,
                        //password : BCRYPT
                        team: req.body.team,
                        isAdmin: req.body.isAdmin,
                        profileurl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                        },
                        { where: { id: id } }
                    )
                    .then(() => res.status(200).json("Réussi"))
                    .catch(err => res.status(500).json(err))
                })
            }
            else{
                models.Users.update(
                    { 
                    mail : req.body.mail,
                    firstname : req.body.prenom,
                    lastname: req.body.nom,
                    //password : BCRYPT
                    team: req.body.team,
                    isAdmin: req.body.isAdmin,
                    profileurl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                    },
                    { where: { id: id } }
                )
                .then(() => res.status(200).json("Réussi"))
                .catch(err => res.status(500).json(err))
            }
        }
        else{
            models.Users.update(
                { 
                mail : req.body.mail,
                firstname : req.body.prenom,
                lastname: req.body.nom,
                //password : BCRYPT
                team: req.body.team,
                isAdmin: req.body.isAdmin
                },
                { where: { id: id } }
            )
            .then(() => res.status(200).json("Réussi"))
            .catch(err => res.status(500).json(err))
        }
    }
    )
    .catch(error => res.status(500).json(error));
}

exports.deleteUser = (req, res, next) => {
    let id = utils.getUserId(req.headers.authorization);
    models.Users.findOne({
        where: { id: id }
    })
    .then((user) => {
        if (user && (user.isAdmin == true || user.id == req.body.accountId)) {
            if (user.profileurl) {
                const filename = user.profileurl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    models.Users
                        .destroy({
                            where: { id: req.body.accountId }
                        })
                        .then(() => res.end())
                        .catch(err => res.status(500).json(err))
                })
            }
            else {
                models.Users
                        .destroy({
                            where: { id: req.body.accountId }
                        })
                        .then(() => res.end())
                        .catch(err => res.status(500).json(err))
            }  
        }
        else {
            res.status(401).json({ error: 'Utilisateur non autorisé à modifier ce post' })
        }})
    .catch(err => res.status(500).json(err))
}
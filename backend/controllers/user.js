//Imports

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require ('../models');
require('dotenv').config();

//Méthode création de compte
exports.signup = (req, res, next)=>{

    let mail = req.body.mail;
    let firstname = req.body.prenom;
    let password = req.body.password;
    let lastname = req.body.nom;
    let team = req.body.team;

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
                // Création de l'user
                const newUser = models.Users.create({
                    mail: mail,
                    firstname: firstname,
                    password: hash,
                    lastname:lastname,
                    team:team,
                    isadmin : false
                })
                    .then(newUser => { res.status(201).json({
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
                    })
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
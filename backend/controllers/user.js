//Imports

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require ('../models');
require('dotenv').config();

//Méthode création de compte
exports.signup = (req, res, next)=>{
    console.log(req.body)
    
    let mail = req.body.mail;
    let firstname = req.body.firstname;
    let password = req.body.password;
    let lastname = req.body.lastname;
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
                    .then(newUser => { res.status(201).json({ 'id': newUser.id }) })
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

}
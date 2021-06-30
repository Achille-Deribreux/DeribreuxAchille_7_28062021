//Imports

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require ('../models');
require('dotenv').config();

//Méthode création de compte
exports.signup = (req, res, next)=>{
    let mail = req.body.mail;
    let firstname = req.body.firstname;
    let password = req.body.password;
    let lastname = req.body.lastname;
    let team = req.body.team;


/*
    if (mail == null || password == null) {
        res.status(400).json({ error: 'il manque un paramètre' })
    }

    models.Users.findOne({
        attributes: ['mail'],
        where: { mail: mail }
    })
    .then(user => {
        if (!user) {
            bcrypt.hash(password, 10, (hash) => {*/
                // Création de l'user
                const newUser = models.Users.create({
                    //userid:123,
                    mail: mail,
                    firstname: firstname,
                    password: password,
                    lastname:lastname,
                    team:team
                })
                    .then(newUser => { res.status(201).json({ 'id': newUser.userid }) })
                    .catch(error => {
                        res.status(500).json({ error })
                    })/*
            })
        }
        else {
            res.status(409).json({ error: "Utilisateur existant" })
        }
    })
    .catch(err => { res.status(500).json({ err }) });*/
}




exports.login = (req, res, next)=>{

}
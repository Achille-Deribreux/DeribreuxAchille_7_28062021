//Imports
const express = require('express');//Importe express
const mongoose = require('mongoose'); 
const path = require('path');

const app = express();//crée une app express

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(express.json()); //remplace body parser

//redirection vers les routes

//

module.exports = app;//exporte l'application pour pourvoir l'utiliser depuis les autres fichiers tels que le serveur node
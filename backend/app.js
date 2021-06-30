//Imports
const express = require('express');//Importe express
const path = require('path');
const userRoutes = require('./routes/user');
require('dotenv').config();
const { Sequelize } = require('sequelize');

const app = express();//crée une app express

const sequelize = new Sequelize('p7_dev', 'achille', 'achille', {
  host: 'localhost',
  dialect: 'mysql'
});
/* TEST CONNEXION DB*/

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(express.json()); //remplace body parser

app.use('/api/auth',userRoutes);

//redirection vers les routes

//

module.exports = app;//exporte l'application pour pourvoir l'utiliser depuis les autres fichiers tels que le serveur node
//Imports
const express = require('express');//Importe express
const path = require('path');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
require('dotenv').config();
const { Sequelize } = require('sequelize');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const app = express();//crée une app express

app.use(cors())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  

app.use('/api/auth',userRoutes);
app.use('/api/post',postRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

//Use le package helmet
app.use(helmet());

module.exports = app;//exporte l'application pour pourvoir l'utiliser depuis les autres fichiers tels que le serveur node
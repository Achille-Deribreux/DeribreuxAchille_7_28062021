const express = require('express');

// Imports 
const http = require('http'); //Import http
const app = require('./app'); //Import app

//Retourne un port valide
const normalizePort = val => {
    const port = parseInt(val, 10);
  
    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
  };
//Ajout du port de connection, s'il n'est pas déclaré par l'environnement on utilise le port 3000
const port = normalizePort(process.env.PORT || '3000');

app.set('port', port); //Set du port de connection

//Recherche les différentes erreurs et les gère de manière appropriée
const errorHandler = error => {
    if (error.syscall !== 'listen') {
      throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges.');
        process.exit(1);
      case 'EADDRINUSE':
        console.error(bind + ' is already in use.');
        process.exit(1);
      default:
        throw error;
    }
  };
  //Création du serveur
  const server = http.createServer(app);
  
//Au lancement du serveur, lance errorHandler pour la gestion d'erreur
  server.on('error', errorHandler);
  server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
  });
  
  //Serveur écoute le port définit dans la const port (environnement ou 3000)
  server.listen(port);


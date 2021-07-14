//Imports
const express = require('express');
const userCtrl = require('../controllers/user');


//Création d'un router
const router = express.Router()

//Routes

router.get('/getusers', userCtrl.getUsers);

router.get('/getuserId', userCtrl.getUserId);

router.post('/signup', userCtrl.signup);

router.post('/login',  userCtrl.login);

router.get('/:id', userCtrl.getUser);


//Export
module.exports = router;
//Imports
const express = require('express');
const userCtrl = require('../controllers/user');

//Création d'un router
const router = express.Router()

//Routes
router.post('/signup', userCtrl.signup);

router.post('/login',  userCtrl.login);

//Export
module.exports = router;
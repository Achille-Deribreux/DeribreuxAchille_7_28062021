//Imports
const express = require('express');
const postCtrl = require('../controllers/post');
const auth = require('../middlewares/auth');

//Création d'un router
const router = express.Router()

//Routes
router.get('/home', postCtrl.getAll);
router.post('/write', postCtrl.createPost);

//Export
module.exports = router;
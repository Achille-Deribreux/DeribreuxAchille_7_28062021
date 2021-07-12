//Imports
const express = require('express');
const postCtrl = require('../controllers/post');
const auth = require('../middlewares/auth');

//Création d'un router
const router = express.Router()

//Routes
router.get('/home',auth, postCtrl.getAll);
router.post('/write', postCtrl.createPost);
router.get('/:id', postCtrl.getUserPosts)

//Export
module.exports = router;
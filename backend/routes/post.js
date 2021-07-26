//Imports
const express = require('express');
const postCtrl = require('../controllers/post');
const auth = require('../middlewares/auth');
const multer = require ('../middlewares/multer-config');

//Création d'un router
const router = express.Router()

//Routes
//CommentRoutes
router.get('/getAllComments', postCtrl.getAllComments)
router.post('/postComment', multer, postCtrl.postComment)
router.delete('/deleteComment', multer, postCtrl.deleteComment)
router.get('/home',postCtrl.getAll);
router.post('/update', multer, postCtrl.modifyPost)
router.post('/write', multer, postCtrl.createPost);
router.delete('/delete', multer,postCtrl.deletePost)
router.get('/getpost/:id', postCtrl.getOnePost);
router.get('/:id', postCtrl.getUserPosts);


//Export
module.exports = router;
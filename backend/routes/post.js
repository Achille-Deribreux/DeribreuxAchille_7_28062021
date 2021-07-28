//Imports
const express = require('express');
const postCtrl = require('../controllers/post');
const auth = require('../middlewares/auth');
const multer = require ('../middlewares/multer-config');

//Création d'un router
const router = express.Router()

//Routes
//CommentRoutes
router.put('/likePost', auth, multer, postCtrl.likePost);
router.put('/unlikePost', auth, multer, postCtrl.unLikePost);
router.get('/getAllComments/:id',auth,  postCtrl.getAllComments)
router.post('/postComment', auth, multer, postCtrl.postComment)
router.delete('/deleteComment', auth, multer, postCtrl.deleteComment)
router.get('/home', postCtrl.getAll);
router.post('/update', auth, multer, postCtrl.modifyPost)
router.post('/write', auth, multer, postCtrl.createPost);
router.delete('/delete', auth, multer,postCtrl.deletePost)
router.get('/getpost/:id', auth, postCtrl.getOnePost);
router.get('/:id', auth, postCtrl.getUserPosts);


//Export
module.exports = router;
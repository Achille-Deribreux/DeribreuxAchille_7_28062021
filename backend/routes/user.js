//Imports
const express = require('express');
const userCtrl = require('../controllers/user');
const multer = require ('../middlewares/multer-config');
const auth = require('../middlewares/auth');
//Création d'un router
const router = express.Router()

//Routes

router.delete ('/delete', auth, multer, userCtrl.deleteUser);

router.post ('/updateuser', auth, multer, userCtrl.updateUser);

router.get('/getusers', auth, userCtrl.getUsers);

router.get('/getuserId', auth, userCtrl.getUserId);

router.post('/signup', multer, userCtrl.signup);

router.post('/login',  userCtrl.login);

router.get('/:id', auth, userCtrl.getUser);


//Export
module.exports = router;
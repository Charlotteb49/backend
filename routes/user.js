const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer-config')

router.post('/signup', multer, userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/users', userCtrl.getAllUsers);
router.get('/:id', userCtrl.getAuthenticatedUser);
router.get('/users/:username', userCtrl.getUser);
router.patch('/:id', userCtrl.updateOneUser);






module.exports = router;
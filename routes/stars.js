const express = require('express')
const auth = require('../middleware/auth')
const router = express.Router();
const starCtrl = require('../controllers/stars')


router.post('/', auth, starCtrl.createThing);
router.get('/', auth, starCtrl.getAllThing);
router.delete('/:id', auth,  starCtrl.deleteThing);



module.exports = router;
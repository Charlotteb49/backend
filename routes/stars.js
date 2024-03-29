const express = require('express')
const auth = require('../middleware/auth')
const router = express.Router();
const starCtrl = require('../controllers/stars')


router.post('/', starCtrl.createThing);
router.get('/',  starCtrl.getAllThing);
router.delete('/:id', starCtrl.deleteThing);
router.get('/:user', starCtrl.getAllThingByUser)
router.patch('/:id', starCtrl.updateOneThing)



module.exports = router;
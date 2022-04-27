let express = require('express');
const verifyToken = require('../../middleware/auth');
let router = express.Router();
const controller = require('./fav.controller');
const auth = require('../../middleware/auth')

router.post('/fav' ,  controller.create )
router.post('/find',auth.verifyuserToken, controller.find)
//router.get('/get/:id' , controller.get) 
router.post('/post',controller.find)
module.exports = router;
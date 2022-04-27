let express = require('express');
let router = express.Router();
const validate = require("./sign.validate");
const controller = require('./sign.controller');
const verifyToken = require('../../middleware/auth')

router.post('/insert'  ,[validate.checkDuplicateItems ,validate.checkMissingFields] , controller.create);
router.post('/login' , controller.login);
//router.post('/insert' , controller.create);
router.patch('/upto' ,[verifyToken.verifyToken] , controller.update);
router.post('/img' , controller.image);
router.get('/obj' ,controller.get)

module.exports = router;
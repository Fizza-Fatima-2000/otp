let express = require('express');
let router = express.Router();

const controller = require('./otp.controller');


router.post('/insert'  , controller.insert);
router.post('/login' , controller.find);
router.post('/resend' , controller.resend)
module.exports = router;
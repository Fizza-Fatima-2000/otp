'use strict';

let express = require('express');
let router = express.Router();

const signRoutes =require('../../app/apis/sign/sign.routes')
const favRoutes = require('../../app/apis/fav/fav.route') 
const otpRoutes = require('../../app/apis/otp/otp.routes')
router.use('/add', signRoutes);
router.use('/odd' , favRoutes);

router.use('/otp' , otpRoutes);
// router.use('/otp_codes', otp_codesRoutes);
// router.use('/api_list', api_listRoutes);

module.exports = router;

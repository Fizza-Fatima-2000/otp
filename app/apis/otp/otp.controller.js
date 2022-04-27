const express = require('express');
const { otp } = require("../../../app/models/index");
const axios = require('axios')

//const { Otp } = require("../../models/otp.model");
const app = express();


exports.insert = async (req, res) => {

    let otpcode = Math.floor((Math.random() * 10000) + 1);
    let datetime = new Date().getTime() / 1000 + 300
    console.log(datetime);
    const data = await otp.create({
        user_id: req.body.user_id,
        otp_code: otpcode,
        expireIn: datetime,
        is_verified: false


    })
    var mobile_no = "03161620898"
    var url = `https://bsms.telecard.com.pk/SMSportal/Customer/apikey.aspx?apikey=${process.env.otp_api}&msg=Your verification code is ${otpcode} from olx. &mobileno=${mobile_no}`
    var send = await  axios({
        method:'post',
        url
    })
    console.log(send);
    res.send(200);

}




exports.find = async (req, res) => {
    var date  =new Date().getTime() / 1000;
    console.log(date);
    let data = await otp.findOne({
        user_id: req.body.user_id,
        is_verified: false,
        otp_code: req.body.otp_code,
        expireIn: { $gte: date }
    }
    )

    if (data) {
        console.log(data);
        var up = await otp.updateOne({
            _id: data._id

        }, {
            is_verified: true
        }
        )
        console.log(up);
    }
    return res.send("success");



}

exports.resend = async (req, res) => {

var opt_resend =Math.floor((Math.random() * 10000) + 1);
var date =new Date().getTime() /1000
    let resend = await otp.findOne({

        user_id: req.body.user_id,
        is_verified: false
    })

    if (resend) {
        console.log(resend);
        var resendUpdate = await otp.updateOne({
            _id: resend._id
        }
        ,{
            otp_code: opt_resend,
            expireIn:  date 
        }
        )
    } 
    else{
       
        const insert = await otp.create({
            user_id: req.body.user_id,
            otp_code: opt_resend,
            expireIn: date,
            is_verified: false
        })
        console.log("one");
    }
    

    var mobile_no = "03161620898"
    var url = `https://bsms.telecard.com.pk/SMSportal/Customer/apikey.aspx?apikey=${process.env.otp_api}&msg=Your verification code is ${opt_resend} from olx. &mobileno=${mobile_no}`
    var send = await  axios({
        method:'post',
        url
    })
    console.log(send);
    return res.send("success"); 

}







//         let otpData = new Otp({
//         _id : req.body._id,
//         otpcode :req.body.otpcode,
//         expireIn  : new Date().getTime()+300*1000
//         })
//         return res.send(otpData)
//     }
//     else{
//         res.send("error")
//     }
// }



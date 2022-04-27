require("dotenv").config();
require("../../../app/config/db")
const res = require("express/lib/response");
const { sign } = require("../../../app/models/index");

const { serverError, success } = require("../../../app/util/helper")
const jwt = require('jsonwebtoken');
//const req = require("express/lib/request");
const bcrypt = require('bcryptjs');
const fs = require("fs");
const { object } = require("mongoose/lib/utils");
const { email } = require("validatorjs/src/lang/en");


exports.create = async (req, res) => {

  try {
    const { email, password, phone_no } = req.body;

    console.log(email);
    console.log(password);
    console.log(phone_no);

    if (!(email || phone_no && password)) {
      return res.status(400).send("All input is required");
    }

    const oldUser = await sign.findOne({ email, phone_no });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    encryptedPassword = await bcrypt.hash(password, 10);


    const users = await sign.create({

      email: req.body.email,
      phone_no: req.body.phone_no,
      password: encryptedPassword,
      isverified: req.body.isverified,
      role: req.body.role,
      street: req.body.street,
      city: req.body.city,
      zip: req.body.zip,
      // user_id: req.body.user_id

    }
    );

   // return success(res, { message: " Added", response: 200, status: true });
  

    const token = jwt.sign(
      { email: email, phone_no: phone_no },
      "hardcodedTOKEN_KEY",
      {
        expiresIn: "24h",
      }
    );

    var tokens = token;


    return res.status(201).json(tokens);
  } catch (err) {
    console.log(err);
  }

}

exports.login = async (req, res) => {



  try {

    const { email, phone_no, password } = req.body;


    if (!(email || phone_no && password)) {
      return res.status(400).send("All input is required");
    }

    const user = await sign.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {

      const token = jwt.sign(
        { user_id: user.id, phone_no: phone_no },
        //"hardcodedTOKEN_KEY",
        process.env.TOKEN_KEY,
        {
          expiresIn: "24h",
        }
      );

      var tokens = token;

      // user
      return res.status(200).json(tokens);
    }
    return res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
}


exports.update = async (req, res) => {
  console.log(req.body);
  var up = await sign.updateOne({
    user_id: req.body.user_id
    // "id": req.body.id,
    // "role": req.body.role,
    // "city": req.body.city,
    // "street": req.body.street,
    // "zip ": req.body.zip,
    // "phone_no": req.body.phone_no,
    // "isverified": req.body.isverified
  }, {
    email: req.body.email
  });
  console.log(up);

  return success(res, { message: " updated", response: 200, status: true });

}

exports.image = async (req, res) => {
  console.log(req.body);
  const data = req.body.image
  // Convert base64 to buffer => <Buffer ff d8 ff db 00 43 00 ...
  const buffer = Buffer.from(data, "base64");
  fs.writeFileSync("new-path.jpg", buffer);


  return success(res, { message: " updated", response: 200, status: true });

}


exports.get = async (req, res) => {
  
  let key = Object.keys(req.body);

  console.log(key);
}

 








































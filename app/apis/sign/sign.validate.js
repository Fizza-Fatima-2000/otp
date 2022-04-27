//const { sign } = require("jsonwebtoken");
const db = require("../../models");
const ROLES = db.ROLES;
const sign = db.sign;
const { badRequest } = require("../../util/helper");

checkDuplicateItems = (req, res, next) => {
    console.log(req.body.email);
  sign.findOne({
      email : req.body.email
    
  }).then(sign => {
      console.log(sign);
    if (sign) {
     return badRequest(res, {message:"Invalid request, this email  already exists"})
      return;
    }
    next();
  });
};
 


checkMissingFields = (req,res,next) => {
    console.log(req.body);
    if (!req.body.email || !req.body.phone_no) {
      badRequest(res, {message:"Invalid request, email or phone number is required"})
      return;
    }

    if (!req.body.password) {
      badRequest(res, {message:"Invalid request, Password is required"})
      return;
    }
    next();
};




const validates = {
  checkDuplicateItems :checkDuplicateItems,
  checkMissingFields: checkMissingFields,

//checkRolesExisted: checkRolesExisted
};

module.exports = validates;

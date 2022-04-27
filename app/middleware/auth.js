const jwt = require("jsonwebtoken");

const configs = process.env;

const config = require('../../app/config/db')
verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, configs.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};



verifyuserToken = (req , res , next)=>{
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if(token){
    console.log("hello");
  }
  try {
    const decoded = jwt.verify(token, configs.TOKEN_KEY);
    console.log(decoded);
    req.body.user_id = decoded.user_id;
    console.log(decoded.user_id);
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};




const validates = {
  verifyToken :verifyToken,
  verifyuserToken: verifyuserToken,
};

module.exports = validates;
const dbConfig = require("../config/db");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.sign = require("./sign.model")(mongoose);
db.fav = require("./fav.model")(mongoose)
db.otp = require("./otp.model")(mongoose)

module.exports = db;

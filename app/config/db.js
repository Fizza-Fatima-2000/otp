const { sign } = require('../models');

module.exports = {
    url: "mongodb://localhost:27017/New"
  };
  //var MongoClient = require('mongodb').MongoClient;

  //MongoClient.connect("mongodb://localhost:27017/New", function(err, db) {
  
//})
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://127.0.0.1:27017/New";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("new");
//   dbo.collection('fav').aggregate([
//     { $lookup:
//       {
//         from: 'sign',
//         localField: 'sign_id',
//         foreignField: 'fav_id',
//         as: 'sign'
//       }
//     }
//   ]).toArray(function(err, res) {
//     if (err) throw err;
//     console.log(JSON.stringify(res));
//     db.close();
//   });
// });
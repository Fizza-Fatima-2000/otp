const { jsonp } = require("express/lib/response");
const { string, numeric } = require("validatorjs/src/lang/en");

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      email: {
        type: String,
        default :""
      },
      id : {
       type : Number,
       unique: true
      },
      phone_no: {
        type: Number,
        unique: true,
        default: ""
      },
      isverified: {
        type: Boolean
      },
      image: {
        type: String
      },
      role: {
        type: String,
        default: ""
      },
      street: {
        type: String
      },
      city: {
        type: String
      },
      zip: {
        type: String,
        default: " "
      },
      
      
      password: {
        type: String
      },
      token: String
    },



    {
      timestamps: true,

    }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const sign = mongoose.model("sign", schema, "sign");
  return sign;

};

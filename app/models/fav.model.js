const { jsonp } = require("express/lib/response");
const ObjectId = require("mongoose/lib/schema/objectid");
const { string, numeric } = require("validatorjs/src/lang/en");

module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            fav_id: {
                type: Number,
               // unique: true
            },

            user_id: {
                type: Number,
                //ref: "sign"
            },
            ad_id: {
                type: Number

            }

            // timestamps: true,

        
    
})



schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

const fav = mongoose.model("fav", schema, "fav");
return fav;

};

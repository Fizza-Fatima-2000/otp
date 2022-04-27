
module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            
            user_id: {
                type: Number
            },
            otp_code:
            {
                type: String
            },
            expireIn:
            {
                type: Number
            },
            is_verified:
            {
                type: Boolean
            },



            //timestamps: true,

        }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const otp = mongoose.model("otp", schema, "otp");
    return otp;

};



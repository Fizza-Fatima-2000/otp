require("dotenv").config();
require("../../../app/config/db")
const res = require("express/lib/response");
//const { sign } = require("../../../app/models/index");
const db = require("../../../app/models/index");
const fav = db.fav;
const { serverError, success } = require("../../../app/util/helper");
const favModel = require("../../models/fav.model");



exports.create = async (req, res) => {

    var obj = {};
    obj.key = "value";

    

    const users = await fav.create({

        fav_id: req.body.fav_id,
        user_id:req.body.user_id,
    });
    return success(res, { message: " Added", response: 200, status: true });


}


exports.find = async (req, res) => {
    var userid = req.body.user_id;
    var adid = req.body.ad_id;
    const fave = await fav.findOne({ user_id: userid , ad_id : adid})

    //try {



        if (!(fave)) {
            const users = await fav.create({

                fav_id: 1,
                user_id: userid,
                ad_id: adid
            });
            return success(res, { message: " Added", response: 200, status: true });
        }
        else   {

            var dlt = await fav.deleteOne({
                where: {
                    _id: fave._id
                }
            })
            return success(res, { message: " Deleted", response: 200, status: true });

        }
    
                
    //      else if (user && (await bcrypt.compare(user_id))) {
    //         const payload = { user_id };
    //         const token = jwt.sign(
    //             { user_id: user_id, payload },
    //             //"hardcodedTOKEN_KEY",
    //             process.env.TOKEN_KEY,
    //             {
    //                 expiresIn: "24h",
    //             }
    //         );

    //         var tokens = token;

    //         // user
    //         return res.status(200).json(tokens);
    //     }
    //     return res.status(400).send("Invalid Credentials");
    // } catch (err) {
    //     console.log(err);
    }
// }

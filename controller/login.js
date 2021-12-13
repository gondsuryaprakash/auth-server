
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv')
const { generateAccessToken } = require('../Utils/helper');
dotenv.config();

const postLogin = async (req, res, next) => {
    const { email } = req.body;
    try {
        User.findOne({
            email
        }).exec((err, user) => {
            if (err) {
                res.status(500)
                    .send({
                        message: err
                    })
            }
            if (!user) {
                return res.status(404)
                    .send({
                        message: "User Not Found"
                    })
            }

            const passworIsValid = bcrypt.compareSync(req.body.password, user.password)
            if (!passworIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Credential!"
                })
            }
            const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET_FOR_ACCESS_TOKEN, { expiresIn: "10m" });
            User.updateOne(
                { email: user.email },
                { $set:
                   {
                    token: token,
                   }
                }
             )
             .exec((err,user)=> {
                 if(err) {
                     console.log(err);
                 }
             })

            res.cookie('token', token, {secure: false})
            return res.status(200)
            .send({
                    user: {
                        id: user._id,
                        email: user.email,
                        fullname: user.name,
                       
                    },
                    message: 'Logged In Successfully'
                })
        })
    }
    catch (e) {
        console.log(e.message);
    }

}

const postLogout =(req, res)=> {

    const {email} = req.body
    User.updateOne( { email: email },
        { $set:
           {
            token: null,
           }
        }).exec((err,user)=> {
            if(err) {
                console.log(err);
                return res.status(401).send({
                    error: err,
                    message: "Error in Login"
                })
            }
            res.clearCookie('token');
            return res.status(200).send({
                message: "Successfully Logout",
                status: 'ok'
            })
           
        })

 
}

module.exports = { postLogin, postLogout }
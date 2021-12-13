

const User = require('../models/user') 

const jwt = require('jsonwebtoken')

function verifyToken(req, res, next) { 

    if(req?.headers?.authorization) {
        const token = req.headers.authorization.split(" ")[1];

       jwt.verify(token, process.env.JWT_SECRET_FOR_ACCESS_TOKEN, (err, decode)=> {

        if(err) {
            return res.status(500).
                send({
                    message: err
                })
        }

        User.findOne({email: decode.email})
        .select("-password")
        .exec((err, user)=> {
            if(err) {
                return res.status(500).
                send({
                    message: err
                })
            }
            else {
                if(user.token!=null) {
                    req.user = user;    
                    next();
                }
                else {
                    return res.status(401).
                    send({
                        message: "Invalid Token"
                    })
                }
            }
        })

       })
    }
    else {
        return res.status(500).
        send({
            message: "Invalid Token"
        })
    }

  }

module.exports = {verifyToken}
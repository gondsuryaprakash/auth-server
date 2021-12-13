
const User = require('../models/user');
const jwt = require('jsonwebtoken')

const getDashBoard = async (req, res) => {
    if(!req.user) {
        return res.status(403)
        .send({
          message: "Invalid JWT token"
        });
    }
    if (req.user) {
        return res.status(200)
          .send({
            message: "Happy Auth",
            user: req.user
          });
      } else {
        return res.status(403)
          .send({
            message: "Unauthorised access"
          });
      }
   
}

module.exports = { getDashBoard }
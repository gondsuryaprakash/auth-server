const mongoose = require('mongoose');
const User = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        default: null,
    }

}, {
    collection: "user-data"
})


const usermodel = mongoose.model('UserData', User); 

module.exports = usermodel;
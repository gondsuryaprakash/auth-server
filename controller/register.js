const User = require('../models/user');
const bcrypt = require('bcrypt');
const sendMail = require('../Utils/mail')
const postRegister = async (req,res)=> {
    const {name, lastname, email, password} = req.body;
    try { 
        await User.create({
            name,
            lastname,
            email,
            password: bcrypt.hashSync(password, 8)
        }) 
     
        const mailOption = {
            subject: "Hi Surya from SGMail",
            text: "Ar bhai kya hal h ",
            htmlContent: '<strong>and easy to do anywhere, even with Node.js</strong>'
        }
        sendMail(mailOption,(flag)=> {
            if(flag) {
                return res.json({status:'ok', message: 'Mail Send Successfully'}) 
            }
            else {
                return res.json({status: 'error' , error: "Mail Send fail"}) 
            }
        })
        return res.json({status:'ok', message: 'user created successfully'})
    }
    catch(e) {
        
        return res.json({status: 'error' , error: "Duplicate Email"})

    }

  
}

module.exports = {postRegister}
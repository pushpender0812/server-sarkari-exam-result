const jwt = require('jsonwebtoken');
const User = require('../modals/User-model');

const auth = async(req,res,next) => {
    try {   
        const token = req.cookies.jwt;
        if (token) {
            const verifyUser = jwt.verify(token,process.env.SECRET_KEY)

            const Userdata = await User.findOne({_id:verifyUser._id})

            req.token = token
            req.user = Userdata

            next()
        }
        
    } catch (error) {
        res.redirect("/admin/login")
    }
}

module.exports = auth;
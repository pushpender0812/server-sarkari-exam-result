// const jwt = require('jsonwebtoken')
const beforelogin = async(req,res,next) => {
    const token = req.cookies.jwt;
    if(token){
        res.redirect("/admin/user/dashboard");
    } else {
        next()
    }
}

module.exports = beforelogin
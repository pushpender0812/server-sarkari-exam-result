const bcrypt = require('bcryptjs');
const User = require('../modals/User-model');
const jwt = require("jsonwebtoken")

const Register = async(req,res) => {
        try {
            const {name,email,type,password} = req.body;
            const passwordHash = await bcrypt.hash(password,10)

            const registerUser = new User({
                name,
                email,
                type,
                password:passwordHash
            })
            await registerUser.save()

            res.status(200).json({message:"User Registered Successfully"})
        } catch (error) {
            res.status(500).json({message:`Internal server Error ${error}`})
        }
}

const Login = async(req,res) => {
   try {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email,password);
    

    const usermail = await User.findOne({email:email}); 

    if(!usermail){
        res.status(400).send('Invalid Login Mail'); 
    }

    const isMatch = await bcrypt.compare(password,usermail.password);
    console.log(isMatch);
   
    
    const token = await jwt.sign({_id:usermail._id.toString()},process.env.SECRET_KEY)
   

    res.cookie("jwt",token,{
        httpOnly:true,
    })

    if (isMatch === true) {
        res.status(200).redirect("/admin/user/dashboard")
        // res.status(200).json("Password Matched Login Succsss")
    } else {
        res.status(404).json("Invalid Password Deatils")
    }
    
   } catch (error) {
    res.status(400).json(`Internal Server Error ${error}`)
   }
}

const signoutAdmin = async(req,res) => {
    try {
        res.clearCookie("jwt")
        console.log("Lougout Success");
        res.redirect("/admin/login")
        
    } catch (error) {
        console.log(`Error while logging out ${error}`);
        
    }
}

module.exports = {Register,Login,signoutAdmin}
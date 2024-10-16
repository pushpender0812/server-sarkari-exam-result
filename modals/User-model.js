const mongoose = require('mongoose')
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
   
    type:{
        type:String,
        enum:["Admin","User"],
        default:"User"
    },
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
},{
    timestamps:true,
    versionKey:false
})

userSchema.methods.generateToken = async function(){
    try {
        return jwt.sign({
            userId:this._id.toString(),
            email:this.email,
            type:this.type
        },process.env.SECRET_KEY,{
            expiresIn:"30d"
        })
    } catch (error) {
        
    }
}

const User = new mongoose.model("User",userSchema)

module.exports = User;
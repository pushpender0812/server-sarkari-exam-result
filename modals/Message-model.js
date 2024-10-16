const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true
    },
    message:{
        type:String,
        require:true
    },
    isSolved:{
        type:Boolean,
        default:false
    }

},{
    timestamps:true,
   
})

const Message = new mongoose.model('Message',messageSchema)

module.exports = Message;


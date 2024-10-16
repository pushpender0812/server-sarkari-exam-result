const mongoose = require("mongoose")

const answerkeySchema = new mongoose.Schema({
    job_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Addjob',
        required:true
    },
    answer_key_date:{
        type:String
    },
    answer_key_link:{
        type:String
    },
    slug:{
        type:String,
        unique:true

    }
   
},{
    timestamps:true,
   
})


answerkeySchema.pre("save",async function(next){
    if (!this.isModified('slug')) {
        await this.populate('job_id');

        if(this.job_id && this.job_id.title){
            const idPart = this._id.toString().slice(0,7)

            this.slug = this.job_id.title.toLowerCase().replace(/[^a-z0-9\s-]/g,'').replace(/\s+/g, '-').trim() + '-' + idPart
        }
    }
})

const Answerkey = new mongoose.model('Answerkey',answerkeySchema)

module.exports = Answerkey
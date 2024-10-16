const mongoose = require("mongoose")

const syllabusSchema = new mongoose.Schema({
    job_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Addjob',
        required:true
    },
    syllabus_date:{
        type:String
    },
    syllabus_link:{
        type:String
    },
    slug:{
        type:String,
        unique:true
    }
  
},{
    timestamps:true,
   
})


syllabusSchema.pre('save',async function (next) {
    if (!this.isModified('slug')) {
        await this.populate('job_id');

        if (this.job_id && this.job_id.title) {
            const idPart = this._id.toString().slice(0,6)

            this.slug = this.job_id.title.toLowerCase().replace(/[^a-z0-9\s-]/g,'').replace(/\s+/g, '-').trim() + '-' + idPart
        }
    }
    next();
})

const Syllabus = new mongoose.model('Syllabus',syllabusSchema)

module.exports = Syllabus
const mongoose = require("mongoose")

const addJobSchema = new mongoose.Schema({
    islatest:{
        type:Boolean,
        default:true
    },
    type:{
        type:String,
        enum:["Job","Admission"],
        default:"Job"
    },
    title:{
     type:String
    },
    post_name:{
    type:String
   },
   job_description:{
    type:String
   },
   table_title1:{
    type:String
   },
   table_title2:{
    type:String
   },
   table_title3:{
    type:String
   },
   application_begin:{
    type:String
   },
   application_end:{
    type:String
   },
   pay_last_date:{
    type:String
   },
   correction_date:{
    type:String
   },
   exam_date:{
    type:String,
    default:"As Per Notification"
   },
   exam_fees1:{
    type:String
   },
   exam_fees2:{
    type:String
   },
   exam_fees3:{
    type:String,
    
   },
   fees_description:{
    type:String
   },
   age_limit_title:{
    type:String
   },
   minimum_age:{
    type:String
   },
   maximum_age:{
    type:String
   },
   age_description:{
    type:String
   },
   total_vacancy:{
    type:String
   },
   how_to_fill:{
    type:String
   },
   apply_online_link:{
    type:String
   },
   download_notification_link:{
    type:String
   },
   official_website_link:{
    type:String
   },
   slug:{
    type:String,
   
   }
},{
    timestamps:true,
   
})



addJobSchema.pre('save', function (next) {
    if (!this.isModified('slug')) {
      // Use only the first 6 characters of the _id
      const idPart = this._id.toString().slice(0, 6);
  
      // Generate slug by combining the title and the sliced _id part
      this.slug = this.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')  // Remove special characters
        .replace(/\s+/g, '-')          // Replace spaces with hyphens
        .trim() + '-' + idPart;        // Append sliced _id part
  
    }
    next();
  });
  

const Addjob = new mongoose.model('Addjob',addJobSchema)

module.exports = Addjob
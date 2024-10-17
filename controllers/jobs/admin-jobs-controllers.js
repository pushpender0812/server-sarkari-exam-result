const Addjob = require("../../modals/AddJob-model");

const addJobsdetails = async(req,res) => {
    
    try {
        
          
      const {title,post_name,type,job_description,table_title1,table_title2,table_title3,application_begin,application_end,pay_last_date,correction_date,exam_date,exam_fees1,exam_fees2,exam_fees3,fees_description,age_limit_title,minimum_age,maximum_age,age_description,total_vacancy,how_to_fill,apply_online_link,download_notification_link,official_website_link} = req.body

      const newJobdetails = new Addjob({
        title,
        type,
        post_name,
        job_description,
        table_title1,
        table_title2,
        table_title3,
        application_begin,
        application_end,
        pay_last_date,
        correction_date,
        exam_date,exam_fees1,
        exam_fees2,exam_fees3,
        fees_description,
        age_limit_title,
        minimum_age,
        maximum_age,
        age_description,
        total_vacancy,
        how_to_fill,
        apply_online_link,
        download_notification_link,
        official_website_link
      })

      await newJobdetails.save()


         res.status(200).redirect("/admin/user/dashboard")

    } catch (error) {
        console.log(error);
        
    }

    }


const viewJobsPage = async(req,res) => {
     try {
        const jobdata = await Addjob.find({type:'Job'})
        res.render("Layout",{body:"jobs/Viewjobs",result:jobdata})
     } catch (error) {
        console.log(error);
        
     }
}    


const getsingleJob = async(req,res) => {
   try {
    const _id = req.params.id
    
    const singleJob = await Addjob.findOne({_id:_id})
    res.render("Layout",{body:"jobs/ViewSinglejob",result:singleJob})
   } catch (error) {
    console.log(error);
    
   }
}

const deleteJob = async(req,res) => {
    try {
        const _id = req.params.id
        // console.log(_id);
        
        await Addjob.findByIdAndDelete({_id:_id})
        res.status(200).redirect("/admin/user/job/view-jobs")
    } catch (error) {
     console.log(error);
     
    }
}

const editjobButton = async(req,res) => {
try {
    const _id = req.params.id
     
    const singleJob = await Addjob.findOne({_id:_id})
    res.render("Layout",{body:"jobs/Editjob",result:singleJob})
} catch (error) {
    console.log(error);
}
}

const updateThisJob = async(req,res) => {
  try {
    const _id = req.params.id
    const {title,post_name,type,job_description,table_title1,table_title2,table_title3,application_begin,application_end,pay_last_date,correction_date,exam_date,exam_fees1,exam_fees2,exam_fees3,fees_description,age_limit_title,minimum_age,maximum_age,age_description,total_vacancy,how_to_fill,apply_online_link,download_notification_link,official_website_link} = req.body
   
     
    await Addjob.findByIdAndUpdate({_id:_id},{
        title,
        type,
        post_name,
        job_description,
        table_title1,
        table_title2,
        table_title3,
        application_begin,
        application_end,
        pay_last_date,
        correction_date,
        exam_date,exam_fees1,
        exam_fees2,exam_fees3,
        fees_description,
        age_limit_title,
        minimum_age,
        maximum_age,
        age_description,
        total_vacancy,
        how_to_fill,
        apply_online_link,
        download_notification_link,
        official_website_link
    })
    res.status(200).redirect("/admin/user/job/view-jobs")
  } catch (error) {
    console.log(error);
  }
}


const getAdmission = async(req,res) => {
  try {
    const admisData = await Addjob.find({type:'Admission'})
    res.render("Layout",{body:"ViewAdmission",result:admisData})
 } catch (error) {
    console.log(error);
    
 }
}

const singleAdmission = async(req,res) => {
  try {
   
    
    const admisData = await Addjob.findOne({_id:req.query.id})
    res.render("Layout",{body:"ViewSingleAdmission",result:admisData})
 } catch (error) {
    console.log(error);
    
 }
}

module.exports = {addJobsdetails,viewJobsPage,getsingleJob,deleteJob,editjobButton,updateThisJob,getAdmission,singleAdmission}
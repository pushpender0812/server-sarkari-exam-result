const Addjob = require("../../modals/AddJob-model");
const AdmitCard = require("../../modals/AdmitCard-model");

const admitCardPage = async (req, res) => {
    try {
      // Get all job_ids present in the AdmitCard collection
      const admitCardJobs = await AdmitCard.find().select('job_id');
      
      // Extract job_id values from the admitCardJobs array
      const admitCardJobIds = admitCardJobs.map(admitCard => admitCard.job_id);
  
      // Find all jobs that are NOT present in the AdmitCard collection
      const jobAll = await Addjob.find({ _id: { $nin: admitCardJobIds } });
  
      // Render the page with filtered jobs
      res.render("Layout", { body: "admitCard/Addadmit", result: jobAll });
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  };
  

const admitCardData = async(req,res) => {

     try {
        const {job_id,admit_card_date,admit_card_link} = req.body

        const admitCardData = new AdmitCard({
          job_id, 
          admit_card_date,
          admit_card_link
        })
        await admitCardData.save()
        await Addjob.findByIdAndUpdate({_id:job_id},{islatest:false})
        res.redirect('/admin/user/admitcard/admit-card')
     } catch (error) {
        console.log(error);
        
     }
      
}


const viewAdmitCards = async(req,res) => {
    try {
        const admitAll = await AdmitCard.find().populate('job_id')
     
        
        res.render("Layout",{body:"admitCard/Viewadmit",result:admitAll})
      } catch (error) {
        console.log(error);
        
      }
}

module.exports = {admitCardPage,admitCardData,viewAdmitCards}
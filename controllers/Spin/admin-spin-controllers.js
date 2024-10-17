const Addjob = require("../../modals/AddJob-model");
const Spin = require("../../modals/Spin-model");

const addSpinpage = async (req, res) => {
    try {
      // Fetch all jobs
      const allJobs = await Addjob.find({islatest:true});
     
      
      // Fetch all spins to get the jobs that are already added to Spin
      const spins = await Spin.find();
  
      // Create a set of job IDs that are already in Spin
      const addedSpinJobIds = new Set(spins.map(spin => spin.job_id.toString()));
  
      // Filter jobs that are not in the spin set
      const availableJobs = allJobs.filter(job => !addedSpinJobIds.has(job._id.toString()));
 
      // Render the page with only available jobs
      res.render("Layout", { body: "spin/AddSpin", result: availableJobs });
    } catch (error) {
      console.log(error);
    }
  };
  

  const submitSpin = async (req, res) => {
    try {
      const { job_id, spin_title } = req.body;
  
      const spinData = new Spin({
        job_id,
        spin_title
      });
  
      await spinData.save();
      res.status(200).redirect('/admin/user/spin/add-spin');
  
    } catch (error) {
      console.log(`error adding spin ${error}`);
    }
  };
  


const viewSpin = async(req,res) => {
    try {
        const spinData = await Spin.find().populate('job_id')
        res.render("Layout", { body: "spin/ViewSpin", result: spinData });
    } catch (error) {
        console.log(`Error viewing spin ${error}`);
        
    }
}


module.exports = {addSpinpage,submitSpin,viewSpin}
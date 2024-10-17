const Addjob = require("../../modals/AddJob-model");
const Syllabus = require("../../modals/Syllabus-model");

const addsyllabusPage = async (req, res) => {
    try {
      // Fetch all job_ids present in the Syllabus collection
      const syllabusJobs = await Syllabus.find().select('job_id');
  
      // Extract job_id values from the syllabusJobs array
      const syllabusJobIds = syllabusJobs.map(syllabus => syllabus.job_id);
  
      // Find all jobs that are NOT present in the Syllabus collection
      const jobAll = await Addjob.find({ _id: { $nin: syllabusJobIds } });
  
      // Render the page with filtered jobs
      res.render("Layout", { body: "syllabus/Addsyll", result: jobAll });
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  };
  

const submitSyllabus = async(req,res) => {
  try {
    const {job_id,syllabus_date,syllabus_link} = req.body

    const syllabusData = new Syllabus({
        job_id,
        syllabus_date,
        syllabus_link
    })
    await syllabusData.save()
    res.status(200).redirect('/admin/user/syllabus/add-syllabus')
  } catch (error) {
    console.log(error);
    
  }
    
}


const viewSyllabus = async(req,res) => {
    try {
        const syllabusAll = await Syllabus.find().populate('job_id')
     
        
        res.render("Layout",{body:"syllabus/Viewsyll",result:syllabusAll})
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = {addsyllabusPage,submitSyllabus,viewSyllabus}
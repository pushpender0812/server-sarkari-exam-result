const Addjob = require("../../modals/AddJob-model");
const Result = require("../../modals/Result-model");


const resultPage = async (req, res) => {
    try {
      // Get all job_ids present in the Result collection
      const resultJobs = await Result.find().select('job_id');
      
      // Extract job_id values from the resultJobs array
      const resultJobIds = resultJobs.map(result => result.job_id);
  
      // Find all jobs that are NOT present in the Result collection
      const jobAll = await Addjob.find({ _id: { $nin: resultJobIds } });
  
      // Render the page with filtered jobs
      res.render("layout", { body: "result/Addresult", result: jobAll });
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  };
  

const submitResultData = async(req,res) => {
    try {
       const {job_id,result_date,result_link} = req.body
        const resultData = new Result({
            job_id,result_date,result_link
        })
       await resultData.save()
       res.status(200).redirect("/admin/user/result/result-page")
    } catch (error) {
        console.log(error);
        
    }
}


const viewResult = async(req,res) => {
    try {
        const resultData = await Result.find().populate('job_id')
        res.render("layout",{body:"result/Viewresult",result:resultData})
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = {resultPage,submitResultData,viewResult}
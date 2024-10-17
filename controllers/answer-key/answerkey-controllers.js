const Addjob = require("../../modals/AddJob-model");
const Answerkey = require("../../modals/Answerkey-model");
const answerkeyPage = async (req, res) => {
    try {
      // Get all job_ids present in the AnswerKey collection
      const answerKeyJobs = await Answerkey.find().select('job_id');
      
      // Extract job_id values from the answerKeyJobs array
      const answerKeyJobIds = answerKeyJobs.map(answerKey => answerKey.job_id);
  
      // Find all jobs that are NOT present in the AnswerKey collection
      const jobAll = await Addjob.find({ _id: { $nin: answerKeyJobIds } });
  
      // Render the page with filtered jobs
      res.render("Layout", { body: "answerKey/AddKey", result: jobAll });
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  };
  

const submitanswerkey = async(req,res) => {
    try {
        const {job_id,answer_key_date,answer_key_link} = req.body

        const answerKeydata = new Answerkey({
           job_id,
           answer_key_date,
           answer_key_link
        })
        await answerKeydata.save()
        res.redirect('/admin/user/answerkey/answer-key')
    } catch (error) {
        console.log(error);
        
    }
    
}


const viewAnswerKey = async(req,res) => {
    try {
        const answerKeyAll = await Answerkey.find().populate('job_id')
     
        
        res.render("Layout",{body:"answerKey/ViewKey",result:answerKeyAll})
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = {answerkeyPage,submitanswerkey,viewAnswerKey}
const Addjob = require("../../modals/AddJob-model")
const AdmitCard = require("../../modals/AdmitCard-model")
const Answerkey = require("../../modals/Answerkey-model")
const Message = require("../../modals/Message-model")
const Result = require("../../modals/Result-model")
const Spin = require("../../modals/Spin-model")
const Syllabus = require("../../modals/Syllabus-model")
const mongoose = require('mongoose')

const allJobsAvailale = async(req,res) => {
     try {
      //   const allJobs = await Addjob.find({islatest:true,type:'Job'}).sort({_id:-1})
        const allJobs = await Addjob.aggregate( [
         { $match: { islatest: true, type: 'Job' } },
         { $sort: { _id: -1 } },
         {
           $addFields: {
             formatted_last_date: {
               $dateToString: {
                 format: '%d-%m-%Y',
                 date: { $toDate: '$application_end' }
               }
             }
           }
         }
       ])
        res.status(200).json(allJobs)
     } catch (error) {
        res.status(400).json(`Error While getting all jobs data ${error} `)
     }
}

const allAdmitCards = async(req,res) => {
    try {
      //   const alladmitCards = await AdmitCard.find().populate('job_id').sort({_id:-1})
        const alladmitCards = await AdmitCard.aggregate( [
         {
           $lookup: {
             from: 'addjobs',
             localField: 'job_id',
             foreignField: '_id',
             as: 'job_id'
           }
         },
         {
           $unwind: {
             path: '$job_id',
             preserveNullAndEmptyArrays: true
           }
         },
         { $sort: { _id: -1 } }
       ])
        res.status(200).json(alladmitCards)
     } catch (error) {
        res.status(400).json(`Error While getting all Admit Card data ${error} `)
     }
}


const allResults = async(req,res) => {
    try {
      //   const allResults = await Result.find().populate('job_id').sort({_id:-1})
        const allResults = await Result.aggregate([
         {
           $lookup: {
             from: 'addjobs',
             localField: 'job_id',
             foreignField: '_id',
             as: 'result'
           }
         },
         {
           $unwind: {
             path: '$result',
             preserveNullAndEmptyArrays: true
           }
         },
         {
           $addFields: {
             formatted_result_date: {
               $dateToString: {
                 format: '%d-%m-%Y',
                 date: { $toDate: '$result_date' }
               }
             }
           }
         },
         { $sort: { _id: -1 } }
       ],)
      
       
        res.status(200).json(allResults)
     } catch (error) {
        res.status(400).json(`Error While getting all Results data ${error} `)
     }
}


const singleJobData = async(req,res) => {
  try {
   const _id = req.query.id
   
   
   const jobData = await Addjob.findOne({slug:_id})
   res.status(200).json(jobData)
  } catch (error) {
   res.status(400).json(`Error While getting single job data ${error} `)
  }
 
   
}


const singleAdmitCard = async(req,res) => {
    try {
      const _id = req.query.id
      const admitcardData = await AdmitCard.findOne({slug:_id}).populate('job_id')
      res.status(200).json(admitcardData)
      
    } catch (error) {
      res.status(400).json(`Error While getting single admit card ${error} `)
    }
      
}


const singleResultpage = async(req,res) => {
   try {
      const _id = req.query.id
    
      
      // const resultData = await Result.findOne({_id:_id}).populate('job_id')
      const resultData = await Result.aggregate([
         {
           $match: {
             slug:_id
           }
         },
         {
           $lookup: {
             from: "addjobs",
             localField: "job_id",
             foreignField: "_id",
             as: "result"
           }
         },
         {
           $unwind: {
             path: "$result",
             preserveNullAndEmptyArrays: true
           }
         }
       ])
      
      
      const admitcardDta = await AdmitCard.findOne({job_id:resultData.job_id})
    
      res.status(200).json({resultData:resultData[0],admitcardDta})
    } catch (error) {
      res.status(400).json(`Error While getting single Result Page ${error} `)
    }
   
}

const contactedMessages = async(req,res) => {
 try {
   const {email,message} = req.body;
   const messageData = new Message({
      email,
      message
   })
   await messageData.save()
   res.status(200).json({message:'Success'})
 } catch (error) {
   console.log(`Error While getting Contacted Deatails ${error}`);
   
 }
    
}


const syllabusData = async(req,res) => {
   try {
      const sllbsData = await Syllabus.find().populate('job_id').sort({_id:-1})
      res.status(200).json(sllbsData)
   } catch (error) {
      console.log(`Error While getting syllabus Deatails ${error}`);
   }
}

const answerKeyData = async(req,res) => {
   try {
      const answrKeyData = await Answerkey.find().populate('job_id').sort({_id:-1})
      res.status(200).json(answrKeyData)
   } catch (error) {
      console.log(`Error While getting answer key Deatails ${error}`);
   }
} 


const singleAnswerKey = async(req,res) => {
        try {
         const _id = req.query.id
         const answerData = await Answerkey.findOne({slug:_id}).populate('job_id')
         
         
         const admitcardDta = await AdmitCard.findOne({job_id:answerData.job_id._id})
       
         res.status(200).json({answerData,admitcardDta})
        } catch (error) {
         console.log(`Error While getting single answer key Deatails ${error}`);
        }
}

const singleSyllabusPage = async(req,res) => {
   try {
      const _id = req.query.id
      const syllabusData = await Syllabus.findOne({slug:_id}).populate('job_id')
      
      
     
    
      res.status(200).json({syllabusData})
     } catch (error) {
      console.log(`Error While getting single syllabus Deatails ${error}`);
     }
}


const getAdmissionData = async(req,res) => {
   try {
      const allAdmission = await Addjob.find({islatest:true,type:'Admission'}).sort({_id:-1})
      res.status(200).json(allAdmission)
   } catch (error) {
      res.status(400).json(`Error While getting all jobs data ${error} `)
   }
}


const getSingleAdmissionDataa = async(req,res) => {
   try {
      const _id = req.query.id
      const admissionData = await Addjob.findOne({slug:_id})
      res.status(200).json(admissionData)
     } catch (error) {
      res.status(400).json(`Error While getting single job data ${error} `)
     }
      
}

const getSpinData = async (req, res) => {
  try {
    // Calculate the total number of documents in the Spin collection
    const documentCount = await Spin.countDocuments();

    // Use the aggregation pipeline to sample documents and join with Addjob collection
    const spinData = await Spin.aggregate([
      // Sample all documents (you can adjust the sample size if needed)
      { $sample: { size: documentCount } },
      
      // Lookup to join with the Addjob collection based on job_id
      {
        $lookup: {
          from: "addjobs", // Collection to join
          localField: "job_id", // Field from Spin collection
          foreignField: "_id", // Field from Addjob collection
          as: "job_id" // Name of the new array field to hold the joined data
        }
      },

      // Unwind the joined array field (job_id) to convert array into individual documents
      {
        $unwind: {
          path: "$job_id",
          preserveNullAndEmptyArrays: true // Keep documents even if no match is found
        }
      }
    ]);

    // Send the resulting data as JSON
    res.status(200).json(spinData);
  } catch (error) {
    res.status(400).json(`Error while getting Spin data: ${error}`);
  }
};




module.exports = {allJobsAvailale,allAdmitCards,allResults,singleJobData,singleAdmitCard,singleResultpage,contactedMessages,syllabusData,answerKeyData,singleAnswerKey,singleSyllabusPage,getAdmissionData,getSingleAdmissionDataa,getSpinData}
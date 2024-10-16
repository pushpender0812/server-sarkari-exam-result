const express = require('express')
const router = express.Router()
const {addJobsdetails,viewJobsPage,getsingleJob,deleteJob,editjobButton,updateThisJob,getAdmission,singleAdmission} = require("../../controllers/jobs/admin-jobs-controllers")



router.route("/submit-addjobs").post(addJobsdetails)

router.route("/view-jobs").get(viewJobsPage)

router.route("/view/:id").get(getsingleJob)

router.route("/delete-job/:id").get(deleteJob)

router.route("/edit-job/:id").get(editjobButton)

router.route("/update-job/:id").post(updateThisJob)

router.route("/view-addmission").get(getAdmission)


router.route("/view-singleadmission").get(singleAdmission)

module.exports = router;
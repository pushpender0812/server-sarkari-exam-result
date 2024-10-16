const express = require("express")
const router = express.Router()
const {addsyllabusPage,submitSyllabus,viewSyllabus} = require("../../controllers/syllabus/admin-syllabus-controllers")

router.route("/add-syllabus").get(addsyllabusPage)

router.route("/submit-syllabus").post(submitSyllabus)

router.route("/view-syllabus").get(viewSyllabus)


module.exports = router
const express = require("express")
const router = express.Router()
const jobRoutes = require("./jobs/admin-jobs-routes")
const {signoutAdmin} = require('../controllers/admin-controllers')
const admitCardRoutes = require('../routes/AdmitCard/admin-admitcard')
const answerkeyRoutes = require("../routes/Answerkey/admin-answerkey-routes")
const syllabusRoutes = require("../routes/Syllabus/admin-syllabus-routes")
const resultRoutes = require("../routes/Result/dmin-result-routes")
const contactRoutes = require("../routes/Contact/admin-contact-routes")
const spinRoutes = require("../routes/Spin/admin-spin-routes")


router.get("/dashboard",async(req,res) => {
   try {
    res.render("layout",{body:"Dashboard"})
   } catch (error) {
    console.log(`error in dashboard ${error}`);
    
   }
})

router.route("/signout").get(signoutAdmin)

router.use("/job",jobRoutes)

router.use("/admitcard",admitCardRoutes)


router.use("/answerkey",answerkeyRoutes)

router.use("/syllabus",syllabusRoutes)


router.use("/result",resultRoutes)

router.use("/contact",contactRoutes)

router.use('/spin',spinRoutes)

router.get("/addjob",async(req,res) => {
    try {
        res.render("layout",{body:"jobs/Addjobs"})
    } catch (error) {
        console.log(error);
        
    }
})

module.exports = router
const express = require("express")
const router = express.Router()
const {allJobsAvailale,allAdmitCards,allResults,singleJobData,singleAdmitCard,singleResultpage,
    contactedMessages,syllabusData,answerKeyData,singleAnswerKey,singleSyllabusPage,getAdmissionData,getSingleAdmissionDataa,
    getSpinData} = require('../../controllers/Api/api-controllers')


router.route("/get-alljobs").get(allJobsAvailale)

router.route("/get-admitcards").get(allAdmitCards)


router.route("/get-allresults").get(allResults)

router.route("/single-job").get(singleJobData)

router.route("/single-admitcard").get(singleAdmitCard)

router.route("/single-result").get(singleResultpage)

router.route("/contact").post(contactedMessages)

router.route("/syllabus").get(syllabusData)


router.route("/answer-key").get(answerKeyData)

router.route("/single-answerkey").get(singleAnswerKey)


router.route("/single-syllabus").get(singleSyllabusPage)

router.route("/admission").get(getAdmissionData)

router.route("/single-admission").get(getSingleAdmissionDataa)

router.route("/get-spin").get(getSpinData)

module.exports = router
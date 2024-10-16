const express = require("express")
const router = express.Router()
const {admitCardPage,admitCardData,viewAdmitCards} = require("../../controllers/Admit-Card/admitcard-controllers") 


router.route("/admit-card").get(admitCardPage)

router.route("/card-data").post(admitCardData)

router.route('/get-admitcard').get(viewAdmitCards)


module.exports = router
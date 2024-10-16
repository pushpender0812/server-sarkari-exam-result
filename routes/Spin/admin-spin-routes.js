const express = require("express")
const { addSpinpage, submitSpin, viewSpin } = require("../../controllers/Spin/admin-spin-controllers")

const router = express.Router()

router.route("/add-spin").get(addSpinpage)

router.route("/submit-spin").post(submitSpin)

router.route("/view-spin").get(viewSpin)

module.exports = router
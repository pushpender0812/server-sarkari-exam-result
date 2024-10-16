const express = require("express")
const router = express.Router()
const {resultPage,submitResultData,viewResult} = require("../../controllers/Result/admin-result-controller")



router.route("/result-page").get(resultPage)

router.route("/result-data").post(submitResultData)

router.route('/get-result').get(viewResult)




module.exports = router
const express = require("express")
const { contactData ,changeStatus,solvedContactqueries} = require("../../controllers/admin-user-controllers")

const router = express.Router()

router.route("/contact-data").get(contactData)

router.route("/change-status/:id").post(changeStatus)

router.route("/contact-solved").get(solvedContactqueries)


module.exports = router
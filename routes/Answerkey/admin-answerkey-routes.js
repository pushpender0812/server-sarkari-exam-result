const express = require('express')
const router = express.Router()
const {answerkeyPage,submitanswerkey,viewAnswerKey} = require("../../controllers/answer-key/answerkey-controllers")


router.route("/answer-key").get(answerkeyPage)

router.route("/key-data").post(submitanswerkey)

router.route('/get-answerkey').get(viewAnswerKey)



module.exports = router
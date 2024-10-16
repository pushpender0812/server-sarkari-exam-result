const express = require('express')
const router = express.Router()
const {Register,Login} = require('../controllers/admin-controllers')
const beforelogin = require('../middleware/beforelogin-middleware')
const auth = require('../middleware/admin-middleware')
const adminUserRoutes = require('./admin-user-routes')

router.route("/register").post(Register)

router.get("/login",beforelogin,(req,res) => {
    res.render("Login")
})

router.route("/login").post(beforelogin,Login)

router.use("/user",auth,adminUserRoutes)

module.exports = router
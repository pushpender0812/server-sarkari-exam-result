require('dotenv').config()
require('./db/conn')
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const adminRoutes = require('./routes/admin-routes')
const cookieParser = require('cookie-parser')
const apiRoutes = require("./routes/Api/api-routes")




const PORT = process.env.PORT 

app.use(cookieParser())

const corsOptions = {
    origin:'https://sarkariexamresult.vercel.app',
    method:"GET,POST,PUT,PATCH,DELETE,HEAD",
    credential:true
}

app.use(cors(corsOptions))


app.use(express.json())
app.use(express.urlencoded({extended:true}))

// to serve static files

app.use(express.static(path.join(__dirname,'public')))
app.use('/uploads',express.static('uploads'));
app.set("view engine","ejs")
// app.set('views',path.resolve('./views'))

app.set('views', path.join(__dirname, 'views'));

app.get('/',(req,res) => {
     res.send("Admin Pannel")
})

app.use("/admin",adminRoutes)

app.use("/api",apiRoutes)

app.listen(PORT,() => {
      console.log(`Server running on port ${PORT}`);
      
})
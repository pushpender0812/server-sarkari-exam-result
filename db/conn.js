const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://pyadav96800:yadav%4012@cluster0.414c6.mongodb.net/SarkariExamResult")
.then(() => {
    console.log('MongoDB Connected Successfully');
})
.catch((error) => {
    console.log(`Error Connecting to MongoDB: ${error}`);
});
    
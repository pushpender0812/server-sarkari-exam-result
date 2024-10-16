const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/SarkariExamResult").then(() => {
    console.log('Mongo Db Connected Successfully');
    
}).catch((error) => {
    console.log(`Error Connecting mongodb ${error}`);
    
})
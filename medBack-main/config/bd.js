//Set up mongoose connection
const mongoose = require("mongoose");
const mongoDB = "mongodb+srv://emna:emna@cluster0.8qhzv.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoDB,{ usenewurlparser: true ,useunifiedtopology: true})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));


mongoose.Promise = global.Promise;
module.exports = mongoose;
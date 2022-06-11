const mongoose = require('mongoose')
const DB_URL = "mongodb+srv://yahiyamansuri:Mongo1998@yahiya-cluster.hjixa.mongodb.net/taxway?retryWrites=true&w=majority"
mongoose.connect(DB_URL, {useUnifiedTopology: true}).then(con => {
    console.log("------database connected-------")
}).catch(error => {
    console.log("--------Error while connecting to Mongoose---------", error)
})
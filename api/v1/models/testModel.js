const mongoose = require('mongoose')
const Schema = mongoose.Schema

const testSchema = new Schema({
    personal_info: {
        first_name: {type: String},
        last_name: {type: String}
    },
    contact_info : {
        mobile: {type: String},
        email: {type: String}
    }
    
})


const TestModel = mongoose.model('test', testSchema)
module.exports = TestModel
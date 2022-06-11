const mongoose = require('mongoose')
const Schema = mongoose.Schema

const clientSchema = new Schema({
    loginId : {
        type: String,
        require: true
    },
    clientName: {
        type: String,
        required: true
    },
    clientCode: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    itrType: {
        type: String,
        required: true
    }

},{timestamps: true})

const ClientModel = mongoose.model('client', clientSchema)
module.exports = ClientModel
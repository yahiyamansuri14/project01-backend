const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ticketSchema = new Schema({
    loginId:{type: String},
    email: {type: String},
    number: {type: String},
    department: {type: String},
    ticket_type: {type: String},
    subject: {type: String},
    details: {type: String},
    file: {type: String},
    message: [
        {fromLoginId: {type: String }},
        {message: {type: String}},
        {file: {type: String}}
    ]
}, {timestamps: true})

const TicketModel = mongoose.model('ticket', ticketSchema)
module.exports = TicketModel
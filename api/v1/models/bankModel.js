const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bankSchema = new Schema({
    loginId: {type: String},
    owner_role: {type: String, default: "ADMIN"},
    name: {type: String},
    account_number: {type: String},
    ifsc_code: {type: String},
    branch_name: {type: String},
    account_type: {type: String}
},{timestamps: true})

const BankModel = mongoose.model('Bank', bankSchema)
module.exports = BankModel
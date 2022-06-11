const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tdsClientSchema = new Schema({
    tds_client_code: {type: String},
    department_name : {type: String},
    tan_no:{type: String}, 
    mobile : {type: String},
    email: {type: String},
    address: {type: String},
    department_address: {type: String},
    trace_user_name: {type: String},
    trace_password: {type: String},
    loginId: {type: String},
    person_name: {type: String},
    person_pan_no: {type: String},
    person_dob: {type: String},
    ain_no: {type: String},
    person_address: {type: String},
    status: {type: String},
    return_type: {type: String},
    return_for: {type: String},
    financial_year: {type: String},
    month_quarter: {type: String},
    tds_product_name: {type: String},
    tds_product_id: {type: String},
    status: {type: String, default: "start"},
    bdm_email: {type: String},
    bdm_id: {type: String}
},{timestamps: true})

const TdsClientModel = mongoose.model('TdsClient', tdsClientSchema)
module.exports = TdsClientModel
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tdsSchema = new Schema({
    tds_model_ack_no: {type: String},
    tds_client_code: {type: String},
    // tan_no:{type: String}, 
    department_name : {type: String},
    mobile : {type: String},
    email: {type: String},
    address: {type: String},
    trace_user_name: {type: String},
    trace_password: {type: String},
    loginId: {type: String},
    return_type: {type: String},
    return_for: {type: String},
    financial_year: {type: String},
    month_quarter: {type: String},
    tds_product_name: {type: String},
    tds_product_id: {type: String},
    status: {type: String},
    bdm_email: {type: String},
    bdm_id: {type: String},
    message_details:[
        {
            subject:{type: String},
            message:{type: String},
            attachement_url:{type: String}
        }
    ]
},{timestamps: true})

const TdsModel = mongoose.model('Tds', tdsSchema)
module.exports = TdsModel
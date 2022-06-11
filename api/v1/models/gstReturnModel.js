const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gstReturnSchema = new Schema({
    gst_return_ack_no: {type: String},
    gst_return_client_id: {type: String},
    business_name: {type: String},
    gst_no : {type: String},
    state: {type: String},
    mobile: {type: String},
    email: {type: String},
    address: {type: String},
    gst_portal_username: {type: String},
    gst_portal_password: {type: String},
    gst_type: {type: String},
    gst_subtype: {type: String},
    month: {type: String},
    year: {type: String},
    coupon_name: {type: String},
    coupon_id: {type: String},
    order_id: {type: String},
    gst_user_file_url :{type: String},
    total_sales_amount: {type: Number},
    total_purchase_amount: {type: Number},
    loginId: {type: String},
    status: {type: String},
    bdm_id: {type: String},
    bdm_email: {type: String}
},{timestamps: true})


const GstReturnModel = mongoose.model('GstReturnh', gstReturnSchema)
module.exports = GstReturnModel
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    orderNo: {type: String},
    loginId: {type: String, required: true},
    product_id: {type: String, required: true},
    product_name : {type: String},
    product_category: {type: String}, 
    estimate_amount: {type: Number},
    quantity: {type: Number},
    reward_points: {type: Number, default: 0},
    payable_amount: {type: Number},
    final_amount: {type: Number},
    product_detail: {type: String},
    remark: {type: String},
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    middle_name: {type: String},
    // mobile: {type: String, required: true},
    // email: {type: String, required: true},
    dispath_need: {type: Boolean, default: false},
    firm_name: {type: String},
    firm_address: {type: String},
    file1_url: {type: String},
    file2_url: {type: String},
    file3_url: {type: String},
    file4_url: {type: String},
    status:{type: String},
    used_date: {type: Date},
    used_at: {type: String},
    is_used: {type: Boolean, default: false}
},{timestamps: true})

const OrderModel = mongoose.model('order', orderSchema)
module.exports = OrderModel
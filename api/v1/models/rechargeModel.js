const mongoose = require('mongoose')
const Schema = mongoose.Schema

const rechargeSchmea = new Schema({
    loginId: {type: String, require: true},
    recharge_id: {type: String, required: true},
    date: {type: String, require: true},
    amount: {type: Number, default: 0},
    payment_mode: {type: String},
    cheque_no: {type: String},
    bank_account: {type: String},
    receipt: {type: String, require: true},
    narration: {type: String, required: true},
    is_completed: {type: Boolean, default: false},
    payment_number: {type: String},
    admin_remark: {type: String},
    date:{type: Date},
}, {timestamps: true})

const RechargeModel = mongoose.model('Recharge', rechargeSchmea)
module.exports = RechargeModel
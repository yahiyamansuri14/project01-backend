const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    product_id: {type: String, required: true},
    name: {type: String, required: true},
    category: {type: String, required: true},
    subcategory:{type: String, required: true},
    price: {type: Number, required: true, default: 0},
    quantity: {type: Number, required: true},
    professional_fees: {type: Number, default: 0},
    legal_fees: {type: Number , default: 0},
    expiry_date: {type: Date},
    reward_points : {type: Number, default: 0},
    file_url: {type: String},
    is_active: {type: Boolean, default: true},
},{timestamps: true})

const ProductModel = mongoose.model('product', productSchema)
module.exports = ProductModel
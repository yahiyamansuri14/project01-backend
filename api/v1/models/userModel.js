const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
        loginId: {
            type: String,
            require: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true,
            enum: ['super admin', 'sub admin', 'branch', 'bdm', 'staff'],
            default: 'branch'
        },
        isDeleted: {
            type: String,
            required: true,
            default: false
        },
        adminId: {
            type: String,
            required: true,
            default: 'ADM001'
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true,
        },
        middleName: {
            type: String,
        },
        dob: {type: Date, required: true},
        fatherName: {type: String, required: true},
        aadhar_no: {type: String},
        aadhar_enrollment_no: {type: String},
        gender: {type: String, required: true},
        idUrl: {type: String},
        address_name: {type: String},
        address_number:{type:String},
        street:{type:String},
        area:{type:String},
        city:{type:String},
        state:{type:String},
        district:{type:String},
        pincode:{type:String},
        country: {
            type: String,required: true,default:"INDIA"
        },
        landline:{type:String},
        primary_mobile_no:{type:String, required:true},
        secondary_mobile_no:{type:String},
        primary_email:{type:String,required:true},
        secondary_email:{type:String},
        bank_ifsc_code:{type:String},
        bank_name:{type:String},
        account_type:{type:String},
        account_no:{type:String},
        balance: {
            type: Number,
            default: 0
        },
        reward_points: {
            type: Number,
            default: 0
        }

}, {timestamps: true, autoIndex: false})

const UserModel = mongoose.model('User', userSchema)
module.exports = UserModel
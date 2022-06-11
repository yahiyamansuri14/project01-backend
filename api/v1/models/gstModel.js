const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gstSchema = new Schema({
    gst_file_info :{
        gst_ack_no: {type: String},
        coupon_name: {type: String},
        coupon_id: {type: String},
        gst_type: {type: String},
        gst_subtype: {type: String},
        gst_no: {type: String},
        // gst_portal_username: {type: String}, 
        // gst_portal_password: {type: String},
        // gst_file_from_user: {type: String}, 
        month: {type: String},
        year: {type: String},
        loginId: {type: String}
    },
    business_info: {
        gst_client_id: {type: String}, 
        business_id: {type: String}, 
        entity_detail: {type: String},
        business_nature: {type: String},
        business_name: {type: String},
        business_pan_no: {type: String},
        business_mobile: {type: String},
        business_state: {type: String},
        business_district: {type: String},
        business_address: {type: String},
        business_ward: {type: String},
        business_pincode: {type: String},
        business_annual_turnover: {type: Number},
        business_object: {type: String},
        business_total_sales_amount: {type: Number},
        business_total_purchase_amount: {type: Number}
    },
    director_basic_detail: {
        director_name: {type: String},
        director_father_name: {type: String},
        director_dob: {type: Date},
        director_pan_no: {type: String},
        director_aadhar_no: {type: String},
        director_mobile: {type: String},
        director_email: {type: String},
        director_pincode: {type: String},
        director_address: {type: String}

    },
    authorized_signature_basic_detail: {
        authorized_name: {type: String},
        authorized_father_name: {type: String},
        authorized_dob: {type: Date},
        authorized_pan_no: {type: String},
        authorized_aadhar_no: {type: String},
        authorized_mobile: {type: String},
        authorized_email: {type: String},
        authorized_pincode: {type: String},
        authorized_address: {type: String}
    },
    bank_details: {
        account_type: {type: String},
        account_holder_name: {type: String},
        account_number: {type: String},
        ifsc_code: {type: String},
        bank_name: {type: String},
        bank_address: {type: String}
    },
    files: {
        photo_url: {type: String},
        aadhar_card_url: {type: String},
        cancel_cheque_url: {type: String},
        light_bill_url: {type: String},
        rent_aggrement_url:{type: String},
        co_letter_url: {type: String},
        authorization_letter: {type: String},
        other_document: {type: String},
        pancard_url: {type: String}
        
    },
    admin: {
        remark: {type: String},
        status: {type: String},
        bdm_email: {type: String},
        bdm_id: {type:String}
    }
},{timestamps: true})

const GstModel = mongoose.model('Gst', gstSchema)
module.exports = GstModel
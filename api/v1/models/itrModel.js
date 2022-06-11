const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itrSchema = new Schema({
    itr_info: {
        ack_no: { type: String, required: true },
        file_type: { type: String },
        itr_type: { type: String },
        assmt_year: { type: String },
        is_deleted: { type: Boolean, default: false },
        status: { type: String },
        product_name: { type: String },
        product_id: { type: String }
    },
    personal_info: {
        client_code: { type: String, required: true },
        loginId: { type: String, required: true },
        group: { type: String, required: true },
        pan: { type: String, required: true },
        first_name: { type: String, required: true },
        middle_name: { type: String },
        last_name: { type: String, required: true },
        dob: { type: Date, required: true },
        father_name: { type: String, required: true },
        adhar_no: { type: String, required: true },
        adhar_enrollment: { type: String },
        gender: { type: String, required: true },
    },
    address_details: {
        address_name: { type: String },
        address_number: { type: String },
        street: { type: String, required: true },
        area: { type: String, required: true },
        town: { type: String },
        state: { type: String, required: true },
        district: { type: String, required: true },
        pincode: { type: String, required: true },
        country: { type: String, required: true, default: 'INDIA' },
    },
    contact_details: {
        landline: { type: String },
        primary_mobile: { type: String, required: true },
        secondary_mobile: { type: String },
        primary_email: { type: String, required: true },
        secondary_email: { type: String },
        contact_type: { type: String }
    },
    bank_details: [
        {
            ifsc_code: { type: String, required: true },
            bank_name: { type: String, required: true },
            account_type: { type: String, required: true },
            account_no: { type: String, required: true },
        }
    ],
    files: {
        to_be: { type: Boolean, default: true },
        pan_card_url: { type: String },
        aadhar_card_url: { type: String },
        previous_itr_url: { type: String },
        form_16a_url: { type: String },
        balance_sheet_url: { type: String },
        laon_document: { type: String },
        tax_saving_doc_url: { type: String },
        other_attachement_url: { type: String },
        land_sale_purchage_document: { type: String },
        share_details: { type: String },
        form_16_url: { type: String },


    },
    income_from_salary: {
        to_be: { type: Boolean, default: true },
        company_name: { type: String },
        address: { type: String },
        employee_type: { type: String },
        salary: { type: Number },
        value_of_prequisities: { type: Number },
        profit_lieu_salary: { type: Number },
        gross_salary: { type: Number },
        other_exempt_allowance: { type: Number },
        standard_deduction: { type: Number },
        entertainment_allowance: { type: Number },
        professional_tax: { type: Number },
        income_charge_salary: { type: Number },
        basic_salary: { type: Number },
        hra: { type: Number },
        rent_paid: { type: Number },
        arrear: { type: Boolean },
        arrear_amount: { type: Number }
    },
    income_from_property: {
        to_be: { type: Boolean, default: true },
        property_type: { type: String },
        address: { type: String },
        gross_rent: { type: Number },
        tax_paid_to_local: { type: Number },
        annual_value: { type: Number },
        annual_value_30: { type: Number },
        interest_home_loan: { type: Number },
        income_charge_house_property: { type: Number }
    },
    income_from_other_sources: {
        to_be: { type: Boolean, default: true },
        income_from_tution: { type: Number },
        income_from_saving_bank: { type: Number },
        interest_from_fd: { type: Number },
        interest_from_income_tax_return: { type: Number },
        other_party_interest: { type: Number },
        income_from_commission: { type: Number },
        income_from_dividend: { type: Number },
        deduction_family_pension: { type: Number },
        gift_from_other: { type: Number },
        agriculture_income: { type: Number },
        casual_income: { type: Number },
        other_income: { type: Number },
        income_charge_other_sources: { type: Number }
    },
    income_from_capital_gain: {
        to_be: { type: Boolean, default: true },
        property_type: { type: String },
        date_of_sale: { type: Date },
        sale_price: { type: Number },
        date_of_purchase: { type: Date },
        purchase_price: { type: Number },
        selling_expenses: { type: Number },
        cost_of_improvement: { type: Number },
        date_of_improvement: { type: Date }
    },
    income_from_profession_business: {
        to_be: { type: Boolean, default: true },
        profession_service_name: { type: String },
        type_of_profession: { type: String },
        gross_receipt: { type: Number },
        net_profit: { type: Number },
        /* assets & liabilities */
        partner_own_capital: { type: Number },
        secured_loans: { type: Number },
        unsecured_loans: { type: Number },
        advances: { type: Number },
        sundry_creditors: { type: Number },
        other_liabilities: { type: Number },
        total_capital_liabilities: { type: Number },
        /* assests details */
        fixed_assets: { type: Number },
        inventories: { type: Number },
        sundry_debators: { type: Number },
        balance_with_bank: { type: Number },
        cash_in_hand: { type: Number },
        loans_and_advances: { type: Number },
        other_current_assests: { type: Number },
        total_assets: { type: Number }
    },
    income_from_transport_business: [{
        to_be: { type: Boolean, default: true },
        business_name: { type: String },
        number_of_vehicles: { type: Number },
        vehicle_registration_no: { type: String },
        vehicle_type: { type: String },
        tonnage_capacity: { type: Number },
        period_of_holding: { type: Number },
        income_per_vehicle: { type: Number },
        deemed_income: { type: Number },
        vehicle_rc_url: { type: String },
        /* assets & liabilities */
        partner_own_capital: { type: Number },
        secured_loans: { type: Number },
        unsecured_loans: { type: Number },
        advances: { type: Number },
        sundry_creditors: { type: Number },
        other_liabilities: { type: Number },
        total_capital_liabilities: { type: Number },
        /* assests details */
        fixed_assets: { type: Number },
        inventories: { type: Number },
        sundry_debators: { type: Number },
        balance_with_bank: { type: Number },
        cash_in_hand: { type: Number },
        loans_and_advances: { type: Number },
        other_current_assests: { type: Number },
        total_assets: { type: Number }
    }
    ],
    income_from_other_business: {
        to_be: { type: Boolean, default: true },
        business_name: { type: String },
        business_type: { type: String },
        book_maintained: { type: Boolean },
        cash_sales: { type: Number },
        bank_sales: { type: Number },
        total_gross_sales: { type: Number },
        cash_sales_net_profit: { type: Number },
        bank_sales_net_profit: { type: Number },
        income_net_profit: { type: Number },
        total_income: { type: Number },
        opening_stock: { type: Number },
        purchase: { type: Number },
        closing_stock: { type: Number },
        gross_profit: { type: Number },
        /* assets & liabilities */
        partner_own_capital: { type: Number },
        secured_loans: { type: Number },
        unsecured_loans: { type: Number },
        advances: { type: Number },
        sundry_creditors: { type: Number },
        other_liabilities: { type: Number },
        total_capital_liabilities: { type: Number },
        /* assests details */
        fixed_assets: { type: Number },
        inventories: { type: Number },
        sundry_debators: { type: Number },
        balance_with_bank: { type: Number },
        cash_in_hand: { type: Number },
        loans_and_advances: { type: Number },
        other_current_assests: { type: Number },
        total_assets: { type: Number }
    },
    income_from_exempted_sources: {
        to_be: { type: Boolean, default: true },
        exempted_income_head: { type: String },
        exempted_income_description: { type: String },
        amount: { type: Number }
    },
    deduction_80c: {
        to_be: { type: Boolean, default: true },
        life_insurance: { type: Number },
        provident_fund: { type: Number },
        mutual_fund: { type: Number },
        fixed_deposit: { type: Number },
        sukanya_samridhi_yojna: { type: Number },
        annuity_plan: { type: Number },
        tution_fees: { type: Number },
        principle_payment_housing_loan: { type: Number },
        deductable_1: { type: Number },
        deductable_2: { type: Number }
    },
    deduction_80d: {
        to_be: { type: Boolean, default: true },
        is_family_member_senior_citizen: { type: Boolean },
        self_and_family_member_health_insurance: { type: Number },
        self_and_family_member_preventive_health_checkup: { type: Number },
        self_and_family_senior_citizen_health_insurance: { type: Number },
        self_and_family_senior_citizen_preventive_health_checkup: { type: Number },
        self_and_family_senior_citizen_medical_expenditure: { type: Number },
        is_parent_senior_citizen: { type: Boolean },
        parent_health_insurance: { type: Number },
        parent_preventive_health_checkup: { type: Number },
        parent_senior_citizen_health_insurance: { type: Number },
        parent_senior_citizen_preventive_health_checkup: { type: Number },
        parent_senior_citizen_medical_expenditure: { type: Number },
        eligible_amount_of_deduction: { type: Number }
    },
    deduction_80g: {
        to_be: { type: Boolean, default: true },
        deduction_80g_type: { type: String },
        name_of_donee: { type: String },
        address: { type: String },
        pan_of_donee: { type: String },
        city: { type: String },
        state: { type: String },
        pincode: { type: String },
        cash_donation: { type: Number },
        other_donation: { type: String },
        amount_of_other_donation: { type: Number }
    },
    other_deduction: {
        to_be: { type: Boolean, default: true },
        npf: { type: Number },
        nps: { type: Number },
        addition_nps: { type: Number },
        employer_nps: { type: Number },
        equity_scheme: { type: Number },
        rent_paid_not_hra: { type: Number },
        medical_treatment_dependent: { type: Number },
        interest_loan_higher_education: { type: Number },
        interest_loan_residential_house: { type: Number },
        deduction_for_loan_house_property: { type: Number },
        deduction_electric_vehicle: { type: Number },
        deduction_person_disability: { type: Number },
        interest_deposit_saving_account: { type: Number },
        interest_deposit_senior_citizen: { type: Number },
        donation_to_political_party: { type: Number },
        royalty_on_patents: { type: Number }
    },
    tds_on_salary: {
        to_be: { type: Boolean, default: true },
        income_charge_salary: { type: Number },
        employer_name: { type: String },
        tan_of_employer: { type: String },
        employer_category: { type: String },
        tax_deduction_salary: { type: String },
        address: { type: String },
        city: { type: String },
        state: { type: String },
        pincode: { type: String }
    },
    non_salary_tds: {
        to_be: { type: Boolean, default: true },
        deductor_tan: { type: String },
        deductor_name: { type: String },
        total_tax_deducted: { type: String },
        total_amount_paid: { type: Number },
        head_of_income: { type: String },
        deduction_year: { type: String }
    },
    tax_collected_at_source: {
        to_be: { type: Boolean, default: true },
        tax_collection_account_number: { type: String },
        collector_name: { type: String },
        tax_collected: { type: Number },
        tcs_amount_claimed: { type: Number },
        amount_paid: { type: Number }
    },
    advance_tax: {
        to_be: { type: Boolean, default: true },
        bsr_code: { type: String },
        date_of_deposite: { type: Date },
        challan_number: { type: String },
        challan_amount: { type: Number },
        interest_paid: { type: Number }
    },
    tds_26_qc: {
        to_be: { type: Boolean, default: true },
        pan_of_deductor: { type: String },
        deductor_name: { type: String },
        amount_tax_deduction: { type: Number },
        year: { type: Number },
        tax_deducted: { type: Number }
    },
    summary: {
        to_be: { type: Boolean, default: true },
        income_from_salary: { type: Number },
        income_from_capital_gain: { type: Number },
        income_from_other_sources: { type: Number },
        income_from_property: { type: Number },
        income_from_profession_business: { type: Number },
        income_from_transport_business: { type: Number },
        income_from_other_business: { type: Number },
        deduction_80c: { type: Number },
        deduction_80d: { type: Number },
        deduction_80g: { type: Number },
        other_deduction: { type: Number },
        tds_on_salary: { type: Number },
        non_salary_tds: { type: Number },
        tax_collected_at_source: { type: Number },
        advance_tax: { type: Number },
        tds_26_qc: { type: Number },
        expected_income: { type: Number },
        gross_total_income: { type: Number },
        gross_total_deduction: { type: Number },
        net_taxable_income: { type: Number },
        total_tax_paid: { type: Number }
    }
}, { timestamps: true })

const ItrModel = mongoose.model('Itr', itrSchema)
module.exports = ItrModel
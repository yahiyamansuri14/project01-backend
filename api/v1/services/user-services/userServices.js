const userDao = require("../../dao/user-dao/userDao")
const uploadHelper = require("../../helper/fileUploadHelper")
const httpStatusCodes = require("../../helper/httpStatus")

const userServices = { }

userServices.getUserCount = async (req, res) => {
    let count;
    try {
        count = await userDao.getTotalUserCount()
        if(count) {
            return res.status(httpStatusCodes.OK).json(count)
        } else {
            return res.status(httpStatusCodes.NOT_FOUND).json({message: "NOT FOUND"})
        }
    } catch(e) {  return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"})}
}

userServices.addgroup = async (req, res) => {
    let loginId = req.decoded.id
    let name = req.body.name
    let options = {loginId, name}
    console.log(req.body)
    userDao.addgroup(options).then(data => {
        console.log(data)
        return res.status(data.code).json(data)
    }).catch(error => {
        console.log("3", error)
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json(error)
    })
}

userServices.savePersonalInfoItr = async (req, res) => {
    // console.log(req)
    let loginId = req.decoded.id
    let { group, pan, first_name, last_name, middle_name, dob, father_name, adhar_no, adhar_enrollment, gender,
        address_name, address_number, street, area, town, state, district, pincode, landline, primary_mobile, secondary_mobile, primary_email,
        secondary_email, contact_type, ifsc_code, bank_name, account_type, account_no
    } = req.body
    console.log(req.body)
    let personal_info = {
         group, loginId, pan, first_name, last_name, middle_name,dob, father_name, adhar_no, adhar_enrollment,gender
    }
    let address_details = { address_name, address_number, street, area, town, town, state, district, pincode}
    let contact_details = {landline, primary_mobile, secondary_mobile, primary_email, secondary_email, contact_type}
    let bank_details = {ifsc_code, bank_name, account_type, account_no}
    let options = {personal_info, address_details, contact_details, bank_details}
    try {
        let data = await userDao.savePersonalInfoItr(options)
        if(data) {
            return res.status(httpStatusCodes.OK).json(data)
        } else {
            return res.status(httpStatusCodes.NOT_FOUND).json({message: "NOT FOUND"})
        }
    } catch (e) {
            return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"})
    }
}

userServices.updateItrInfo1 = async (req, res) => {
    let loginId = req.decoded.id
    let options = {}
    let {itr_type, file_type, assmt_year, id} = req.body
    let itr_info = {
        itr_type , file_type, assmt_year
    }
    options.itr_info = itr_info
    options.loginId = loginId
    options.id = id

    try {
        let data = await userDao.updateItrInfo1(options)
        if(data) {
            return res.status(httpStatusCodes.OK).json(data)
        } else {
            return res.status(httpStatusCodes.NOT_FOUND).json({message: "NOT FOUND"})
        }
    } catch (e) {
            return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"})
    }
}



userServices.updateIncomeFromSalary = async (req, res) => {
    console.log("inside update income from salary")
    let loginId = req.decoded.id
    let {type, id} = req.body
    let income_from_salary = {}
    let options = {}
        let { company_name, address, employee_type, salary, value_of_prequisities, profit_lieu_salary, gross_salary, other_exempt_allowance,
            standard_deduction, entertainment_allowance,professional_tax,income_charge_salary,basic_salary,hra, rent_paid, arrear, arrear_amount
        } = req.body
        arrear = Boolean(arrear)
        income_from_salary = {company_name, address, employee_type, salary, value_of_prequisities, profit_lieu_salary, gross_salary, other_exempt_allowance,
            standard_deduction, entertainment_allowance,professional_tax,income_charge_salary,basic_salary,hra, rent_paid, arrear, arrear_amount}
            options = {income_from_salary}
            options.loginId = loginId
            options.id = id

    
    try {
        let data = await userDao.updateIncomeFromSalary(options)
        if(data) {
            return res.status(httpStatusCodes.OK).json({data: data})
        } else {
            return res.status(httpStatusCodes.NOT_FOUND).json({message: "NOT FOUND"})
        }
    } catch (e) {
        console.log(e)
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"})
    }
    
}

userServices.updateIncomeFromProperty = async (req, res) => {
    console.log(req.body)
    let loginId = req.decoded.id
    let { id} = req.body
    let options = {loginId, id}
    let {
       property_type, address, gross_rent, tax_to_local, annual_value, annual_30, interest_loan, income_charge
    } = req.body
    let income_from_property = {
        property_type, address, gross_rent, tax_paid_to_local: tax_to_local, annual_value, annual_value_30: annual_30, interest_home_loan:interest_loan, income_charge_house_property:income_charge
    }
    options.income_from_property = income_from_property
    try {
        let data = await userDao.updateIncomeFromProperty(options)
        if(data) {
            return res.status(httpStatusCodes.OK).json(data)
        } else {
            return res.status(httpStatusCodes.NOT_FOUND).json({message: "NOT FOUND"})
        }
    } catch (e) {
        console.log(e)
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"})
    }

}

userServices.updateIncomeFromOtherSources = async (req, res) => {
    let loginId = req.decoded.id
    let { id} = req.body
    let options = {loginId, id}
    let {
        income_from_tution, income_from_saving_bank, interest_from_fd, interest_from_income_tax_return, other_party_interest, income_from_commission,income_from_dividend, deduction_family_pension,
        gift_from_other, agriculture_income, casual_income, other_income, income_charge_other_sources
    } = req.body

    let income_from_other_sources = {
        income_from_tution, income_from_saving_bank, interest_from_fd, interest_from_income_tax_return, other_party_interest, income_from_commission,income_from_dividend, deduction_family_pension,
        gift_from_other, agriculture_income, casual_income, other_income, income_charge_other_sources
    }
    options.income_from_other_sources = income_from_other_sources
    try {
        let data = await userDao.updateIncomeFromOtherSources(options)
        if(data) {
            return res.status(httpStatusCodes.OK).json({data: data})
        } else {
            return res.status(httpStatusCodes.NOT_FOUND).json({message: "NOT FOUND"})
        }
    } catch (e) {
        console.log(e)
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"})
    }
}

userServices.updateIncomeFromCapitalGain = async (req, res) => {
    let loginId = req.decoded.id
    let { id} = req.body
    let options = {loginId, id}
    // console.log(req.body)
    let {
        property_type, date_of_sale, sale_price, date_of_purchase,purchase_price, selling_expenses, cost_of_improvement, date_of_improvement
    } = req.body

    let income_from_capital_gain = {
        property_type, date_of_sale, sale_price, date_of_purchase, purchase_price, selling_expenses, cost_of_improvement, date_of_improvement
    }

    options.income_from_capital_gain = income_from_capital_gain
    console.log(options)
    try {
        let data = await userDao.updateIncomeFromCapitalGain(options)
        if(data) {
            return res.status(httpStatusCodes.OK).json({data: data})
        } else {
            return res.status(httpStatusCodes.NOT_FOUND).json({message: "NOT FOUND"})
        }
    } catch (e) {
        console.log(e)
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"})
    }
}

userServices.updateIncomeFromProfessionBusiness = async (req, res) => {
    let loginId = req.decoded.id
    let { id} = req.body
    let options = {loginId, id}
    let {
        profession_service_name, type_of_profession,gross_receipt, net_profit, 
        partner_own_capital, secured_loans, unsecured_loans, advances, sundry_creditors, other_liabilities, total_capital_liabilities,
        fixed_assets, inventories, sundry_debators, balance_with_bank, cash_in_hand, loans_and_advances, other_current_assests, total_assets
    } = req.body

    let income_from_profession_business = {
        profession_service_name, type_of_profession,gross_receipt, net_profit, 
        partner_own_capital, secured_loans, unsecured_loans, advances, sundry_creditors, other_liabilities, total_capital_liabilities,
        fixed_assets, inventories, sundry_debators, balance_with_bank, cash_in_hand, loans_and_advances, other_current_assests, total_assets
    }

    options.income_from_profession_business = income_from_profession_business
    try {
        let data = await userDao.updateIncomeFromProfessionBusiness(options)
        if(data) {
            return res.status(httpStatusCodes.OK).json({data: data})
        } else {
            return res.status(httpStatusCodes.NOT_FOUND).json({message: "NOT FOUND"})
        }
    } catch (e) {
        console.log(e)
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"})
    }
}

userServices.updateIncomeFromTransportBusiness = async (req, res) => {
    let loginId = req.decoded.id
    let { id} = req.body
    let options = {loginId, id}
    let {
        business_name, number_of_vehicles, vehicle_registration_no, vehicle_type, tonnage_capacity, period_of_holding, income_per_vehicle, deemed_income, file1_base64, file_name
    } = req.body
    let vehicle_rc_url
    try {
        if(file1_base64 != undefined &&  file1_base64 != null) {
            vehicle_rc_url = await uploadHelper.base64UploadWithFileName(file1_base64, file_name)
        }
    } catch(e) {console.log(e)}
    let income_from_transport_business = {
        business_name, number_of_vehicles, vehicle_registration_no, vehicle_type, tonnage_capacity, period_of_holding, income_per_vehicle, deemed_income,vehicle_rc_url
    }

    options.income_from_transport_business = income_from_transport_business
    try {
        let data = await userDao.updateIncomeFromTransportBusiness(options)
        if(data) {
            return res.status(httpStatusCodes.OK).json({data: data})
        } else {
            return res.status(httpStatusCodes.NOT_FOUND).json({message: "NOT FOUND"})
        }
    } catch (e) {
        console.log(e)
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"})
    }
}

userServices.udpateIncomeFromOtherBusiness = async (req, res) => {
    let loginId = req.decoded.id
    let { id} = req.body
    let options = {loginId, id}
    let {
        business_name, business_type, book_maintained, cash_sales, bank_sales, total_gross_sales, cash_sales_net_profit, bank_sales_net_profit, income_from_net_profit, total_income, opening_stock, purchase, closing_stock, gross_profit,
        partner_own_capital, secured_loans, unsecured_loans, advances, sundry_creditors, other_liabilities, total_capital_liabilities,
        fixed_assets, inventories, sundry_debators, balance_with_bank, case_in_hand, loans_and_advances, other_current_assests, total_assets
    } = req.body

    let income_from_other_business = {
        profession_service_name, type_of_profession,gross_receipt, net_profit, 
        partner_own_capital, secured_loans, unsecured_loans, advances, sundry_creditors, other_liabilities, total_capital_liabilities,
        fixed_assets, inventories, sundry_debators, balance_with_bank, case_in_hand, loans_and_advances, other_current_assests, total_assets
    }

    options.income_from_other_business = income_from_other_business
    try {
        let data = await userDao.udpateIncomeFromOtherBusiness(options)
        if(data) {
            return res.status(httpStatusCodes.OK).json({data: data})
        } else {
            return res.status(httpStatusCodes.NOT_FOUND).json({message: "NOT FOUND"})
        }
    } catch (e) {
        console.log(e)
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"})
    }
}

userServices.updateInocmeFromExemptedSources = async (req, res) => {
    let loginId = req.decoded.id
    let { id} = req.body
    let options = {loginId, id}
    let {
        exempted_income_head, exempted_income_description, amount
    } = req.body

    let income_from_exempted_sources = {
        exempted_income_head, exempted_income_description, amount
    }

    options.income_from_exempted_sources = income_from_exempted_sources
    try {
        let data = await userDao.updateIncomeFromExemptedSource(options)
        if(data) {
            return res.status(httpStatusCodes.OK).json({data: data})
        } else {
            return res.status(httpStatusCodes.NOT_FOUND).json({message: "NOT FOUND"})
        }
    } catch (e) {
        console.log(e)
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"})
    }
}

userServices.updateDeduction80c = async (req, res) => {
    let loginId = req.decoded.id
    let { id} = req.body
    let options = {loginId, id}
    let {
        life_insurance, provident_fund, mutual_fund, fixed_deposit, sukanya_samridhi_yojna, annuity_paid, tution_fees, principle_payment_housing_loan, deductable_1, deductable_2
    } = req.body

    let deduction_80c = {
        life_insurance, provident_fund, mutual_fund, fixed_deposit, sukanya_samridhi_yojna, annuity_paid, tution_fees, principle_payment_housing_loan, deductable_1, deductable_2
    }

    options.deduction_80c = deduction_80c
    try {
        let data = await userDao.updateDeduction80c(options)
        if(data) {
            return res.status(httpStatusCodes.OK).json({data: data})
        } else {
            return res.status(httpStatusCodes.NOT_FOUND).json({message: "NOT FOUND"})
        }
    } catch (e) {
        console.log(e)
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"})
    }
}

userServices.updateDeduction80d = async (req, res) => {
    let loginId = req.decoded.id
    let { id} = req.body
    let options = {loginId, id}
    let {
        is_family_member_senior_citizen, self_and_family_member_health_insurance, self_and_family_member_preventive_health_checkup, self_and_family_senior_citizen_health_insurance,
        self_and_family_senior_citizen_preventive_health_checkup,self_and_family_senior_citizen_medical_expenditure, is_parent_senior_citizen, parent_health_insurance, parent_preventive_health_checkup,
        parent_senior_citizen_health_insurance, parent_senior_citizen_preventive_health_checkup, parent_senior_citizen_medical_expenditure, eligible_amount_of_deduction
    } = req.body

    let deduction_80d = {
        is_family_member_senior_citizen, self_and_family_member_health_insurance, self_and_family_member_preventive_health_checkup, self_and_family_senior_citizen_health_insurance,
        self_and_family_senior_citizen_preventive_health_checkup,self_and_family_senior_citizen_medical_expenditure, is_parent_senior_citizen, parent_health_insurance, parent_preventive_health_checkup,
        parent_senior_citizen_health_insurance, parent_senior_citizen_preventive_health_checkup, parent_senior_citizen_medical_expenditure, eligible_amount_of_deduction
    }

    options.deduction_80d = deduction_80d
    try {
        let data = await userDao.updateDeduction80d(options)
        if(data) {
            return res.status(httpStatusCodes.OK).json({data: data})
        } else {
            return res.status(httpStatusCodes.NOT_FOUND).json({message: "NOT FOUND"})
        }
    } catch (e) {
        console.log(e)
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"})
    }
}


userServices.updateDeduction80g = async (req, res) => {
    let loginId = req.decoded.id
    let { id} = req.body
    let options = {loginId, id}
    let {
        deduction_80g_type, name_of_donee, address, pan_of_donee, city, state, pincode, cash_donation, other_donation, amount_of_other_donation
    } = req.body

    let deduction_80g = {
        deduction_80g_type, name_of_donee, address, pan_of_donee, city, state, pincode, cash_donation, other_donation, amount_of_other_donation
    }

    options.deduction_80g = deduction_80g
    try {
        let data = await userDao.updateDeduction80g(options)
        if(data) {
            return res.status(httpStatusCodes.OK).json({data: data})
        } else {
            return res.status(httpStatusCodes.NOT_FOUND).json({message: "NOT FOUND"})
        }
    } catch (e) {
        console.log(e)
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"})
    }
}

userServices.other_deduction = async (req, res) => {
    let loginId = req.decoded.id
    let { id} = req.body
    let options = {loginId, id}
    let {
        npf, nps, addition_nps, employer_nps, equity_scheme, rent_paid_on_hra, medical_treatment_dependent, interest_loan_higher_eductation, interest_loan_residential_house, deduction_for_loan_house_property,
        deduction_electric_vehicle, deduction_person_disability, interesst_deposit_saving_account, interest_deposit_senior_citizen, dontaion_to_political_party, royalty_on_patents
    } = req.body

    let other_deduction = {
        npf, nps, addition_nps, employer_nps, equity_scheme, rent_paid_on_hra, medical_treatment_dependent, interest_loan_higher_eductation, interest_loan_residential_house, deduction_for_loan_house_property,
        deduction_electric_vehicle, deduction_person_disability, interesst_deposit_saving_account, interest_deposit_senior_citizen, dontaion_to_political_party, royalty_on_patents
    }

    options.other_deduction = other_deduction
    try {
        let data = await userDao.updateOtherDeduction(options)
        if(data) {
            return res.status(httpStatusCodes.OK).json({data: data})
        } else {
            return res.status(httpStatusCodes.NOT_FOUND).json({message: "NOT FOUND"})
        }
    } catch (e) {
        console.log(e)
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"})
    }
}

userServices.updateTdsOnSalary = async (req, res) => {
    let loginId = req.decoded.id
    let { id} = req.body
    let options = {loginId, id}
    let {
        income_charge_salary, employer_name, tan_of_employer, tax_deduction_salary, employer_category, address, city, state, pincode
    } = req.body

    let tds_on_salary = {
        income_charge_salary, employer_name, tan_of_employer, tax_deduction_salary, employer_category, address, city, state, pincode
    }

    options.tds_on_salary = tds_on_salary
    try {
        let data = await userDao.updateTdsOnSalary(options)
        if(data) {
            return res.status(httpStatusCodes.OK).json({data: data})
        } else {
            return res.status(httpStatusCodes.NOT_FOUND).json({message: "NOT FOUND"})
        }
    } catch (e) {
        console.log(e)
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"})
    }
}

userServices.updateNonSalaryTds = async (req, res) => {
    let loginId = req.decoded.id
    let { id} = req.body
    let options = {loginId, id}
    let {
        deductor_tan , deductor_name, total_tax_deduction, total_amount_paid, head_of_income, deduction_year
    } = req.body

    let non_salary_tds = {
        deductor_tan , deductor_name, total_tax_deduction, total_amount_paid, head_of_income, deduction_year
    }

    options.non_salary_tds = non_salary_tds
    try {
        let data = await userDao.updateNonSalaryTds(options)
        if(data) {
            return res.status(httpStatusCodes.OK).json({data: data})
        } else {
            return res.status(httpStatusCodes.NOT_FOUND).json({message: "NOT FOUND"})
        }
    } catch (e) {
        console.log(e)
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"})
    }
}

userServices.updateTaxCollectedAtSource = async (req, res) => {
    let loginId = req.decoded.id
    let { id} = req.body
    let options = {loginId, id}
    let {
        tax_collection_account_number, collector_name, tax_collected, tcs_amount_claimed, amount_paid
    } = req.body

    let tax_collected_at_source = {
        tax_collection_account_number, collector_name, tax_collected, tcs_amount_claimed, amount_paid
    }

    options.tax_collected_at_source = tax_collected_at_source
    try {
        let data = await userDao.updateTaxCollectedAtSource(options)
        if(data) {
            return res.status(httpStatusCodes.OK).json({data: data})
        } else {
            return res.status(httpStatusCodes.NOT_FOUND).json({message: "NOT FOUND"})
        }
    } catch (e) {
        console.log(e)
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"})
    }
}


userServices.updateAdvanceTax = async (req, res) => {
    let loginId = req.decoded.id
    let { id} = req.body
    let options = {loginId, id}
    let {
        bsr_code, date_of_deposite, challan_number, challan_amount, interest_paid
    } = req.body

    let advance_tax = {
        bsr_code, date_of_deposite, challan_number, challan_amount, interest_paid
    }

    options.advance_tax = advance_tax
    try {
        let data = await userDao.updateAdvanceTax(options)
        if(data) {
            return res.status(httpStatusCodes.OK).json({data: data})
        } else {
            return res.status(httpStatusCodes.NOT_FOUND).json({message: "NOT FOUND"})
        }
    } catch (e) {
        console.log(e)
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"})
    }
}

userServices.updateTds26qc = async (req, res) => {
    let loginId = req.decoded.id
    let { id} = req.body
    let options = {loginId, id}
    let {
        pan_of_deductor, deductor_name, amount_tax_deduction, year, tax_deducted
    } = req.body

    let tds_26_qc = {
        pan_of_deductor, deductor_name, amount_tax_deduction, year, tax_deducted
    }

    options.tds_26_qc = tds_26_qc
    try {
        let data = await userDao.updateTds26qc(options)
        if(data) {
            return res.status(httpStatusCodes.OK).json({data: data})
        } else {
            return res.status(httpStatusCodes.NOT_FOUND).json({message: "NOT FOUND"})
        }
    } catch (e) {
        console.log(e)
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"})
    }
}

userServices.summary = async (req, res) => {
    let loginId = req.decoded.id
    let { id} = req.body
    let options = {loginId, id}
    let {
        income_from_salary, income_from_capital_gain, income_from_other_sources, income_from_property, income_from_profession_business, income_from_transport_business, deduction_80c, deduction_80d, deduction_80g,
        tds_on_salary, non_salary_tds, tax_collected_at_source, advance_tax, tds_26_qc, expected_income, gross_total_income, gross_total_deduction, net_taxable_income, total_tax_paid
    } = req.body

    let summary = {
        income_from_salary, income_from_capital_gain, income_from_other_sources, income_from_property, income_from_profession_business, income_from_transport_business, deduction_80c, deduction_80d, deduction_80g,
        tds_on_salary, non_salary_tds, tax_collected_at_source, advance_tax, tds_26_qc, expected_income, gross_total_income, gross_total_deduction, net_taxable_income, total_tax_paid
    }

    options.summary = summary
    try {
        let data = await userDao.summary(options)
        if(data) {
            return res.status(httpStatusCodes.OK).json({data: data})
        } else {
            return res.status(httpStatusCodes.NOT_FOUND).json({message: "NOT FOUND"})
        }
    } catch (e) {
        console.log(e)
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"})
    }
}

userServices.activateItrClient = (req, res) => {
    let loginId = req.decoded.id
    let options = req.body
    options.loginId = loginId
    userDao.activateItrClient(options).then(data => {
        return res.status(httpStatusCodes.OK).json(data)
    }) .catch(error => {
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json(error)
    })
}

userServices.getAllItrByBranch = async (req, res) => {
    let loginId  = req.decoded.id
    try {   
        let data = await userDao.getAllItr()
        if(data) {
            return res.status(httpStatusCodes.OK).json(data)
        } else {
            return res.status(httpStatusCodes.NOT_FOUND).json(data)
        }
    } catch(e) {
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({"message":"Internal Server Error"})
    }
}

userServices.getAllItrById = async (req, res) => {
    let loginId = req.decoded.id
    try {   
        let data = await userDao.getAllItrById(loginId)
        if(data) {
            return res.status(httpStatusCodes.OK).json(data)
        } else {
            return res.status(httpStatusCodes.NOT_FOUND).json(data)
        }
    } catch(e) {
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({"message":"Internal Server Error"})
    }
}

userServices.getItrById = async (req, res) => {
    let loginId = req.decoded.id
    let { id } = req.params
    let options = {loginId, id}
    let data
    try {   
        data = await userDao.getAllItrById(options)
        if(data) {
            return res.status(httpStatusCodes.OK).json(data)
        } else {
            return res.status(httpStatusCodes.NOT_FOUND).json(data)
        }
    } catch(e) {
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({"message":"Internal Server Error"})
    }
}

userServices.updateItrStatus = async (req ,res) => {
    let loginId = req.decoded.id
    let { id, status } = req.body
    let options = {loginId, id, status}
    let data
    try {
        data = await userDao.updateItrStatus(options)
        if(data) {
            return res.status(httpStatusCodes.OK).json(data)
        } else {
            return res.status(httpStatusCodes.NOT_FOUND).json(data)
        }
    } catch(e) {
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({"message":"Internal Server Error"})
    }
}

userServices.itrSearch = async (req, res) => {

}

userServices.changeStatus = (req, res) => {
    let loginId = req.decoded.id
    let { status, itrId } = req.body
    let options = { loginId, status, itrId }
    userDao.changeStatus(options).then(data => {
        return res.status(httpStatusCodes.OK).json({data: data})
    }).catch(error => {
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({"message":"Internal Server Error"})
    })
}

userServices.getUserDetails = (req, res) => {

}

userServices.deleteUser = (req, res) => {

}

userServices.addBank = (req, res) => {
    let options = req.body
    let loginId = req.decoded.id
    options.loginId = loginId
    userDao.addBank(options).then(data => {
        return res.status(httpStatusCodes.OK).json({data: data})
    }).catch(error => {
        console.log(error)
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({"message":"Internal Server Error"})
    })
}

userServices.getAllAdminBanks = async (req, res) => {
    let data;
    try {   
        data = await userDao.getAllAdminBanks()
        if(data) {
            return res.status(httpStatusCodes.OK).json(data)
        } else {
            return res.status(httpStatusCodes.NOT_FOUND).json(data)
        }
    } catch(e) {
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({"message":"Internal Server Error"})
    }
}

userServices.rechargeRequest = async (req, res) => {
    let loginId = req.decoded.id
    let options = req.body
    options.loginId = loginId
    let {file_base64, filename} = req.body
    let receipt = await uploadHelper.base64UploadWithFileName(file_base64, filename)
    options.receipt = receipt
    userDao.rechargeRequest(options).then(data => {
        return res.status(httpStatusCodes.OK).json(data)
    }).catch(error => {
        console.log(error)
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({"message":"Internal Server Error"})
    })
}

userServices.completeRecharge = async (req, res) => {
    let options = req.body
    try {   
        data = await userDao.completeRecharge(options)
        if(data) {
            return res.status(httpStatusCodes.OK).json(data)
        } else {
            return res.status(httpStatusCodes.NOT_FOUND).json(data)
        }
    } catch(e) {
        console.log(e)
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({"message":"Internal Server Error"})
    }

}

userServices.deniedRechargeRequest = (req, res) => {
    let {id} = req.params
    let loginId = req.decoded.id
    let options = { loginId, id }
    try {
        userDao.denyRechargeRequest(options).then(data => {
            return res.status(httpStatusCodes.OK).json({data: data})
        }).catch(error => {
            return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({"message":"Internal Server Error"})
        })
    } catch(e) { }
}

userServices.getRechargeByDate = async (req, res) => {
    let loginId = req.decoded.id
    console.log(loginId)
    let {start_date, end_date} = req.body
    let options = {loginId, start_date, end_date}
    let data;
    try {   
        data = await userDao.getRechargeByDate(options)
        // console.log(date)
        if(data) {
            return res.status(httpStatusCodes.OK).json(data)
        } else {
            return res.status(httpStatusCodes.NOT_FOUND).json(data)
        }
    } catch(e) {
        console.log(e)
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({"message":"Internal Server Error"})
    }
}



userServices.getAllRechargeById = async (req, res) => {
    let loginId = req.decoded.id
    let data = await userDao.getAllRechargeById(loginId)
    if(data) {
        return res.status(httpStatusCodes.OK).json({data: data})
    } else {
        return res.status(httpStatusCodes.NOT_FOUND).json({message: "NOT FOUND"})
    }
}

userServices.getAllRecharge = async (req, res) => {
    let loginId = req.decoded.id
    let data = await userDao.getAllRecharge()
    if(data) {
        return res.status(httpStatusCodes.OK).json(data)
    } else {
        return res.status(httpStatusCodes.NOT_FOUND).json({message: "NOT FOUND"})
    }
}


userServices.order = async (req, res) => {
    // console.log("in service decoded is", req.decoded)
    let {file1_base64, file2_base64, file3_base64, file4_base64} = req.body
    // console.log('request body is', req.body)
    let loginId = req.decoded.id
    let options = req.body
    options.loginId = loginId
    let file1_url;
    let file2_url;
    let file3_url;
    let file4_url;
    try {
        if(file1_base64 != undefined || file1_base64 != null){
            console.log()
            file1_url = await uploadHelper.base64Upload(file1_base64)
            console.log('inside service location is', file1_url)
            options.file1_url = file1_url
        }
        if(file2_base64 != undefined || file2_base64 != null){
            file2_url = await uploadHelper.base64Upload(file2_base64)
            console.log('inside services location is', file2_url)
            options.file2_url = file2_url
        }
        if(file3_base64 != undefined || file3_base64 != null){
            file3_url = await uploadHelper.base64Upload(file3_base64)
            options.file3_url = file3_url
        }
        if(file4_base64 != undefined || file4_base64 != null){
            file4_url = await uploadHelper.base64Upload(file4_base64)
            options.file4_url = file4_url
        }
    } catch(e) {
        console.log(e)
     }
    //  console.log(options)
    userDao.addOrder(options).then(data => {
        console.log(data)
        return res.status(httpStatusCodes.OK).json({data: data})
    }).catch(error => {
        console.log(error)
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({"message":"Internal Server Error"})
    })

}

userServices.getOrdersById = async (req, res) => {
     let loginId = req.decoded.id
     let options = {loginId}
     let data
     try {   
         data = await userDao.getOrdersById(options)
         if(data) {
             return res.status(httpStatusCodes.OK).json(data)
         } else {
             return res.status(httpStatusCodes.NOT_FOUND).json(data)
         }
     } catch(e) {
         return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({"message":"Internal Server Error"})
     }
}

userServices.addProduct = async (req, res) => {
    let options = req.body
    let { file_base64, filename } = req.body
    let file_url;
    try {
        file_url = await uploadHelper.base64UploadWithFileName(file_base64, filename)
    } catch(e) { }
    options.file_url = file_url
    userDao.addProduct(options).then(data => {
        return res.status(httpStatusCodes.OK).json({data: data})
    }).catch(error => {
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({"Message":"Internal Server Error"})
    })
}

userServices.deleteProductById = async (req, res) => {
    let id = req.body.id
    console.log(id)
    let data = await userDao.deleteProductById(id)
    if(data) {
        return res.status(httpStatusCodes.OK).json(data)
    } else {
        return res.status(httpStatusCodes.NOT_FOUND).json({message: "NOT FOUND"})
    }
}


//write method for delete and update product too

userServices.getAllProduct = async (req, res) => {
    console.log("inside get all product")
    let data = await userDao.getAllProduct()
    if(data) {
        return res.status(httpStatusCodes.OK).json({data: data})
    } else {
        return res.status(httpStatusCodes.NOT_FOUND).json({message: "NOT FOUND"})
    }
}

userServices.getAllGstProducts = async (req, res) => {
    let data = await userDao.getAllGstProducts()
    if(data) {
        return res.status(httpStatusCodes.OK).json({data: data})
    } else {
        return res.status(httpStatusCodes.NOT_FOUND).json({message: "NOT FOUND"})
    }
}

userServices.getAllOrders = async (req, res) => {
    let data = await userDao.getAllOrders()
    if(data) {
        return res.status(httpStatusCodes.OK).json({data: data})
    } else {
        return res.status(httpStatusCodes.NOT_FOUND).json({message:"NOT FOUND"})
    }
}

userServices.getProductsByCategory = async (req, res) => {
    let {category} = req.body
    let data = await userDao.getProductsByCategory(category)
    if(data) {
        return res.status(httpStatusCodes.OK).json(data)
    } else {
        return res.status(httpStatusCodes.NOT_FOUND).json({message:"NOT FOUND"})
    }
}

userServices.updateProductById = async (req, res) => {
    let options = req.body
    let { file_base64, filename } = req.body
    if(file_base64 != undefined) {
        let file_url;
        try {
            file_url = await uploadHelper.base64UploadWithFileName(file_base64, filename)
        } catch(e) { }
        options.file_url = file_url
    }
    
    let data = await userDao.updateProduct(options)
    if(data) {
        return res.status(httpStatusCodes.OK).json(data)
    } else {
        return res.status(httpStatusCodes.NOT_FOUND).json({message:"NOT FOUND"})
    }
}


userServices.gstRegistration = (req, res) => {

}


userServices.fillGstReturn = (req, res) => {

}

userServices.getAllGroupByLoginId = async (req, res) => {
    let loginId = req.decoded.id
    
    let data;
    try {
        data = await userDao.getAllGroup(loginId)
        if(data) {
            return res.status(httpStatusCodes.OK).json(data)
        } else {
            return res.status(httpStatusCodes.NOT_FOUND).json({message:"NOT FOUND"})
        }
    } catch (e) { 
        console.log(e)
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"})}
}


userServices.getAllProductUnusedByid = async (req, res) => {
    let loginId = req.decoded.id
    console.log("inside unused")
    let data;
    try {
        data = await userDao.getAllPurchasedNonUsedProducts(loginId)
        if(data) {
            return res.status(httpStatusCodes.OK).json(data)
        } else {
            return res.status(httpStatusCodes.NOT_FOUND).json({message:"NOT FOUND"})
        }
    } catch (e) { 
        console.log(e)
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"})}
}


userServices.getAllBdm = async (req, res) => {
    
    let data;
    try {
        data = await userDao.getAllBdm()
        if(data) {
            return res.status(httpStatusCodes.OK).json(data)
        } else {
            return res.status(httpStatusCodes.NOT_FOUND).json({message:"NOT FOUND"})
        }
    } catch (e) { 
        console.log(e)
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"})}
}

// userServices.fileUpload = async (req, res) => {
//     // console.log(req.body)
//     // let { file } = req.files
//     // console.log(req.files)
//     console.log(req.body)
//     const { file } = req.body

//     // console.log(file)
//     let fileUrl = ''
//     try {
//         fileUrl = await uploadHelper.base64Upload(file)
//         console.log(fileUrl)
//     } catch(e) { console.log(e)}
    
//     return res.status(200).json({fileUrl})
// }

userServices.applyForGst = async (req, res) => {
    console.log("inside apply for gst")
    let loginId = req.decoded.id
    let { 
        coupon_name, coupon_id, gst_type, gst_subtype,
        entity_detail, business_nature, business_name, business_pan_no, business_mobile, business_state, business_district, business_address, business_ward, business_pincode, business_annual_turnover, business_object, business_total_sales_amount, business_total_purchase_amount,
        director_name, director_father_name, director_dob, director_pan_no, director_aadhar, director_mobile,director_email, director_pincode, director_address,
        authorized_name, authorized_father_name, authorized_dob, authorized_pan_no, authorized_aadhar, authorized_mobile,authorized_email, authorized_pincode, authorized_address,
        account_no, account_type, account_holder_name, ifsc_code, bank_name, bank_address,
     } = req.body
     //write logic for undefined field if they are undefined put null there
     //write logic to add files one by one 
     let {file1_base64, file2_base64, file3_base64, file4_base64, file5_base64, file6_base64, file7_base64, file8_base64, file9_base64} = req.body
     // console.log('request body is', req.body)
    //  /photo_file, aadhar_card_file, cancel_cheque_file, light_bill_file, rent_aggrement_file, co_letter_file, authorization_letter_file, other_document_file, pancard_file
     let photo_url;
     let aadhar_card_url;
     let cancel_cheque_url;
     let light_bill_url;
     let rent_aggrement_url;
     let co_letter_url;
     let authorization_letter;
     let other_document;
     let pancard_url;
     try {
         if(file1_base64 != undefined || file1_base64 != null){
             console.log()
             photo_url = await uploadHelper.base64Upload(file1_base64)
             console.log('inside service location is', photo_url)
            //  options.photo_url = file1_url
         } else {
             photo_url = "www.sampleurl.com"
         }
         if(file2_base64 != undefined || file2_base64 != null){
            aadhar_card_url = await uploadHelper.base64Upload(file2_base64)
             console.log('inside services location is', file2_url)
            //  options.aadhar_card_url = file2_url
         } else {
             aadhar_card_url = "www.sampleurl.com"
         }
         if(file3_base64 != undefined || file3_base64 != null){
            cancel_cheque_url = await uploadHelper.base64Upload(file3_base64)
            //  options.cancel_cheque_url = file3_url
         }else {
             cancel_cheque_url = "www.sampleurl.com"
         }
         if(file4_base64 != undefined || file4_base64 != null){
            light_bill_url = await uploadHelper.base64Upload(file4_base64)
            //  options.light_bill_url = file4_url
         } else {
             light_bill_url = "www.sampleurl.com"
         }
        if(file5_base64 != undefined || file5_base64 != null){
            rent_aggrement_url = await uploadHelper.base64Upload(file5_base64)
            // options.rent_aggrement_url = file5_url
        } else {
            rent_aggrement_url = "www.sampleurl.com"
        }
        if(file6_base64 != undefined || file6_base64 != null){
            co_letter_url = await uploadHelper.base64Upload(file6_base64)
            // options.co_letter_url = file6_url
        } else {
            co_letter_url = "www.sampleurl.com"
        }
        if(file7_base64 != undefined || file7_base64 != null){
            authorization_letter = await uploadHelper.base64Upload(file7_base64)
            // options.authorization_letter = file7_url
        } else {
            authorization_letter = "www.sampleurl.com"
        }
        if(file8_base64 != undefined || file8_base64 != null){
            other_document = await uploadHelper.base64Upload(file8_base64)
            // options.other_document = file8_url
        } else {
            other_document = "www.sampleurl.com"
        }
        if(file9_base64 != undefined || file9_base64 != null){
            pancard_url = await uploadHelper.base64Upload(file9_base64)
            // options.pancard_url = file9_url
        } else {
            pancard_url = "www.sampleurl.com"
        }
     } catch(e) {
         console.log(e)
      }
    // director_dob = new Date()
    // authorized_dob = new Date()
    business_annual_turnover = Number(business_annual_turnover)
    business_total_sales_amount = Number(business_total_sales_amount)
    business_total_purchase_amount = Number(business_total_purchase_amount)

     let gst_file_info = {coupon_name, coupon_id, gst_type, gst_subtype,  loginId}
     let business_info = {entity_detail, business_nature, business_name, business_pan_no, business_mobile, business_state, business_district, business_address, business_ward, business_pincode, business_annual_turnover, business_object}
     let director_basic_detail = {director_name, director_father_name, director_dob, director_pan_no, director_aadhar, director_mobile,director_email, director_pincode, director_address}
     let authorized_signature_basic_detail = {authorized_name, authorized_father_name, authorized_dob, authorized_pan_no, authorized_aadhar, authorized_mobile,authorized_email, authorized_pincode, authorized_address}
     let bank_details = {account_no, account_type, account_holder_name, ifsc_code, bank_name, bank_address}
     let files = {aadhar_card_url,cancel_cheque_url,photo_url,light_bill_url,rent_aggrement_url,co_letter_url,authorization_letter,other_document,pancard_url}
     let data;
     try {
         data = await userDao.applyForGst(gst_file_info, business_info, director_basic_detail, authorized_signature_basic_detail, bank_details, files)
         if(data) {
             return res.status(httpStatusCodes.OK).json(data)
         } else {
             return res.status(httpStatusCodes.NOT_FOUND).json({message:"NOT FOUND"})
         }
     } catch (e) { 
         console.log(e)
         return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"})}
     
}


userServices.getAllGst = async (req, res) => {
    try {   
        let data = await userDao.getAllGst()
        if(data) {
            return res.status(httpStatusCodes.OK).json(data)
        } else {
            return res.status(httpStatusCodes.NOT_FOUND).json(data)
        }
    } catch(e) {
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({"message":"Internal Server Error"})
    }
}


userServices.getAllGstReturn = async (req, res) => {
    try {   
        let data = await userDao.getAllGstReturn()
        if(data) {
            return res.status(httpStatusCodes.OK).json(data)
        } else {
            return res.status(httpStatusCodes.NOT_FOUND).json(data)
        }
    } catch(e) {
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({"message":"Internal Server Error"})
    }
}

userServices.getGstReturnByObjectId = async (req, res) => {
    let {id} = req.body
    try {   
        let data = await userDao.getGstReturnByObjectId(id)
        if(data) {
            return res.status(httpStatusCodes.OK).json(data)
        } else {
            return res.status(httpStatusCodes.NOT_FOUND).json(data)
        }
    } catch(e) {
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({"message":"Internal Server Error"})
    }
}

userServices.assignGstReturnToBdm = async (req, res) => {
    let {id, bdm_email, bdm_id} = req.body
    try {   
        let data = await userDao.assignGstReturnToBdm(id, bdm_email, bdm_id)
        if(data) {
            return res.status(httpStatusCodes.OK).json(data)
        } else {
            return res.status(httpStatusCodes.NOT_FOUND).json(data)
        }
    } catch(e) {
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({"message":"Internal Server Error"})
    }
}

userServices.assignGstRegistrationToBdm = async (req, res) => {
    let {id, bdm_email, bdm_id} = req.body
    try {   
        let data = await userDao.assignGstRegistrationToBdm(id, bdm_email, bdm_id)
        if(data) {
            return res.status(httpStatusCodes.OK).json(data)
        } else {
            return res.status(httpStatusCodes.NOT_FOUND).json(data)
        }
    } catch(e) {
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({"message":"Internal Server Error"})
    }
}

userServices.assignTdsClientToBdm = async (req, res) => {
    let {id, bdm_email, bdm_id, status} = req.body
    try {   
        let data = await userDao.assignGstRegistrationToBdm(id, bdm_email, bdm_id, status)
        if(data) {
            return res.status(httpStatusCodes.OK).json(data)
        } else {
            return res.status(httpStatusCodes.NOT_FOUND).json(data)
        }
    } catch(e) {
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({"message":"Internal Server Error"})
    }
}

userServices.getAllGstById = async (req, res) => {
    let loginId = req.decoded.id
    try {   
        let data = await userDao.getAllGstById(loginId)
        if(data) {
            return res.status(httpStatusCodes.OK).json(data)
        } else {
            return res.status(httpStatusCodes.NOT_FOUND).json(data)
        }
    } catch(e) {
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({"message":"Internal Server Error"})
    }
}

userServices.getGstById = async (req, res) => {
    let loginId = req.decoded.id
    let { id } = req.params
    let options = {loginId, id}
    let data
    try {   
        data = await userDao.getGstById(options)
        if(data) {
            return res.status(httpStatusCodes.OK).json(data)
        } else {
            return res.status(httpStatusCodes.NOT_FOUND).json(data)
        }
    } catch(e) {
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({"message":"Internal Server Error"})
    }
}


userServices.addGstReturn = async (req, res) => {
    let loginId = req.decoded.id
    let options = req.body
    options.loginId = loginId
    let data
    try {
        data = await userDao.addGstReturn(options)
            if(data) {
                return res.status(httpStatusCodes.OK).json(data)
            } else {
                return res.status(httpStatusCodes.NOT_FOUND).json(data)
            }
        
    } catch(e) {
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({"message":"Internal Server Error"})
    }
}

userServices.gstReturnType = async (req, res) => {
    let loginId = req.decoded.id
    let options = req.body
    options.loginId = loginId
    try {
        data = await userDao.gstReturnType(options)
            if(data) {
                return res.status(httpStatusCodes.OK).json(data)
            } else {
                return res.status(httpStatusCodes.NOT_FOUND).json(data)
            }
        
    } catch(e) {
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({"message":"Internal Server Error"})
    }
}

userServices.gstReturnSubmitForm = async (req, res) => {
    let loginId = req.decoded.id
    let options = req.body
    let {file1_base64, file_name} = req.body
    try {
        let gst_user_file_url = await uploadHelper.base64UploadWithFileName(file1_base64, file_name)
        console.log('file location is', gst_user_file_url)
        options.gst_user_file_url = gst_user_file_url
    } catch(e) {console.log(e)}
    options.loginId = loginId
    try {
        data = await userDao.gstReturnSubmitForm(options)
            if(data) {
                return res.status(httpStatusCodes.OK).json(data)
            } else {
                return res.status(httpStatusCodes.NOT_FOUND).json(data)
            }
        
    } catch(e) {
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({"message":"Internal Server Error"})
    }
}

userServices.getAllGstReturnById = async (req, res) => {
    let loginId = req.decoded.id
    try {   
        let data = await userDao.getAllGstReturnById(loginId)
        if(data) {
            return res.status(httpStatusCodes.OK).json(data)
        } else {
            return res.status(httpStatusCodes.NOT_FOUND).json(data)
        }
    } catch(e) {
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({"message":"Internal Server Error"})
    }
}

userServices.getAllGstReturnByBranchid = async (req, res) => {
    let loginId = req.decoded.id
    try {   
        let data = await userDao.getAllGstReturnById(loginId)
        if(data) {
            return res.status(httpStatusCodes.OK).json(data)
        } else {
            return res.status(httpStatusCodes.NOT_FOUND).json(data)
        }
    } catch(e) {
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({"message":"Internal Server Error"})
    }
}

userServices.getGstReturnById = async (req, res) => {
    let loginId = req.decoded.id
    let { id } = req.params
    let options = {loginId, id}
    let data
    try {   
        data = await userDao.getGstReturnById(options)
        if(data) {
            return res.status(httpStatusCodes.OK).json(data)
        } else {
            return res.status(httpStatusCodes.NOT_FOUND).json(data)
        }
    } catch(e) {
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({"message":"Internal Server Error"})
    }
}

userServices.addTdsClient = async (req, res) => {
    let loginId = req.decoded.id
    let options = req.body
    options.loginId = loginId
    let data
    try {
        data = await userDao.tdsRegisterClient(options)
            if(data == "found") {
                return res.status(httpStatusCodes.OK).json({"message":"TAN No already registered", "Code":"400"})
            }
            if(data) {
                return res.status(httpStatusCodes.OK).json(data)
            } else {
                return res.status(httpStatusCodes.NOT_FOUND).json(data)
            }
        
    } catch(e) {
        console.log(e)
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({"message":"Internal Server Error"})
    }
}

userServices.tdsClientUpdate = async (req, res) => {
    let loginId = req.decoded.id
    let options = req.body
    options.loginId = loginId
    let data
    try {
        data = await userDao.tdsClientUpdate(options)
            if(data) {
                return res.status(httpStatusCodes.OK).json(data)
            } else {
                return res.status(httpStatusCodes.NOT_FOUND).json(data)
            }
        
    } catch(e) {
        console.log(e)
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({"message":"Internal Server Error"})
    }
}

userServices.tdsClientUpdate1 = async (req, res) => {
    let loginId = req.decoded.id
    let options = req.body
    options.loginId = loginId
    let data
    try {
        data = await userDao.tdsClientUpdate1(options)
            if(data) {
                return res.status(httpStatusCodes.OK).json(data)
            } else {
                return res.status(httpStatusCodes.NOT_FOUND).json(data)
            }
        
    } catch(e) {
        console.log(e)
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({"message":"Internal Server Error"})
    }
}

userServices.addTdsModel = async (req, res) => {
    let loginId = req.decoded.id
    let options = req.body
    options.loginId = loginId
    let data
    try {
        data = await userDao.addTdsModel(options)
            if(data) {
                return res.status(httpStatusCodes.OK).json(data)
            } else {
                return res.status(httpStatusCodes.NOT_FOUND).json(data)
            }
        
    } catch(e) {
        console.log(e)
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({"message":"Internal Server Error"})
    }
}

userServices.getAllTdsClients = async (req, res) => {
    let loginId = req.decoded.id
    let options = {loginId}
    try {   
        let data = await userDao.getAllTdsbyId(options)
        if(data) {
            return res.status(httpStatusCodes.OK).json(data)
        } else {
            return res.status(httpStatusCodes.NOT_FOUND).json(data)
        }
    } catch(e) {
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({"message":"Internal Server Error"})
    }
}

userServices.getAllTdsClientsAdmin = async (req, res) => {
    try {   
        let data = await userDao.getAllTdsClients()
        if(data) {
            return res.status(httpStatusCodes.OK).json(data)
        } else {
            return res.status(httpStatusCodes.NOT_FOUND).json(data)
        }
    } catch(e) {
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({"message":"Internal Server Error"})
    }
}

userServices.getAllTdsModelAdmin = async (req, res) => {
    try {   
        let data = await userDao.getAllTdsModelAdmin()
        if(data) {
            return res.status(httpStatusCodes.OK).json(data)
        } else {
            return res.status(httpStatusCodes.NOT_FOUND).json(data)
        }
    } catch(e) {
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({"message":"Internal Server Error"})
    }
}


userServices.deleteTdsClientById = async (req, res) => {
    let {id} = req.body
    console.log(req.body)
    try {   
        let data = await userDao.deleteTdsClientById(id)
        if(data) {
            return res.status(httpStatusCodes.OK).json(data)
        } else {
            return res.status(httpStatusCodes.NOT_FOUND).json(data)
        }
    } catch(e) {
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({"message":"Internal Server Error"})
    }
}

/* All Gst Registration Search Queries */

userServices.getGstRegistrationByStatus = async (req, res) => {
    let loginId = req.decoded.id
    let {status} = req.body
    console.log(req.body)
    try {   
        let data = await userDao.getGstRegistrationByStatus(loginId, status)
        if(data) {
            return res.status(httpStatusCodes.OK).json(data)
        } else {
            return res.status(httpStatusCodes.NOT_FOUND).json(data)
        }
    } catch(e) {
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({"message":"Internal Server Error"})
    }
}
/* All Gst Registration Search Queries */


/* all support methods */

userServices.saveTicket = async (req, res) => {
    let loginId = req.decoded.id
    let {file, filename} = req.body
    
    console.log(req.body)
    let options = req.body
    options.loginId = loginId
    try {
        let fileUrl = await uploadHelper.base64PdfUploadWithFileName(file, filename)
        options.file = fileUrl
    } catch(e) {
        console.log(e)
        options.file = "www.sampleurl.com"
    }

    try {   
        let data = await userDao.saveTicket(options)
        if(data) {
            return res.status(httpStatusCodes.OK).json(data)
        } else {
            return res.status(httpStatusCodes.NOT_FOUND).json(data)
        }
    } catch(e) {
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({"message":"Internal Server Error"})
    }
}

userServices.getAllTicketsById = async (req, res) => {
    let loginId = req.decoded.id
    console.log(loginId)
    try {   
        let data = await userDao.getAllTicketsByid(loginId)
        if(data) {
            return res.status(httpStatusCodes.OK).json(data)
        } else {
            return res.status(httpStatusCodes.NOT_FOUND).json(data)
        }
    } catch(e) {
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({"message":"Internal Server Error"})
    }
}

userServices.activateItr = async (req, res) => {
    let loginId = req.decoded.id
    let {id} = req.body
    console.log(loginId)
    try {   
        let data = await userDao.getAllTicketsByid(id)
        if(data) {
            return res.status(httpStatusCodes.OK).json(data)
        } else {
            return res.status(httpStatusCodes.NOT_FOUND).json(data)
        }
    } catch(e) {
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({"message":"Internal Server Error"})
    }
}

/* all support methods */
module.exports = userServices
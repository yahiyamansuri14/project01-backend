const res = require('express/lib/response')
const GroupModel = require('../../models/groupModel')
const ItrModel = require('../../models/itrModel')
const ClientModel = require('../../models/clientModel')
const RechargeModel = require('../../models/rechargeModel')
const UserModel = require('../../models/userModel')
const BankModel = require('../../models/bankModel')
const ProductModel = require('../../models/productModel')
const OrderModel = require('../../models/orderModel')
const httpStatusCodes = require('../../helper/httpStatus')
const GstModel = require('../../models/gstModel')
const GstReturnModel = require('../../models/gstReturnModel')
const TdsClientModel = require('../../models/tdsClientModel')
const TdsModel = require('../../models/tdsModel')
const TicketModel = require('../../models/ticketModel')

const userDao = { }

userDao.getTotalDocumentCountInProduct = async function() {
    return new Promise((resolve, reject) => {
        ProductModel.count().then(data => {
            resolve(data)
        }).catch(error => {
            reject(error)
        })
    })
}

userDao.getTotalUserCount = () => {
    return new Promise((resolve, reject) => {
        let count;
        try {
            count = UserModel.count()
            if(count) {
                resolve(count)
            } else {
                reject(count)
            }
        } catch(e) {
            reject(e)
        }
    })
}

userDao.getTotalRechargeCount = async function () {
    return new Promise(async (resolve, reject) => {
        let count;
        try {
            count = await RechargeModel.count()
            if(count) {
                resolve(count)
            } else {
                reject(count)
            }
        } catch(e) { reject(e)}
    })
    
}

userDao.getTotalItrCount = async function () {
    return new Promise(async (resolve, reject) => {
        let count;
        try {
            count = await ItrModel.count()
            if(count) {
                resolve(count)
            } else {
                reject(count)
            }
        } catch(e) {reject(e)}
    })
}

userDao.getTotalGstCount = async function () {
    return new Promise(async (resolve, reject) => {
        let count;
        try {
            count = await GstModel.count()
            if(count) {
                resolve(count)
            } else {
                reject(count)
            }
        } catch(e) {reject(e)}
    })
}

userDao.getTotalGstReturnCount = async function () {
    return new Promise(async (resolve, reject) => {
        let count;
        try {
            count = await GstReturnModel.count()
            if(count) {
                resolve(count)
            } else {
                reject(count)
            }
        } catch(e) {reject(e)}
    })
}

userDao.getTotalTdsClientCount = async function () {
    return new Promise(async (resolve, reject) => {
        let count;
        try {
            count = await TdsClientModel.count()
            if(count) {
                resolve(count)
            } else {
                reject(count)
            }
        } catch(e) {reject(e)}
    })
}

userDao.getTotalTdsModelCount = async function () {
    return new Promise(async (resolve, reject) => {
        let count;
        try {
            count = await TdsModel.count()
            if(count) {
                resolve(count)
            } else {
                reject(count)
            }
        } catch(e) {reject(e)}
    })
}


userDao.addgroup = (options) => {
    let { loginId, name } = options
    console.log(loginId, name)
    let response = { }
    return new Promise((resolve, reject) => {
        GroupModel.findOne({name, loginId}).then(data => {
            if(data) {
                response.message = "Group Name Already Exists"
                response.code = httpStatusCodes.NO_CONTENT
                return resolve(response)
            } else {
                let group = new GroupModel({loginId, name})
                group.save().then(data => {
                    response.messge = "Group Created Successfully"
                    response.data = data
                    response.code = httpStatusCodes.OK
                    return resolve(response)
                }).catch(error => {
                    console.log("1", error)
                    return Promise.reject()
                })
            }
        }).catch(error => {
            console.log("2", error)
            response.message = "Internal Server Error"
            return reject(response)
        })
    })
}

userDao.getAllGroup = (loginId) => {
    
    return new Promise(async (resolve, reject) => {
        let data;
        try {
            data = await GroupModel.find({loginId: loginId})
            if(data) {
                return resolve(data)
            } else {
                return reject(data)
            }
        } catch(e) { reject(e) }
    })
}

userDao.savePersonalInfoItr = async (options) => {
  let {personal_info, address_details, contact_details, bank_details} = options
  let itr_info = {}
  let files = {}
  let income_from_salary = {}
  let income_from_other_sources = {}
  let income_from_property = {}
  let income_from_capital_gain = {}
  let income_from_profession_business = {}
  let income_from_transport_business = {}
  let income_from_other_business = {}
  let income_from_exempted_sources = {}
  let deduction_80c = {}
  let deduction_80d = {}
  let deduction_80g = {}
  let other_deduction = {}
  let tds_on_salary = {}
  let non_salary_tds = {}
  let tax_collected_at_source = {}
  let advance_tax = {}
  let tds_26_qc = {}
  let summary = {}
//   console.log(personal_info)
//   console.log(address_details)
//   console.log(contact_details)
//   console.log(bank_details)
    let user_count;
    try{
        user_count = await this.getTotalItrCount()
    } catch(e) { user_count = 00}
    
    let loginId = personal_info.loginId
    let client_code = loginId + '/' + Math.floor(1000 + Math.random() * 900000) + user_count
    let ack_no = Math.floor(1000 + Math.random() * 90000000) + user_count
    personal_info.client_code = client_code
    itr_info.ack_no = ack_no
    let bank_details_array = [bank_details]
    return new Promise((resolve, reject) => {
        let itr = new ItrModel({itr_info, personal_info, address_details, contact_details, bank_details:bank_details_array, files, income_from_salary, income_from_capital_gain, income_from_exempted_sources,
            income_from_other_sources,income_from_property, income_from_profession_business, income_from_transport_business, income_from_other_business,
            deduction_80c,deduction_80d, deduction_80g, other_deduction, tds_on_salary, non_salary_tds, tax_collected_at_source, advance_tax, tds_26_qc, summary
        })
        itr.save().then(data => {
            resolve(data)
        }).catch(error => {
            console.log(error)
            reject(error)
        })
    })
  
  
}

userDao.updateItrInfo1 = async (options) => {
    let {itr_info, loginId, id} = options
    return new Promise((resolve, reject) => {
        ItrModel.updateOne({loginId: loginId, _id: id },{$set: { itr_info : itr_info}}).then(data => {
            resolve(data)
        }).catch(error => {
            console.log(error)
            reject(error)
        })
    })
}


// userDao.updateSummary = async (loginId, id, type, value) => {
//     ItrModel.updateOne({loginId: loginId, _id: id },{$set: { type : value}})
// }

userDao.updateIncomeFromSalary = async (options) => {
    let {income_from_salary, loginId, id} =  options
    let income_charge_salary = income_from_salary.income_charge_salary
    return new Promise(async (resolve, reject) => {
        ItrModel.updateOne({loginId: loginId, _id: id },{$set: { income_from_salary : income_from_salary}}).then(async data => {
            await ItrModel.updateOne({loginId: loginId, _id: id },{$set: { "summary.income_from_salary" : income_charge_salary}})
            resolve(data)
        }).catch(error => {
            console.log(error)
            reject(error)
        })
    })
}

userDao.updateIncomeFromProperty = async (options) => {
    let {income_from_property, loginId, id} = options
    let property_income = income_from_property.income_charge_house_property

    return new Promise((resolve, reject) => {
        ItrModel.updateOne({loginId: loginId, _id: id },{$set: { income_from_property : income_from_property}}).then(async data => {
            await ItrModel.updateOne({loginId: loginId, _id: id },{$set: { "summary.income_from_property" : property_income}})
            console.log(data)
            resolve(data)
        }).catch(error => {
            console.log(error)
            reject(error)
        })
    })
}

userDao.updateIncomeFromOtherSources = async (options) => {
    let {income_from_other_sources, loginId, id} = options
    let summary_income = income_from_other_sources.income_charge_other_sources
    return new Promise((resolve, reject) => {
        ItrModel.updateOne({loginId: loginId, _id: id },{$set: { income_from_other_sources : income_from_other_sources}}).then(async data => {
            await ItrModel.updateOne({loginId: loginId, _id: id },{$set: { "summary.income_from_other_sources" : summary_income}})
            resolve(data)
        }).catch(error => {
            console.log(error)
            reject(error)
        })
    })
}

userDao.updateIncomeFromCapitalGain = async (options) => {
    let {income_from_capital_gain, loginId, id} = options
    // let summary_income = income_from_capital_gain.
    return new Promise((resolve, reject) => {
        ItrModel.updateOne({loginId: loginId, _id: id },{$set: { income_from_capital_gain : income_from_capital_gain}}).then(data => {
            // await ItrModel.updateOne({loginId: loginId, _id: id },{$set: { "summary.income_from_other_sources" : summary_income}})
            resolve(data)
        }).catch(error => {
            console.log(error)
            reject(error)
        })
    })
}

userDao.updateIncomeFromProfessionBusiness = async (options) => {
    let {income_from_profession_business, loginId, id} = options
    console.log(options)
    return new Promise((resolve, reject) => {
        ItrModel.updateOne({loginId: loginId, _id: id },{$set: { income_from_profession_business : income_from_profession_business}}).then(data => {
            resolve(data)
        }).catch(error => {
            console.log(error)
            reject(error)
        })
    })
}

userDao.updateIncomeFromTransportBusiness = async (options) => {
    let {income_from_transport_business, loginId, id} = options
    return new Promise((resolve, reject) => {
        ItrModel.updateOne({loginId: loginId, _id: id },{$set: { income_from_transport_business : income_from_transport_business}}).then(data => {
            resolve(data)
        }).catch(error => {
            console.log(error)
            reject(error)
        })
    })
}

userDao.udpateIncomeFromOtherBusiness = async (options) => {
    let {income_from_other_business, loginId, id} = options
    return new Promise((resolve, reject) => {
        ItrModel.updateOne({loginId: loginId, _id: id },{$set: { income_from_other_business : income_from_other_business}}).then(data => {
            resolve(data)
        }).catch(error => {
            console.log(error)
            reject(error)
        })
    })
}

userDao.updateIncomeFromExemptedSource = async (options) => {
    let {income_from_exempted_sources, loginId, id} = options
    return new Promise((resolve, reject) => {
        ItrModel.updateOne({loginId: loginId, _id: id },{$set: { income_from_exempted_sources : income_from_exempted_sources}}).then(data => {
            resolve(data)
        }).catch(error => {
            console.log(error)
            reject(error)
        })
    })
}

userDao.updateDeduction80c = async (options) => {
    let {deduction_80c, loginId, id} = options
    return new Promise((resolve, reject) => {
        ItrModel.updateOne({loginId: loginId, _id: id },{$set: { deduction_80c : deduction_80c}}).then(data => {
            resolve(data)
        }).catch(error => {
            console.log(error)
            reject(error)
        })
    })
}

userDao.updateDeduction80d = async (options) => {
    let {deduction_80d, loginId, id} = options
    return new Promise((resolve, reject) => {
        ItrModel.updateOne({loginId: loginId, _id: id },{$set: { deduction_80d : deduction_80d}}).then(data => {
            resolve(data)
        }).catch(error => {
            console.log(error)
            reject(error)
        })
    })
}

userDao.updateDeduction80g = async (options) => {
    let {deduction_80g, loginId, id} = options
    return new Promise((resolve, reject) => {
        ItrModel.updateOne({loginId: loginId, _id: id },{$set: { deduction_80g : deduction_80g}}).then(data => {
            resolve(data)
        }).catch(error => {
            console.log(error)
            reject(error)
        })
    })
}

userDao.updateOtherDeduction = async (options) => {
    let {other_deduction, loginId, id} = options
    return new Promise((resolve, reject) => {
        ItrModel.updateOne({loginId: loginId, _id: id },{$set: { other_deduction : other_deduction}}).then(data => {
            resolve(data)
        }).catch(error => {
            console.log(error)
            reject(error)
        })
    })
}

userDao.updateTdsOnSalary = async (options) => {
    let {tds_on_salary, loginId, id} = options
    return new Promise((resolve, reject) => {
        ItrModel.updateOne({loginId: loginId, _id: id },{$set: { tds_on_salary : tds_on_salary}}).then(data => {
            resolve(data)
        }).catch(error => {
            console.log(error)
            reject(error)
        })
    })
}

userDao.updateNonSalaryTds = async (options) => {
    let {non_salary_tds, loginId, id} = options
    return new Promise((resolve, reject) => {
        ItrModel.updateOne({loginId: loginId, _id: id },{$set: { non_salary_tds : non_salary_tds}}).then(data => {
            resolve(data)
        }).catch(error => {
            console.log(error)
            reject(error)
        })
    })
}

userDao.updateTaxCollectedAtSource = async (options) => {
    let {tax_collected_at_source, loginId, id} = options
    return new Promise((resolve, reject) => {
        ItrModel.updateOne({loginId: loginId, _id: id },{$set: { tax_collected_at_source : tax_collected_at_source}}).then(data => {
            resolve(data)
        }).catch(error => {
            console.log(error)
            reject(error)
        })
    })
}

userDao.updateAdvanceTax = async (options) => {
    let {advance_tax, loginId, id} = options
    return new Promise((resolve, reject) => {
        ItrModel.updateOne({loginId: loginId, _id: id },{$set: { advance_tax : advance_tax}}).then(data => {
            resolve(data)
        }).catch(error => {
            console.log(error)
            reject(error)
        })
    })
}

userDao.updateTds26qc = async (options) => {
    let {tds_26_qc, loginId, id} = options
    return new Promise((resolve, reject) => {
        ItrModel.updateOne({loginId: loginId, _id: id },{$set: { tds_26_qc : tds_26_qc}}).then(data => {
            resolve(data)
        }).catch(error => {
            console.log(error)
            reject(error)
        })
    })
}

userDao.updateSummary = async (options) => {
    let {tds_26_qc, loginId, id} = options
    return new Promise((resolve, reject) => {
        ItrModel.updateOne({loginId: loginId, _id: id },{$set: { summary : summary}}).then(data => {
            resolve(data)
        }).catch(error => {
            console.log(error)
            reject(error)
        })
    })
}


userDao.updateItrStatus = (options) => {
    let loginId = options.loginId
    let status = options.status
    let id = options.id
    return new Promise((resolve, reject) => {
        ItrModel.updateOne({_id: id, loginId: loginId}, {$set: {"itr_info.status": status}}).then(data => {
            if(data) {
                resolve(data)
            } else {
                reject(data)
            }
        }).catch(error => {
            reject(error)
        })
    })
}

userDao.getAllItr  = (loginId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await ItrModel.find({"personal_info.loginId": loginId})
            // console.log(data)
            if(data) {
                resolve(data)
            } else {
                reject(data)
            }
        } catch(e) {
            console.log(e)
            reject(e)
        }
    })
  
}

userDao.activateItrClient = (options) => {
    let response = { }
    let { loginId, clientName, clientCode, year, itrType } = options

    //write logic for existing client
    return new Promise((resolve, reject) => {
        let itrClient = new ClientModel({loginId, clientName, clientCode, year, itrType})
        itrClient.save().then(data => {
            response.message = "Client Activated for ITR"
            response.data = data
            return resolve(response)
        }).catch(error => {
            response.message = "Error While Activating Client, Please Try Again Letter"
            return reject(response)
        })

    })
}

userDao.getAllItrById = (loginId, id) => {
    let data
    // let loginId = loginId
    return new Promise(async (resolve, reject) => {
        try {
            data = await ItrModel.find({"personal_info.loginId": {$eq:loginId}})
            console.log(data)
            if(data) {
                resolve(data)
            } else {
                reject(data)
            }
        } catch(e) {
            reject(e)
        }
    })
}

userDao.getItrById = (options) => {
    let data 
    return new Promise(async (resolve, reject) => {
        try {
            data = await ItrModel.find({ _id: options.id})
            if(data) {
                resolve(data)
            } else {
                reject(data)
            }
        } catch(e) {
            reject(e)
        }
    })
}

userDao.activateItrFile = (id) => {
    let data
    return new Promise(async (resolve, reject) => {
        try {
            data = await ItrModel.updateOne({ _id:id}, {$set:{"itr_info.status": "active"}})
            if(data) {
                resolve(data)
            } else {
                reject(data)
            }
        } catch(e) {
            reject(e)
        }
    })
}

// userDao.getAllItr = () => {
//     let response = { }
//     return new Promise((resolve, reject) => {
//         ItrModel.find().then(data => {
//             console.log(data)
//             response.message = "Success"
//             response.data = data
//             return resolve(response)
//         }).catch(error => {
//             response.message = "Internal Server Error"
//             return reject(response)
//         })
//     })
// }

userDao.changeStatus = (options) => {
    let {loginid, status, itrId } = options
    console.log(options)
    let response = { }
    return new Promise((resolve, reject) => {
        ItrModel.update({_id: itrId}, {$set: {status: status}}).then(data => {
            response.message = "Success"
            return resolve(response)
        }).catch(error => {
            response.message = "Internal Server Error"
            return reject(response)
        })
    })
}

userDao.rechargeRequest = async (options) => {
    let {loginId, amount, payment_mode, payment_number, bank_account, file, narration, receipt } = options
    let date = new Date()
    console.log(date)
    let recharge_id = "RCHG";
    try{
        let count = await this.getTotalRechargeCount()
        count = count + 1
        recharge_id = 'RCHG' + recharge_id + count
    } catch(e) { }
    let response = { }
    return new Promise((resolve, reject) => {
        let recharge = new RechargeModel({loginId, recharge_id, date, amount, cheque_no:payment_mode, payment_number, bank_account, file, narration, receipt, date})
        recharge.save().then(data => {
            response.message = "Recharge Request Made Successfully"
            response.data = data
            return resolve(response)
        }).catch(error => {
            console.log(error)
            response.message = "Internal Server Error"
            return reject(response)
        })
    })
}

const rechargeUserAccount = (loginId, balance, reward_points ) => {
    console.log("inside user recharge", loginId, reward_points)
    return new Promise(async (resolve, reject) => {
        let data;
        try {
            console.log("1")
            let user = await UserModel.find({loginId:loginId})
            console.log("2")
            console.log("value of user is", user)
            let balance_temp = parseInt(user[0].balance) + parseInt(balance) 
            data = await UserModel.updateOne({loginId: loginId}, {$set:{balance: balance_temp, reward_points: reward_points}})
            console.log(data)
            resolve(data)
            // resolve(data)
        } catch(e) {
            reject(data)
        }
    })
}

const updateRechargeModel = (id, admin_remark ) => {
    console.log("inside update recharge")
    return new Promise(async (resolve, reject) => {
        let data 
        try {
            data = await RechargeModel.updateOne({_id: id}, {$set:{admin_remark: admin_remark, is_completed: true}})
            console.log("inside update recharge dao", data)
            resolve(data)
        } catch(e) {
            console.log("inside error", e)
            reject(e)
        }
    })
}

userDao.completeRecharge= async (options) => {
    let {loginId, balance, reward_points, id, admin_remark } = options
    console.log(options)
    return new Promise(async (resolve, reject) => {
    await Promise.all([rechargeUserAccount(loginId, balance, reward_points),updateRechargeModel(id, admin_remark)]).then(data => {
            console.log(data)
            if(data && data[0] && data[1]) {
                resolve(data)
            } else {
                reject(data)
            }
        }).catch(error => {
            console.log("inside error complete recharge", error)
            reject(error)
        })
        
    })
    
   
    
}

userDao.denyRechargeRequest = (options) => {
    let {loginId, id} = options
    return new Promise((resolve, reject) => {
        UserModel.updateOne({_id: id, loginId: loginId}, {$set: {is_completed: false}}).then(data => {
            if(data) {
                resolve(data)
            } else {
                reject(data)
            }
        }).catch(error => {
            reject(error)
        })
    })
}

userDao.getRechargeByDate = (options) => {
    let {loginId, start_date, end_date} = options
    // start_date = new Date()
    // console.log(start_date, end_date)
    // console.log(loginId)
    start_date = new Date(start_date)
    end_date = new Date(end_date)
    return new Promise(async (resolve, reject) => {
        try {
            let data = await RechargeModel.find({loginId: loginId, createdAt:{$gte:start_date, $lte:end_date}})
            console.log(data)
            if(data) {
                resolve(data)
            } else {
                reject(data)
            }
        } catch(e) {
            console.log(e)
            reject(e)
        }
    })
}

userDao.addBank = (options) => {
    let { name, account_number, ifsc_code, branch_name, account_type } = options
    owner_role = "ADMIN"
    let response = { }
    return new Promise((resolve, reject) => {
        let bank = new BankModel({name, account_number, ifsc_code, branch_name, account_type, owner_role})
        bank.save().then(data => {
            response.message = "Bank Addedd Successfully"
            return resolve(response)
        }).catch(error => {
            console.log(error)
            response.message = "Internal Server Error"
            return reject(response)
        })
    })
}

userDao.getAllAdminBanks = () => {
    return new Promise(async (resolve, reject) => {
        let banks = await BankModel.find({owner_role: "ADMIN"})
        if(banks) {
            resolve(banks)
        } else {
            reject(banks)
        }
    })
}

updateUserRewardPoints = (loginId, reward_points) => {
    let data;
    return new Promise(async (resolve, reject) => {
        try {
            data = await UserModel.find({loginId: loginId})
            // console.log(loginId)
            // console.log(data)
            let new_reward_points = parseInt(data[0].reward_points) - parseInt(reward_points)
            // console.log(data.reward_points)
            // console.log(new_reward_points)
            data  = await UserModel.updateOne({loginId: loginId}, {$set: {reward_points : new_reward_points}})
            if(data.acknowledged == true) {
                resolve(data)
            } else {
                reject(false)
            }
        } catch(e) {
            console.log(e)
            reject(false)
        }
    })
   
}

userDao.addProduct = async (options) => {
    let response = { }
    let product_id = "prdt__"
    try {
        product_id = product_id  + Math.floor(Math.random()*90000) + 10000
    } catch (e) { console.log(e)}
    let { category,subcategory, name, price, quantity, legal_fees, professional_fees, expiry_date, reward_points, file_url } = options
    expiry_date = new Date(expiry_date)
    console.log(reward_points)
    return new Promise(async (resolve, reject) => {
       
        let product = new ProductModel({product_id, category,subcategory, price, name, quantity, legal_fees, professional_fees, expiry_date, reward_points, file_url})
        product.save().then(data => {
            response.message = "Product Addedd Successfully"
            response.data = data
            return resolve(response)
        }).catch(error => {
            console.log(error)
            response.message = "Internal Server Error"
            return reject(response)
        })
    })
}

userDao.updateProduct = async (options) => {
    let {category, name, price, quantity, legal_fees, professional_fees, expiry_date, reward_points, file_url, id} = options
    return new Promise(async (resolve, reject) => {
        try {
            let data = await ProductModel.updateOne({_id: id}, {$set: {category: category, name: name, price:price, quantity: quantity, legal_fees:legal_fees, professional_fees: professional_fees,
                        expiry_date: expiry_date,reward_points: reward_points, file_url: file_url
            }})
            if(data.acknowledged == true) {
                return resolve(data)
            } else {
                return reject(data)
            }
        } catch(e) {
            return reject(e)
        }
    })
}


userDao.getAllProduct = async () => {
    console.log("inside dao get all product")
    return new Promise((resolve, reject) => {
        console.log("inside dao")
        ProductModel.find({}).then(data => {
            // console.log(data)
            return resolve(data)
        }).catch(error => {
            console.log(error)
            return reject(error)
        })
    })
  
}

userDao.getAllPurchasedNonUsedProducts = async (loginId) => {
    console.log("inside dao get all product")
    return new Promise((resolve, reject) => {
        console.log("inside dao")
        OrderModel.find({loginId: loginId, is_used: false}).then(data => {
            // console.log(data)
            return resolve(data)
        }).catch(error => {
            console.log(error)
            return reject(error)
        })
    })
  
}

userDao.getProductsByCategory = async (category) => {
    console.log("inside dao get all product")
    return new Promise((resolve, reject) => {
        console.log("inside dao")
        ProductModel.find({category: category}).then(data => {
            // console.log(data)
            return resolve(data)
        }).catch(error => {
            console.log(error)
            return reject(error)
        })
    })
  
}


userDao.getAllGstProducts = async () => {
    console.log("inside get all gst products")
    return new Promise(async (resolve, reject) => {
        try {
            let data = await ProductModel.find({category:"gst-product"})
            if(data) {
                resolve(data)
            } else {
                reject(data)
            }
        } catch(e) {
            console.log(e)
            reject(e)
        }
    })
}

userDao.addOrder = (options) => {

    let response = { }
    let {loginId, date, product_id, price, product_detail, remark, first_name, last_name, middle_name, 
        firm_name, firm_address, file1_url,file2_url, file3_url, file4_url,  dispatch_need,
        product_name, product_category, estimate_amount, reward_points, payable_amount, final_amount
    } = options
    console.log(reward_points)
        dispatch_need = Boolean(dispatch_need)
        reward_points = parseInt(reward_points)
        let orderNo = "ODR" + Math.floor(1000 + Math.random() * 9000)
    return new Promise(async (resolve, reject) => {
        try {
            let data = await updateUserRewardPoints(loginId, reward_points)
            if(!data) {
                reject()
            }
        } catch(e) {
            reject()
        }
        let order = new OrderModel({loginId, date, product_id, price, product_detail, remark, first_name, last_name, middle_name, 
            firm_name, firm_address, file1_url, file2_url, file3_url, file4_url, dispatch_need,
            product_name, product_category, estimate_amount, reward_points, payable_amount, final_amount, orderNo
        })
        order.save().then(data => {
            response.messge = "Order Placed Successfully"
            response.data = data
            return resolve(response)
        }).catch(error => {
            console.log(error)
            response.message = "Internal Server Error"
            return reject(response)
        })
    })
}

userDao.getAllOrders = () => {
    return new Promise(async (resolve, reject) => {
        let data = await OrderModel.find({})
        console.log(data)
        if(data) {
            resolve(data)
        } else {
            reject(data)
        }
    })

}

userDao.getAllRechargeById = (loginId) => {
    return new Promise(async (resolve, reject) => {
        console.log(loginId)
        let data;
        try {
            data = await RechargeModel.find({loginId: loginId})
            console.log(data)
            if(data) {
                resolve(data)
            } else {
                reject(data)
            }
        } catch(e) { reject(e)}
        
    })
}

userDao.getAllRecharge = () => {
    return new Promise(async (resolve, reject) => {
        let data;
        try {
            data = await RechargeModel.find()
            console.log(data)
            if(data) {
                resolve(data)
            } else {
                reject(data)
            }
        } catch(e) { reject(e)}
        
    })
}

userDao.createClient = (options) => {
    
}

// userDao.testObjectStore = (first_name, last_name, mobile, email) => {
//         let personal_info = {first_name, last_name}
//         let contact_info = {mobile, email}
//         let testModel = new TestModel({personal_info, contact_info})
//         testModel.save().then(data => {console.log(data)}).catch(error => console.log(error))
// }

userDao.applyForGst = async (gst_file_info, business_info, director_basic_detail, authorized_signature_basic_detail, bank_details, files) => {
    let user_count;
    try{
        user_count = await this.getTotalGstCount()
    } catch(e) { user_count = 00}
    let loginId = gst_file_info.loginId
    let gst_client_id = 'GST' + loginId + '/' + Math.floor(1000 + Math.random() * 900000) + user_count
    let gst_ack_no = Math.floor(1000 + Math.random() * 90000000) + user_count
    gst_file_info.gst_ack_no = gst_ack_no
    business_info.gst_client_id = gst_client_id
    return new Promise((resolve, reject) => {
        let gst = new GstModel({gst_file_info, business_info, director_basic_detail, authorized_signature_basic_detail, bank_details, files})
        gst.save().then(data => {
            resolve(data)
        }).catch(error => {
            reject(error)
        })
    })

}

userDao.getAllGst = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await GstModel.find({})
            // console.log(data)
            if(data) {
                resolve(data)
            } else {
                reject(data)
            }
        } catch(e) {
            console.log(e)
            reject(e)
        }
    })
}

userDao.getAllGstById = (loginId) => {
    let data
    return new Promise(async (resolve, reject) => {
        try {
            data = await GstModel.find({loginId})
            if(data) {
                resolve(data)
            } else {
                reject(data)
            }
        } catch(e) {
            reject(e)
        }
    })
}

userDao.getGstById = (options) => {
    let data 
    return new Promise(async (resolve, reject) => {
        try {
            data = await GstModel.find({loginId: options.loginId, _id: options.id})
            if(data) {
                resolve(data)
            } else {
                reject(data)
            }
        } catch(e) {
            reject(e)
        }
    })
}





userDao.addGstReturn = async (options) => {
    let {business_name, gst_no, state, mobile, email, address, gst_portal_username, gst_portal_password, loginId
    } = options
    console.log(options)
     let user_count;
     let gst_type = ''
     let gst_subtype = '' 
     let month = '' 
     let year = ''
     let coupon_no = ''
     let coupon_id = ''
     let order_id = ''
     let gst_user_file_url = ''
     let total_sales_amount = '0'
     let total_purchase_amount = '0'
    try{
        user_count = await this.getTotalGstReturnCount()
    } catch(e) { user_count = 00}
    let gst_return_client_id = 'GST_RTN' + loginId + '/' + Math.floor(1000 + Math.random() * 900000) + user_count
    let gst_return_ack_no = Math.floor(1000 + Math.random() * 90000000) + user_count
    total_purchase_amount = Number(total_purchase_amount)
    total_sales_amount = Number(total_sales_amount)
    return new Promise(async (resolve, reject) => {
        let gst_return = new GstReturnModel({
            business_name, gst_type, gst_no, state, mobile, email, address, gst_portal_username, gst_portal_password,gst_subtype, month, year,
            coupon_no, coupon_id, order_id, gst_user_file_url, total_sales_amount, total_purchase_amount, loginId, gst_return_client_id, gst_return_ack_no
        })
        gst_return.save().then(data => {
            resolve(data)
        }).catch(error => { 
            console.log(error)
            reject(error)
        })
    })
}

userDao.gstReturnType = (options) => {
    let { loginId, gst_type, gst_subtype, month, year, id} = options
    // console.log(options)
    return new Promise((resolve, reject) => {
        try {
            let data = GstReturnModel.updateOne({_id: id, loginId: loginId}, {$set:{gst_type: gst_type, gst_subtype:gst_subtype, month:month, year:year}})
            if(data) {
                resolve(data)
            } else {
                reject(data)
            }
        } catch(e) {
            console.log(e)
            reject(e)
        }
    })
}

userDao.gstReturnSubmitForm = (options) => {
    let {loginId, coupon_name, coupon_id, order_id, id, total_purchase_amount, total_sales_amount, gst_user_file_url} = options
    console.log('inside dao', options)
    return new Promise((resolve, reject) => {
        try {
            let data = GstReturnModel.updateOne({_id: id, loginId: loginId}, {$set:{coupon_name, coupon_id, order_id, total_purchase_amount, total_sales_amount, gst_user_file_url}})
            if(data) {
                resolve(data)
            } else {
                reject(data)
            }
        } catch(e) {
            console.log(e)
            reject(e)
        }
    })
}

userDao.getAllGstReturnById = (loginId) => {
    let data
    return new Promise(async (resolve, reject) => {
        try {
            data = await GstReturnModel.find({loginId})
            if(data) {
                resolve(data)
            } else {
                reject(data)
            }
        } catch(e) {
            reject(e)
        }
    })
}

userDao.getGstReturnById = (options) => {
    let data 
    return new Promise(async (resolve, reject) => {
        try {
            data = await GstReturnModel.find({loginId: options.loginId, _id: options.id})
            if(data) {
                resolve(data)
            } else {
                reject(data)
            }
        } catch(e) {
            reject(e)
        }
    })
}

userDao.getAllGstReturn = () => {
    let data;
    return new Promise((async (resolve, reject) => {
        try {
            data = await GstReturnModel.find({})
            if(data) {
                resolve(data)
            } else {
                reject(data)
            }
        } catch(e) {
            reject(e)
        }
    }))
}

userDao.getAllGstReturnByBranchId = (loginId) => {
    let data;
    return new Promise((async (resolve, reject) => {
        try {
            data = await GstReturnModel.find({loginId})
            if(data) {
                resolve(data)
            } else {
                reject(data)
            }
        } catch(e) {
            reject(e)
        }
    }))
}


userDao.getGstReturnByObjectId = (id) => {
    let data;
    return new Promise((async (resolve, reject) => {
        try {
            data = await GstReturnModel.find({_id: id})
            if(data) {
                resolve(data)
            } else {
                reject(data)
            }
        } catch(e) {
            reject(e)
        }
    }))
}


userDao.updateGstReturnStatus = (options) => {
    let { loginId, status, id} = options
    let data 
    return new Promise(async (resolve, reject) => {
        try {
            data = await GstReturnModel.find({loginId, _id: id}, {$set: {status: status}}).then(data => {
                if(data) {
                    resolve(data)
                } else {
                    reject(data)
                }
            }).catch(error => {
                reject(error)
            })
           
        } catch(e) {
            reject(e)
        }
    })
}

function updateGstReturnStatusByAdmin (id) {
    return new Promise(async (resolve, reject) => {
        let data = GstReturnModel.updateOne({_id: id}, {$set: {status: "Assign To BDM"}})
        if(data) {
            resolve(data)
        } else {
            reject(data)
        }
    })
}

userDao.assignGstReturnToBdm = (id, bdm_email, bdm_id) => {
    let loginId = bdm_id
    let status = "Assing To BDM"
    let options = {loginId, status, id}
    return new Promise(async (resolve, reject) => {
        let temp_data = await updateGstReturnStatusByAdmin(id)
        let data;
        try {
            data = await GstReturnModel.updateOne({_id: id}, {$set: {bdm_email: bdm_email, bdm_id: bdm_id}})
            
            if(data) {
                resolve(data)
            } else {
                reject(data)
            }
        } catch(e) {
            reject(e)
        }
    })
}

userDao.assignGstRegistrationToBdm = (id, bdm_email, bdm_id) => {
    return new Promise(async (resolve, reject) => {
        // let temp_data = await updateGstReturnStatusByAdmin(id)
        let data;
        try {
            data = await GstModel.updateOne({_id: id}, {$set: {admin: {status: "Assign To BDM", bdm_email: bdm_email, bdm_id: bdm_id}}})
            
            if(data) {
                resolve(data)
            } else {
                reject(data)
            }
        } catch(e) {
            reject(e)
        }
    })
}

userDao.assignTdsClientToBdm = (id, bdm_email, bdm_id, status) => {
    return new Promise(async (resolve, reject) => {
        // let temp_data = await updateGstReturnStatusByAdmin(id)
        let data;
        try {
            data = await TdsClientModel.updateOne({_id: id}, {$set: {admin: {status: status, bdm_email: bdm_email, bdm_id: bdm_id}}})
            
            if(data) {
                resolve(data)
            } else {
                reject(data)
            }
        } catch(e) {
            reject(e)
        }
    })
}

userDao.tdsRegisterClient = async (options) => {

    let {department_name, tan_no, mobile, email, address, trace_user_name, trace_password, loginId } = options
    let user_count;
    try{
        user_count = await this.getTotalTdsClientCount()
    } catch(e) { user_count = 00}
    let tds_client_code = 'TDS' + loginId + '/' + Math.floor(1000 + Math.random() * 900000) + user_count
    return new Promise(async (resolve, reject) => {
        let data_temp = await TdsClientModel.findOne({loginId: loginId, tan_no: tan_no})
        if(data_temp) {
            resolve("found")
        } else {
            let tds_client = new TdsClientModel({loginId, tan_no, tds_client_code, department_name, mobile, email, address, trace_password, trace_user_name})
            try {
                let data = await tds_client.save()
                if(data) {
                    resolve(data)
                } else {
                    reject(data)
                }
            } catch(e) {
                console.log(e)
                reject(e)
            }
        }
        
    })
}

userDao.tdsClientUpdate1 = async (options) => {
    let {loginId,coupon_id, return_type, return_for, financial_year, tds_product_id, tds_product_name, id} = options
    return new Promise((resolve, reject) => {
        TdsClientModel.updateOne({_id: id, loginId: loginId}, {$set: {coupon_id: coupon_id, return_type: return_type,financial_year: financial_year,
            tds_product_id: tds_product_id, tds_product_name:tds_product_name, return_for: return_for
        }}).then(data => {
            
            if(data)
                resolve(data)
            else 
                reject(data)
        }).catch(error => {
            reject(error)
        })
    })
}

userDao.tdsClientUpdate = async (options) => {
    let {loginId, person_pan_no, person_dob, ain_no, person_address, id} = options
    return new Promise((resolve, reject) => {
        TdsClientModel.updateOne({_id: id, loginId: loginId}, {$set: {person_pan_no, person_dob, ain_no, person_address}}).then(data => {
            if(data)
                resolve(data)
            else 
                reject(data)
        }).catch(error => {
            reject(error)
        })
    })
}

userDao.addTdsModel = async (options) => {
    let {loginId, tds_client_code, department_name, mobile, email, address, trace_password, trace_user_name, return_type, return_for, financial_year,
        month_quarter, tds_product_name, tds_product_id
    } = options

    let user_count;
    try{
        user_count = await this.getTotalTdsModelCount()
    } catch(e) { user_count = 00}
    let tds_model_ack_no = 'TDS' + loginId + '/' + Math.floor(1000 + Math.random() * 900000) + user_count
    return new Promise(async (resolve, reject) => {
        let tds_model = new TdsModel({tds_model_ack_no, loginId, tds_client_code, department_name, mobile, email, address, trace_password, trace_user_name, return_type, return_for, financial_year,
            month_quarter, tds_product_name, tds_product_id})
        let data;
        try {
            data = await tds_model.save()
            if(data) {
                resolve(data)
            } else {
                reject(data)
            }
        } catch(e) {
            reject(e)
        }
    })
}

userDao.getAllTdsbyId = (options) => {
    let {loginId} = options
    console.log(loginId)
    return new Promise(async (resolve, reject) => {
        try {
            let data = await TdsClientModel.find({loginId: loginId})
            // console.log(data)
            if(data) {
                resolve(data)
            } else {
                reject(data)
            }
        } catch(e) {
            reject(e)
        }
    })
}

userDao.getAllTdsClients = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await TdsClientModel.find({})
            console.log(data)
            if(data) {
                resolve(data)
            } else {
                reject(data)
            }
        } catch(e) {
            reject(e)
        }
    })
}

userDao.getAllTdsModelAdmin = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await TdsModel.find({})
            console.log(data)
            if(data) {
                resolve(data)
            } else {
                reject(data)
            }
        } catch(e) {
            reject(e)
        }
    })
}


userDao.deleteTdsClientById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await TdsClientModel.deleteOne({_id: id})
            console.log(data)
            if(data) {
                resolve(data)
            } else {
                reject(data)
            }
        } catch(e) {
            reject(e)
        }
    })
}


userDao.getOrdersById = (options) => {
    let {loginId} = options

    return new Promise(async (resolve, reject) => {
        try {
            let data = await OrderModel.find({loginId: loginId})
            console.log(data)
        if(data) {
                resolve(data)
            } else {
                reject(data)
            }
        } catch(e) {
            reject(e)
        }
    })
}

/* delete operations */

userDao.deleteProductById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await ProductModel.deleteOne({_id: id})
            console.log(data)
            if(data) {
                resolve(data)
            } else {
                reject(data)
            }
        } catch(e) {
            console.log(e)
            reject(e)
        }
    })
}

/* delete operations */
/* ticket dao operations */

userDao.saveTicket = (options) => {
    let {loginId, email, number, department, subject, details, file, ticket_type} = options
     return new Promise(async (resolve, reject) => {
        try {
            let ticket = TicketModel({loginId: loginId,email: email, number: number, department: department, subject: subject, details: details, file: file, ticket_type})
            let data = await ticket.save() 
           console.log(data)
            if(data) {
                resolve(data)
            } else {
                reject(data)
            }
        } catch(e) {
            console.log(e)
            reject(e)
        }
    })
}

userDao.getAllTicketsByid = (loginId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await TicketModel.find({loginId: loginId})
            // console.log(data)
            if(data) {
                resolve(data)
            } else {
                reject(data)
            }
        } catch(e) {
            reject(e)
        }
    })
}

userDao.getAllBdm = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await UserModel.find({role:"bdm"})
            // console.log(data)
            if(data) {
                resolve(data)
            } else {
                reject(data)
            }
        } catch(e) {
            reject(e)
        }
    })
}



/* ticket dao operations */


/* All Search Queries for GST Registration*/
userDao.getGstRegistrationByStatus = (loginId, status) => {
    
    return new Promise(async (resolve, reject) => {
        try {
            let data = await GstModel.find({loginId: loginId, "admin.status": status })
           // console.log(data)
            if(data) {
                resolve(data)
            } else {
                reject(data)
            }
        } catch(e) {
            console.log(e)
            reject(e)
        }
    })
}


/* All Search Queries for GST Registration */

module.exports = userDao
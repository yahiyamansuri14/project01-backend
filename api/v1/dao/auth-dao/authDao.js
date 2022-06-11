const UserModel = require('../../models/userModel')
require('dotenv').config()
const jwt = require('jsonwebtoken')

const authDao = {}


/* Helper Methods */
authDao.getTotalDocumentCount = async function() {
    return new Promise((resolve, reject) => {
        UserModel.count().then(data => {
            resolve(data)
        }).catch(error => {
            reject(error)
        })
    })
}

authDao.checkEmailExists = async function(email) {
    return new Promise((resolve, reject) => {
        UserModel.find({primary_email: email}).then(data => {
            console.log('in email exists', data)
            if(data) {
                return resolve(data)
            } else {
                return Promise.reject(data)
            }
        }).catch(error => {
            console.log(error)
            return reject(error)
        })
    })
}

/* Helper Methods */

authDao.signup = async function(options) {
    return new Promise(async (resolve, reject) => {
    //console.log('in dao', options)
    let {
        password, role, firstName, lastName, middleName, dob, fatherName, aadhar_no,aadhar_enrollment_no,gender , idUrl, address_name, address_number,
        street, area, city, state, district, pincode, landline, primary_mobile_no, secondary_mobile_no, primary_email, secondary_email,bank_ifsc_code,
        bank_name,account_type, account_no, mobileNo
    } = options
    let loginId = ''
    let count;
    let response = {}
    console.log(role)
    switch(role.toLowerCase()) {
        case "sub_admin": {
            loginId = "SB";break;
        }
        case "branch": {
            loginId = "MG";break;
        }
        case "bdm": {
            loginId = "MGB";break;
        }
        case "staff": {
            loginId = "MGS";break;
        }
    }
    try {
        count = await this.getTotalDocumentCount()
        count = count + 1000
        loginId = loginId + count 
        loginId = loginId.toUpperCase()
        //console.log(loginId)
    } catch(e) { }
        let user = new UserModel({ loginId,
            password, role, firstName, lastName, middleName, dob, fatherName, aadhar_no,aadhar_enrollment_no,gender , idUrl, address_name, address_number,
            street, area, city, state, district, pincode, landline, primary_mobile_no, secondary_mobile_no, primary_email, secondary_email,bank_ifsc_code,
            bank_name,account_type, account_no, mobileNo
        })
        console.log('second')
        user.save().then(data => {
            console.log('third')
            response.data = data
            response.message = "User Created Successfully"
            return resolve(response)
        }).catch(error => {
            console.log(error)
            console.log('fourth')
            response.data = {}
            response.message = "Internal Server Error"
            return reject(error)
        })
    })
}

// authDao.login = async function(options) { 
//     return new Promise(async (resolve, reject) => {
//         console.log("inside login")
//         let { loginId, password, auth_type } = options
//         let response = { }
//         UserModel.findOne({loginId: loginId}).then(async user => {
//             console.log("dao 1", user)
//             if(user && Object.keys(user).values != 0) {
//                 let isSame = password === user.password
//                 console.log("dao 2", isSame)
//                 if(isSame) {
//                     let accessToken = ''
//                     try {
//                         accessToken = await jwt.sign({id: user.loginId}, process.env.ACCESSS_TOKEN_SECRET)
//                     } catch(e) { 
//                         console.log(e)
//                         return Promise.reject()
//                     }
//                     let { loginId, role, isDeleted, adminId, firstName, lastName, email, mobile, idUrl, idNumber, gender, houseNo, street, landmark,
//                         pincode, state, country, createdAt, balance, reward_points
//                     } = user
//                     let data = { loginId, role, isDeleted, adminId, firstName, lastName, email, mobile, idUrl, idNumber, gender, houseNo, street, landmark,
//                         pincode, state, country, createdAt, balance, reward_points
//                     }
//                     response.data = data
//                     response.accessToken = accessToken
//                     response.message = "Login Success"
//                     return resolve(response)
//                 } else {
//                     response.message = "Incorrect password"
//                     return Promise.reject(response)
//                 }
//             } else {
//                 response.message = "User does not found or Incorrect Email"
//                 return Promise.reject(response)
//             }
//         }).catch(error => {
//             console.log(error)
//             return reject(response)
//         })
//     })
// }

authDao.login = async function(req, res) { 
        console.log("inside login")
        // let { loginId, password, auth_type } = options
        let {loginId, password, auth_type} = req.body
        let response = { }
        UserModel.findOne({loginId: loginId}).then(async user => {
            console.log("dao 1", user)
            if(user && Object.keys(user).values != 0) {
                let isSame = password === user.password
                console.log("dao 2", isSame)
                if(isSame) {
                    let accessToken = ''
                    try {
                        accessToken = await jwt.sign({id: user.loginId}, process.env.ACCESSS_TOKEN_SECRET)
                    } catch(e) { 
                        console.log(e)
                        return Promise.reject()
                    }
                    let { loginId, role, isDeleted, adminId, firstName, lastName, email, mobile, idUrl, idNumber, gender, houseNo, street, landmark,
                        pincode, state, country, createdAt, balance, reward_points, primary_mobile_no
                    } = user
                    let data = { loginId, role, isDeleted, adminId, firstName, lastName, email, mobile, idUrl, idNumber, gender, houseNo, street, landmark,
                        pincode, state, country, createdAt, balance, reward_points, primary_mobile_no
                    }
                    response.data = data
                    response.accessToken = accessToken
                    response.message = "Login Success"
                    return res.send({status: "OK", message: "Login Success", data: response})
                } else {
                    response.message = "Incorrect password"
                    return res.send({status:"ERR", message:"Incorrect Password"})
                }
            } else {
                response.message = "User does not found or Incorrect Email"
                return res.send({status:"ERR", message:"Invalid Login ID or Password"})
            }
        }).catch(error => {
            console.log(error)
            return res.send({status: "ERR", message:"Internal Server Error"})
        })

}



module.exports = authDao
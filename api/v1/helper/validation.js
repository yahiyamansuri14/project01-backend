const authDao = require('../dao/auth-dao/authDao')
const validations = { }

validations.isEmailExists = (email) => {
    return new Promise((resolve, reject) => {
        authDao.checkEmailExists(email).then(data => {
            return resolve(true)
        }).catch(error => {
            return reject(false)
        })
    })
}

module.exports = validations

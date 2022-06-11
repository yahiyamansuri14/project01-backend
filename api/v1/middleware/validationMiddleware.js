const httpStatusCodes = require('../helper/httpStatus');
const core_validator = require('../helper/validation')
const validatorMiddleware = { }

validatorMiddleware.signUpValidator = async function(req, res, next) {
    const { primary_email } = req.body
    let isEmail;
    let error = ''
    try {
        isEmail = await core_validator.isEmailExists(primary_email)
    } catch(e) {
        error = ''
    }
    console.log(isEmail)
    if(isEmail) error = 'Email Already Exists'

    if(error.length > 0) {
        return res.status(409).json({message: error})
    } else {
        next()
    }

}

module.exports = validatorMiddleware
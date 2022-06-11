const httpStatusCodes = require('../../helper/httpStatus')
const authDao = require('../../dao/auth-dao/authDao')
const uploadHelper = require('../../helper/fileUploadHelper')
const mailHelper = require('../../helper/mailHelper')
const authServices = {}

authServices.login = async function(req, res) {
    console.log(req.body)
    let options = req.body
    authDao.login(options).then(data => {
        console.log('in service', data)
        //return res.status(httpStatusCodes.OK).json({data: data})
        if(data && data.user && Object.keys(data.user).length != 0) {
            console.log("1")
            return res.status(httpStatusCodes.OK).json({data: data})
        } else {
            console.log("2")
            return res.status(httpStatusCodes.NOT_FOUND).json({data: data})
        }
    }).catch(error => {
        console.log(error)
        return res.status(httpStatusCodes.NOT_FOUND).json({message:"Invalid Login ID or Password"})
    })
}

authServices.signup = async function(req, res) {
    let options = req.body
    // console.log(options)
    let {base64} = req.body
    let filename = "userfile"
    // console.log(req.body)
    let fileUrl
    try {
        fileUrl = await uploadHelper.base64PdfUploadWithFileName(base64, filename)
    } catch(e) {console.log(e)}
    
    options.idUrl = fileUrl
    authDao.signup(options).then(data => {
        // mailHelper.sendAccountCredential(data)
        return res.status(httpStatusCodes.OK).json({data:  data})
    }).catch(error => {
        console.log(error)
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({"message":"Internal Server Error"})
    })
}


module.exports = authServices
const jwt = require('jsonwebtoken')
const httpStatusCodes = require('../helper/httpStatus')
require('dotenv').config()

let tokenMiddleware = { }

tokenMiddleware.validateToken = async (req, res, next) => {
    console.log("inside token middleware")
    // console.log(req.body)
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(" ")[1]
    }
   // let { token } = req.headers
    // console.log(token)
    if(!token) {
        console.log(token)
        return res.status(401).json({errorMessage : "Invalid Authentication"})
    }
    let decoded = null
    try {
        decoded = await jwt.verify(token, process.env.ACCESSS_TOKEN_SECRET)
        req.decoded = decoded
    } catch(e) {
        console.log("error in token middleware", e)
        return res.status(httpStatusCodes.UNAUTHORIZED).json({"message":"Invalid Authentication Token"})
    }
    // console.log("in middleware", req.decoded)
    next()
}

module.exports = tokenMiddleware
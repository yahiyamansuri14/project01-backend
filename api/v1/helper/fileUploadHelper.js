const aws = require('aws-sdk')
const fs = require('fs')
const moment = require('moment')
require('dotenv').config()
let uploadHelper = { }

uploadHelper.fileUpload = async (fileData) => {
    const s3 = new aws.S3({
        accessKeyId: process.env.AWS_ACCESS_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    })
    let data_file = { }
    let splitted = fileData.name.split(".")
    let fileExtension = splitted[splitted.lenth - 1]
    let fileName = moment().unix() + "." + fileExtension
    let resToSent = null
    // try {
    //     await fileData.mv()
    // } catch(e) { console.log('in upload file', e)}
    const uploadFileContent = fs.readFileSync(fileData)
    const params = {
        Bucket : 'taxation-files',
        key:  fileName,
        Body: uploadFileContent,
        ACL : 'public-read'
    }
    try {
        resToSent = await s3.upload(params).promise()
    } catch(e) { }
    
    return resToSent.Location
}

uploadHelper.base64Upload = async (base64) => {
    const s3 = new aws.S3({
        accessKeyId: process.env.AWS_ACCESS_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    })
    const base64Data = new Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), 'base64')
    const type = base64.split(';')[0].split('/')[1]
    let userId = Math.random().toString(36).slice(2,12)
    const params = {
        Bucket : 'taxation-files',
        Key:  userId,
        Body: base64Data,
        ACL : 'public-read',
        ContentEncoding: 'base64',
        ContentType: `image/${type}`
    }
    let location = "";
    let key = userId;
    try {
        const {Location, key} = await s3.upload(params).promise()
        location = Location
        console.log("inside file uploaded", Location, key)
    } catch(error) {
        console.log(error)
    }
    return location
}

uploadHelper.base64UploadWithFileName = async ( base64, filename) => {
    const s3 = new aws.S3({
        accessKeyId: process.env.AWS_ACCESS_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    })
    const base64Data = new Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), 'base64')
    const type = base64.split(';')[0].split('/')[1]
    // let userId = Math.random().toString(36).slice(2,12)
    let userId = filename
    const params = {
        Bucket : 'taxation-files',
        Key:  userId,
        Body: base64Data,
        ACL : 'public-read',
        ContentEncoding: 'base64',
        ContentType: `image/${type}`
    }
    let location = "";
    let key = userId;
    try {
        const {Location, key} = await s3.upload(params).promise()
        location = Location
        console.log("inside file uploaded", Location, key)
    } catch(error) {
        console.log(error)
    }
    return location
}

uploadHelper.base64PdfUploadWithFileName = async ( base64, filename) => {
    console.log(base64)
    const s3 = new aws.S3({
        accessKeyId: process.env.AWS_ACCESS_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    })
    const base64Data = new Buffer.from(base64.replace(/^data:application\/\w+;base64,/, ""), 'base64')
    const type = base64.split(';')[0].split('/')[1]
    // let userId = Math.random().toString(36).slice(2,12)
    let userId = filename 
    const params = {
        Bucket : 'taxation-files',
        Key:  userId,
        Body: base64Data,
        ACL : 'public-read',
        ContentEncoding: 'base64',
        ContentType: `application/${type}`
    }
    let location = "";
    let key = userId;
    try {
        const {Location, key} = await s3.upload(params).promise()
        location = Location
        console.log("inside file uploaded", Location, key)
    } catch(error) {
        console.log(error)
    }
    return location
}

module.exports = uploadHelper
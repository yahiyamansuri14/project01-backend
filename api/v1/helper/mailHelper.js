const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: { 
        user: 'micecate129@gmail.com',
        pass: '9893729155'
    }
})

var mailOption = {
    from: 'micecate129@gmail.com',
    to: '',
    subject: 'OTP for signup',
    text:' '
}

mailHelper = { }

mailHelper.sendAccountCredential = async (data) => {
    mailOption.to = data.primary_emauil
    var mailText = `Your Credential for account are email:- ${data.primary_emauil} loginId:- ${data.loginId} password:- ${data.password} role:- ${data.role}`
    mailOption.text = mailText
    return new Promise((resolve, reject) => {
        transport.sendMail(mailOption).then(data => {
            return resolve("true")
        }).catch(error => {
            return reject("false")
        })
    })
}
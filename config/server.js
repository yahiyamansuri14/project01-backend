const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const authRouter = require('../api/v1/routes/auth-routes/authRoute')
const userRouter = require('../api/v1/routes/user-routes/userRoutes')
const userServices = require('../api/v1/services/user-services/userServices')

require('dotenv').config()
require('../database/db')

const app = express()

const PORT = process.env.port || 3800

app.use(cors())
app.use(bodyParser.urlencoded({extended: false, limit: "200mb",  extended: true, parameterLimit: 1000000}))
app.use(bodyParser.json({limit: "200mb"}))
app.use(file_upload())
app.use('/v1/auth', authRouter)
app.use('/v1/user', userRouter)

process.on('uncaughtException', (err , origin) => {
    console.log(err)
})

app.get('/test', (req, res) => {
    return res.status(200).json({"message":"Success"})
})

app.listen(PORT, (error) => {
    if(error) console.log(`------unable to connect to server------${error}`)
    else console.log(`-----------server is running on ${PORT}------`)
})
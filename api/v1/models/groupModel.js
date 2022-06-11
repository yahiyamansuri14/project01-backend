const mongoose = require('mongoose')
const Schema = mongoose.Schema

const groupSchema = new Schema({
    loginId : {
        type: String,
        require: true
    },
    name: {
        type: String,
        required: true
    }

},{timestamps: true})

const GroupModel = mongoose.model('group', groupSchema)
module.exports = GroupModel
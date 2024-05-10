const express = require('express')
const mongoose = require('mongoose')
const clientSchema = new mongoose.Schema({
    fullname: {
        type: String
    },
    email: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    whatsappnumber: {
        type: String
    },
    password: {
        type: String,
        required:false
    },
    otpCode: {
        type: String,
        default:null
    },
    verified: {
        type:String,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})


const Client = mongoose.model('Client', clientSchema)

module.exports = {
    Client
}
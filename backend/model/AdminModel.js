const express = require('express');
const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    role_id: {
        type: String
    },
    otpCode: {
        type: String,
        default: null
    },
    verified: {
        type: String,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})



const Admin = mongoose.model('Admin', adminSchema)


module.exports = Admin;
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const { Client } = require('../model/ClientModel');

const credentials = {
    apiKey: 'd70b4a1bd8a2b35a46fbe2f0c641588bf930235ac6bf021e95730963cae8c111',
    username: 'codemunity',
};

const AfricasTalking = require('africastalking')(credentials);


// function generate5DigitOTP() {
//     // Generate a random number between 10000 and 99999
//     const randomNum = Math.random() * 90000;
//     // Format the random number to eliminate decimals and ensure it's a 5-digit number
//     const otp = Math.floor(10000 + randomNum);
//     return otp;
// }

const randomNum = Math.random() * 90000;
// Format the random number to eliminate decimals and ensure it's a 5-digit number
const otp = Math.floor(10000 + randomNum);

// Example usage
// console.log("Generated 5-digit OTP:", generate5DigitOTP());

const sendOTP = async ({ phoneNumber }) => {
    try {
        // Initialize a service e.g. SMS
        const sms = AfricasTalking.SMS
        const phone = '+254' + phoneNumber.slice(-9)

        // Use the service
        const options = {
            to: phone,
            message: otp
        }

        // Send message and capture the response or error
        sms.send(options)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    } catch (error) {
        console.log(error);

    }
}


const createUser = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, address, password, otpCode, verified, whatsappnumber } = req.body;

        const existingClient = await Client.findOne({ email });

        if (existingClient) {
            res.status(400).json({ message: "Client already exists" });
        } else {
            let hashedPassword = '';
            if (password) {
                hashedPassword = await bcrypt.hash(password, 10);
            }

            const user = await Client.create({
                fullname,
                email,
                phoneNumber,
                whatsappnumber,
                address,
                password: hashedPassword, // Only set the password if it's provided
                otpCode: otp,
                verified
            });
            res.status(200).json({ message: "User created Successfully", user });
            console.log(user.phoneNumber);
            sendOTP({ phoneNumber: user.phoneNumber });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating new user" });
    }
};


const updateAccountPassword = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await Client.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update user's password with the hashed password
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating password" });
    }
}


//update profile

const updateAccountToVerified = async (req, res) => {
    try {
        const { email, otp } = req.body;

        // Find the user by email
        const user = await Client.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare the OTP sent by the user with the one saved in the user's record
        if (user.otpCode !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        // If OTP matches, update the user's status to verified
        user.verified = true;
        await user.save();

        res.status(200).json({ message: "Account verified successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating account to verified" });
    }
};


const clientLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Client.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "email not found" });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).json({ message: "incorrect credentials.Please try again." })
        }
        

        const token = jwt.sign({_id:user._id},process.env.JWT_SECRET, { expiresIn: 3600 });
        // const response = {name:user.fullname,email:user.email,phone:user.phoneNumber,id:user._id,token:token};
        
        
        // return res.status(200).json(response);
        res.status(200).json({ message: "Success",user,token:token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Login failed' });

    }

}


const getClientById = async(req, res) => {
    try {
        const {id} = req.params;
        const user = await Client.findById(id);
        res.status(200).json(user)
        
    } catch (error) {
        res.status(500).json({message:error.message});
        
    }
}





module.exports = {
    createUser,
    updateAccountToVerified,
    updateAccountPassword,
    clientLogin,
    getClientById
}
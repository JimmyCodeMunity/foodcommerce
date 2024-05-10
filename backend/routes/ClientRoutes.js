const mongoose = require('mongoose');
const express = require('express');
const { createUser, updateAccountToVerified, updateAccountPassword, clientLogin, getClientById } = require('../controller/ClientController');


const router = express.Router();
router.use(express.json());


//allow url encoded
router.use(express.urlencoded({extended:false}));

//verify account
router.post('/verify-account', updateAccountToVerified);

//set password
router.post('/set-password', updateAccountPassword);


//client logins
router.post('/client-login', clientLogin);


//get client data by id
router.get('/get-profile/:id',getClientById)





//get all users
// router.get('/users',)

//register a new user
router.post('/createclient',createUser);

module.exports = router;
const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path')

const app = express();
app.use(express.json());
app.use(cors());
require('dotenv').config();
// app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV !== 'PRODUCTION') {
    require("dotenv").config({
        path: "./.env"
    })
}


const PORT = process.env.PORT;
const db = process.env.DBURL;

app.listen(PORT, (req, res) => {
    console.log(`app is running on port ${PORT}`);
})

app.get('/', (req, res) => {
    res.send('Welcome to the Lantern Server')
})

app.get('/service-work.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile(path.resolve(__dirname, 'public', 'service-work.js'));
});

//DATABAS CONNECTION
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected')
    }).catch((error) => {
        console.log(error)
    })


// prepare routes
const clientRoute = require('./routes/ClientRoutes');


// initiate route
app.use('/api/v2/client', clientRoute);
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const { response } = require("express");

const stripe = require("stripe")
('sk_test_51K8nZ6SBOip5bBXbgKmS2MichAFak8waoPCj63dAzQke4q39TnCjZI6H88v94yKlNcv6vMAxYuLtQ74517jPdE8a00Pok7Orzv')

// App config

const app = express();

// Middleware 

app.use(cors({ origin: true}));
app.use(express.json());

//APi routes 
app.get('/', (request, response) => response.status(200).send('hello world'))

app.post('/payments/create', async (request, response) => {
    const total= request.query.total;

    const paymentsIntent = await stripe.paymentsIntent.create({
        amount: total,
        currency: "usd"
    });

    response.status(201).send({
        clientsecret: paymentsIntent.clientsecret,
    })
})


// Listen command

exports.api = functions.https.onRequest(app);


// http://localhost:5001/clone-329a0/us-central1/api
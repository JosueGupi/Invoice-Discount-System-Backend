const app = require("express").Router();
const { response } = require("express");
const connection = require("../mysql");
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');

require('dotenv').config();

app.use(bodyParser.json());
sgMail.setApiKey('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');

app.post('/send-email', async (req, res) => {
    console.log('entre');
    const { numero, fecha, monto, pagador } = req.body;

    const msg = {
        to: 'sistemaInverEllens@gmail.com',
        from: 'sistemaInverEllens@gmail.com',
        subject: 'Nueva Cesión Generada',
        templateId: 'd-8eeba631a8984506a28c828741da4c5e',
        dynamicTemplateData: { numero, fecha, monto, pagador }
    };

    try {
        await sgMail.send(msg);
        res.status(200).send("Email has been sent");
    } catch (error) {
        console.error(error);
        if (error.response) {
            console.error(error.response.body);
        }
        res.status(500).send('Error sending email');
    }
});

module.exports = app;
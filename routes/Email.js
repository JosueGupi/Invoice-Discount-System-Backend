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
    console.log(numero, fecha, monto, pagador);

    const msg = {
        to: 'sistemaInverEllens@gmail.com',
        from: 'sistemaInverEllens@gmail.com',
        subject: 'Nueva Cesión Generada',
        templateId: 'd-8eeba631a8984506a28c828741da4c5e',
        dynamicTemplateData: {
            factura: {
                numero,
                fecha,
                monto,
                pagador
            }
        }
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
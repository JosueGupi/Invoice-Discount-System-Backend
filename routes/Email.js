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
    }
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
            res.status(200).send("Email has been sent");
        })
        .catch((error) => {
            console.error(error)
            res.status(500).send('Error sending email');
        })
});


module.exports = app;
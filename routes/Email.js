const app = require("express").Router();
const sgMail = require('@sendgrid/mail');

require('dotenv').config();

sgMail.setApiKey(api_key = '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')


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
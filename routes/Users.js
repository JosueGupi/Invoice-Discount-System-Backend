const app = require("express").Router();
const { response } = require("express");
const connection = require("../mysql");
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');

const pdf = require('html-pdf');
const fs = require('fs');
const utils = require('./Utils');
app.use(bodyParser.json());

sgMail.setApiKey('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');

app.post("/login", function (req, res) {
    const password = req.body.password,
        email = req.body.email;
    connection.query(`CALL SP_Login('${email}', '${password}');`,
        function (err, result) {

            if (err) {
                console.log("nooo :(")
                res.json(err);
                throw err;
            }
            console.log("si :)")
            console.log(result[0])
            res.json(result[0]);
        }
    );
});

app.post("/evalEmail", function (req, res) {
    const email = req.body.email;
    console.log(req);
    connection.query(`CALL SP_EvalEmail('${email}');`,
        function (err, result) {
            console.log(result);
            if (err) {
                res.json(err);
                throw err;
            }

            res.json(result[0]);
        }
    );
});

app.post("/evalMatrix", function (req, res) {
    const idUser = req.body.idUser,
        cord1 = Number(req.body.cord1),
        cord2 = Number(req.body.cord2),
        cord3 = Number(req.body.cord3),
        cord1Showed = req.body.cord1Showed,
        cord2Showed = req.body.cord2Showed,
        cord3Showed = req.body.cord3Showed;
    connection.query(`CALL SP_EvalMatrix(${idUser});`,
        function (err, result) {

            if (err) {
                res.json(err);
                throw err;
            }
            else {

                const matrix = result[0][0].Matrix;
                if (matrix[cord1Showed[0]][cord1Showed[1] - 1] === cord1 && matrix[cord2Showed[0]][cord2Showed[1] - 1] === cord2
                    && matrix[cord3Showed[0]][cord3Showed[1] - 1] === cord3) {
                    console.log("0")
                    res.json(0)
                }
                else {
                    res.json(1)
                }

            }

        }
    );
});

app.post("/changePassword", function (req, res) {
    const idUser = req.body.idUser,
        password = req.body.password

    connection.query(`CALL SP_ChangePassword('${password}', '${idUser}');`,
        function (err, result) {

            if (err) {
                res.json(err);
                throw err;
            }
            else {
                res.json(result[0])
            }
        }
    );
});

app.get("/getUsers", function (req, res) {

    connection.query(`CALL SP_GetUsers();`,
        function (err, result) {

            if (err) {
                res.json(err);
                throw err;
            }
            else {
                res.json(result[0])
            }
        }
    );
});

app.post("/createUser", function (req, res) {
    const name = req.body.name,
        email = req.body.email,
        password = req.body.password;

    // Generar la matriz aleatoria y el HTML
    const data = generateRandomMatrix(5);
    const html = generateHTMLTable(data);
    const matrixJson = JSON.stringify(data);

    const msg = {
        to: email,
        from: 'sistemaInverEllens@gmail.com',
        subject: 'Matriz de Seguridad',
        html: html,
    };

    // Enviar correo
    sgMail.send(msg)
        .then(() => {
            console.log('Correo enviado con éxito');
            // Crear el usuario
            connection.query(`CALL SP_CreateUser('${name}', '${email}', '${password}');`,
                function (err, result) {
                    if (err) {
                        console.error(err);
                        return res.status(500).json(err);
                    }
                    console.log('Usuario creado con éxito');

                    // Insertar la matriz en la base de datos
                    connection.query(`CALL SP_InsertMatrix('${name}', '${matrixJson}');`,
                        function (err, resultMatrix) {
                            if (err) {
                                console.error(err);
                                return res.status(500).json(err); // Manejo de error al insertar la matriz
                            }
                            console.log('Matriz insertada con éxito');
                            res.json("Matriz insertada con éxito!"); // Envía la respuesta aquí
                        }
                    );
                }
            );
        })
        .catch((error) => {
            console.error(error.toString());
            res.status(500).send('Error al enviar correo');
        });
});



function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



function generateRandomMatrix(size) {
    const matrix = {};
    const uniqueLetters = ['A', 'B', 'C', 'D', 'E'];

    uniqueLetters.forEach(letter => {
        matrix[letter] = [];
        for (let i = 0; i < 5; i++) {
            matrix[letter].push(generateRandomNumber(1, 99));
        }
    });

    return matrix;
}

function generateHTMLTable(data) {
    let html = `
    <table style="border-collapse: collapse; width: 100%;">
        <tr>`;

    // Encabezados de la tabla
    for (const key in data) {
        html += `<th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2;">${key}</th>`;
    }

    html += `</tr>`;

    // Filas de la tabla
    for (let i = 0; i < data[Object.keys(data)[0]].length; i++) {
        html += `<tr style="${i % 2 === 0 ? 'background-color: #f2f2f2;' : ''}">`;
        for (const key in data) {
            html += `<td style="border: 1px solid #ddd; padding: 8px;">${data[key][i]}</td>`;
        }
        html += `</tr>`;
    }

    html += `</table>`;
    return html;
}


app.post("/updateUser", function (req, res) {
    const name = req.body.name,
        email = req.body.email,
        idUser = req.body.idUser;


    connection.query(`CALL SP_UpdateUser('${name}', '${email}', ${idUser});`,
        function (err, result) {

            if (err) {
                res.json(err);
                throw err;
            }
            else {
                res.json(result[0])
            }
        }
    );
});

app.post("/deleteUser", function (req, res) {
    const idUser = req.body.idUser;


    connection.query(`CALL SP_DeleteUser(${idUser});`,
        function (err, result) {

            if (err) {
                res.json(err);
                throw error;
            }
            else {
                res.json(result[0])
            }
        }
    );
});

app.post("/sendEmailOP", async function (req, res) {

    const idOperation = req.body.idOperation;
    // HTML que quieres convertir a PDF

    var sumFactVal = 0; sumDeductionsVal = 0;

    const opDetails = (await connection.promise().query(`CALL SP_GetOpDetails(${idOperation});`))[0][0]
    const deductions = (await connection.promise().query(`CALL SP_GetOpDeductions(${idOperation});`))[0][0]
    const invoices = (await connection.promise().query(`CALL SP_GetOpInvoices(${idOperation});`))[0][0]
    var message = utils.pdfHeader(opDetails[0].CardId, opDetails[0].opNumber) + utils.invoicesHeader(opDetails[0].ClientName, opDetails[0].opNumber, opDetails[0].Date);

    for (let i = 0; i < invoices.length; i++) {

        sumFactVal += invoices[i].Amount;
        let invoice = invoices[i];
        message += utils.invoicesBoddy(invoice.Number, invoice.Entity, invoice.Date, invoice.Amount);
    }
    let totalInterest = ((((opDetails[0].Interes / 100) / 30) * opDetails[0].Term * sumFactVal)).toFixed(2)
    message += utils.subTotal(sumFactVal) + utils.retentionValue(opDetails[0].Retention, opDetails[0].RetentionCode, sumFactVal)
        + utils.comissionValue(opDetails[0].Comission, opDetails[0].ComissionCode, sumFactVal)
        + utils.legalExpenses(opDetails[0].LegalExpenses, opDetails[0].LegalExpenseCode, ((totalInterest)), opDetails[0].SubTotal, opDetails[0].TransferCost)
        + utils.monthInteretsHeader(opDetails[0].Date, opDetails[0].Date, opDetails[0].Term);


    let interestList = utils.obtainDates(opDetails[0].Term, opDetails[0].Date);
    console.log('list', interestList)
    let index = 1;
    for (let i = 0; i < interestList.length; i++) {
        let monthInterest = (interestList[i].days / opDetails[0].Term) * totalInterest;
        let code = index === 1 ? opDetails[0].RealInteresCode : opDetails[0].DeferredInterestCode;
        let totalForMonth = i == interestList.length - 1 ? totalInterest : null;
        message += utils.monthInteretsBoddy(code, interestList[i].month, monthInterest, totalForMonth);
        index = 0;
    }
    message += utils.tranferCost(opDetails[0].TransferCost)
        + utils.feeBoddy(opDetails[0].Fee === 1, sumFactVal, sumFactVal, opDetails[0].DeferredInterestCode, opDetails[0].SubTotal);//cambiar totalCosts y el codigo [2-3]


    for (let i = 0; i < deductions.length; i++) {
        sumDeductionsVal = deductions[i].Amount;
        let deduction = deductions[i]
        message += utils.deductions(deduction.Description, deduction.Amount, deduction.idOperation, deduction.Code)
    }
    message += utils.endOp(opDetails[0].Total, sumDeductionsVal)

    commisionVal = sumFactVal * (opDetails[0].Comission / 100)//
    retentionVal = sumFactVal * (opDetails[0].Retention / 100)
    interestVal = sumFactVal * (opDetails[0].Interes / 100)



    // Opciones para generar el PDF desde HTML
    const pdfOptions = {
        format: 'Letter', height: "22in",        // allowed units: mm, cm, in, px
        width: "12in"
    };

    // Función para generar el PDF desde HTML y enviarlo como adjunto
    const sendEmailWithAttachment = async () => {
        try {
            // Generar el PDF desde HTML
            pdf.create(message, pdfOptions).toFile('./file3.pdf', async (err, result) => {
                if (err) throw err;

                // Adjuntar el archivo PDF al correo

                const attachment = fs.readFileSync(result.filename);

                const msg = {
                    to: 'sistemaInverEllens@gmail.com',
                    from: 'sistemaInverEllens@gmail.com',
                    subject: 'Operacion',
                    text: '¡Hola! Adjunto encontrarás el PDF generado ',
                    attachments: [
                        {
                            content: attachment.toString('base64'),
                            filename: 'generated_pdf.pdf',
                            type: 'application/pdf',
                            disposition: 'attachment',
                        },
                    ],
                };

                // Enviar el correo electrónico
                await sgMail.send(msg);
                console.log('Correo electrónico enviado correctamente con el PDF adjunto.');

            });
        } catch (error) {
            console.error('Error al enviar el correo electrónico:', error.toString());
        }
    };

    // Llamar a la función para enviar el correo con el PDF adjunto
    await sendEmailWithAttachment();

});


app.post("/getPDFOp", async function (req, res) {
    //const idOperation = req.body.idOperation;
    const idOperation = req.body.idOperation;
    console.log(req.body);
    // HTML que quieres convertir a PDF

    var sumFactVal = 0; sumDeductionsVal = 0;

    const opDetails = (await connection.promise().query(`CALL SP_GetOpDetails(${idOperation});`))[0][0]
    const deductions = (await connection.promise().query(`CALL SP_GetOpDeductions(${idOperation});`))[0][0]
    const invoices = (await connection.promise().query(`CALL SP_GetOpInvoices(${idOperation});`))[0][0]
    var message = utils.pdfHeader(opDetails[0].CardId, opDetails[0].opNumber) + utils.invoicesHeader(opDetails[0].ClientName, opDetails[0].opNumber, opDetails[0].Date);

    for (let i = 0; i < invoices.length; i++) {

        sumFactVal += invoices[i].Amount;
        let invoice = invoices[i];
        message += utils.invoicesBoddy(invoice.Number, invoice.Entity, invoice.Date, invoice.Amount);
    }
    let totalInterest = ((((opDetails[0].Interes / 100) / 30) * opDetails[0].Term * sumFactVal)).toFixed(2)
    message += utils.subTotal(sumFactVal) + utils.retentionValue(opDetails[0].Retention, opDetails[0].RetentionCode, sumFactVal)
        + utils.comissionValue(opDetails[0].Comission, opDetails[0].ComissionCode, sumFactVal)
        + utils.legalExpenses(opDetails[0].LegalExpenses, opDetails[0].LegalExpenseCode, ((totalInterest)), opDetails[0].SubTotal, opDetails[0].TransferCost)
        + utils.monthInteretsHeader(opDetails[0].Date, opDetails[0].Date, opDetails[0].Term);


    let interestList = utils.obtainDates(opDetails[0].Term, opDetails[0].Date);
    console.log('list', interestList)
    let index = 1;
    for (let i = 0; i < interestList.length; i++) {
        let monthInterest = (interestList[i].days / opDetails[0].Term) * totalInterest;
        let code = index === 1 ? opDetails[0].RealInteresCode : opDetails[0].DeferredInterestCode;
        let totalForMonth = i == interestList.length - 1 ? totalInterest : null;
        message += utils.monthInteretsBoddy(code, interestList[i].month, monthInterest, totalForMonth);
        index = 0;
    }
    message += utils.tranferCost(opDetails[0].TransferCost)
        + utils.feeBoddy(opDetails[0].Fee === 1, sumFactVal, sumFactVal, opDetails[0].DeferredInterestCode, opDetails[0].SubTotal);//cambiar totalCosts y el codigo [2-3]


    for (let i = 0; i < deductions.length; i++) {
        sumDeductionsVal = deductions[i].Amount;
        let deduction = deductions[i]
        message += utils.deductions(deduction.Description, deduction.Amount, deduction.idOperation, deduction.Code)
    }
    message += utils.endOp(opDetails[0].Total, sumDeductionsVal)

    commisionVal = sumFactVal * (opDetails[0].Comission / 100)
    retentionVal = sumFactVal * (opDetails[0].Retention / 100)
    interestVal = sumFactVal * (opDetails[0].Interes / 100)



    // Opciones para generar el PDF desde HTML
    const pdfOptions = {
        format: 'Letter', height: "22in",        // allowed units: mm, cm, in, px
        width: "12in"
    };

    // Función para generar el PDF desde HTML y enviarlo como adjunto
    const dowloadFile = async () => {
        try {
            // Generar el PDF desde HTML
            pdf.create(message, pdfOptions).toFile('./file3.pdf', async (err, result) => {
                if (err) throw err;

                const attachment = fs.readFileSync(result.filename);

                res.download(result.filename)

            });
        } catch (error) {
            console.error('Error al enviar el correo electrónico:', error.toString());
        }
    };

    await dowloadFile();

});




module.exports = app;
const app = require("express").Router();
const { response } = require("express");
const connection = require("../mysql");
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');

app.use(bodyParser.json());
sgMail.setApiKey('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');

app.post("/login", function (req, res) {
    const password = req.body.password,
        email = req.body.email;
    connection.query(`CALL SP_Login('${email}', '${password}');`,
        function (err, result) {

            if (err) {
                res.json(err);
                throw err;
            }

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
                const matrix = result[0].Matrix;

                if (matrix[cord1Showed[0]][cord1Showed[1] - 1] === cord1 && matrix[cord2Showed[0]][cord2Showed[1] - 1] === cord2
                    && matrix[cord3Showed[0]][cord3Showed[1] - 1] === cord3) {
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

    connection.query(`CALL SP_ChangePassword ('${password}' WHERE idUser = ${idUser});`,
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
        password = req.body.password

    // enviar correo
    const data = generateRandomMatrix(5);
    console.log(data)
    const html = generateHTMLTable(data);
    console.log(html)

    const msg = {
        to: email,
        from: 'sistemaInverEllens@gmail.com',
        subject: 'Matriz de Seguridad',
        html: html,
    };

    sgMail
        .send(msg)
        .then(() => {
            console.log('Correo enviado con éxito');
            res.send('Correo enviado con éxito');
        })
        .catch((error) => {
            console.error(error.toString());
            res.status(500).send('Error al enviar correo');
        });




    connection.query(`CALL SP_CreateUser('${name}', '${email}', '${password}');`,
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

    // agregar a la base la matriz

});

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomLetter() {
    const letters = 'ABCDE';
    return letters.charAt(Math.floor(Math.random() * letters.length));
}

function generateRandomMatrix(size) {
    const matrix = {};
    for (let i = 0; i < size; i++) {
        const letter = generateRandomLetter();
        if (!matrix[letter]) {
            matrix[letter] = [];
        }
        for (let j = 0; j < 5; j++) {
            matrix[letter].push(generateRandomNumber(1, 99));
        }
    }
    return matrix;
}
function generateHTMLTable(data) {
    let html = '<table><tr>';
    for (const key in data) {
        html += `<th>${key}</th>`;
    }
    html += '</tr>';
    for (let i = 0; i < data[Object.keys(data)[0]].length; i++) {
        html += '<tr>';
        for (const key in data) {
            html += `<td>${data[key][i]}</td>`;
        }
        html += '</tr>';
    }
    html += '</table>';
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
module.exports = app;
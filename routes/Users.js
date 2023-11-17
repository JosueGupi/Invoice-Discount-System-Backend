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

module.exports = app;
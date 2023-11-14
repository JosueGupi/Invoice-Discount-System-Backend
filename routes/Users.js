const app = require("express").Router();
const { response } = require("express");
const connection = require("../mysql");

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
});
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
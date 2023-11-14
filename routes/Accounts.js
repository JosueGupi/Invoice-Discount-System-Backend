const app = require("express").Router();
const { response } = require("express");
const connection = require("../mysql");

app.get("/getAccounts", function (req, res) {


    connection.query(`CALL SP_GetAccounts();`,
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
app.post("/createAccount", function (req, res) {
    const idClient = req.body.idClient,
        number = req.body.number,
        idBank = req.body.idBank

    connection.query(`CALL SP_CreateAccounts(${idClient}, '${number}', ${idBank});`,
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
app.post("/updateAccount", function (req, res) {
    console.log(req.body);
    const idClient = Number(req.body.idClient),
        number = req.body.number,
        idBank = Number(req.body.idBank),
        idAccount = req.body.idAccount;


    connection.query(`CALL SP_UpdateAccount(${idClient}, '${number}', ${idBank}, ${idAccount});`,
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

app.post("/deleteAccount", function (req, res) {
    const idAccount = req.body.idAccount;


    connection.query(`CALL SP_DeleteAccount(${idAccount});`,
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
const app = require("express").Router();
const { response } = require("express");
const connection = require("../mysql");

app.get("/getAccounts", function (req, res) {
    

    connection.query(`SELECT idAccounts, Name, Number, BankName FROM accountsview;`,
        function (err, result) {

            if (err) {
                res.json(err);
                throw err;
            }
            else {
                res.json(result)
            }
        }
    );
});
app.post("/createAccount", function (req, res) {
    const idClient = req.body.idClient,
        number = req.body.number,
        idBank = req.body.idBank

    connection.query(`INSERT INTO accounts (idClient, Number, idBank) VALUES  (${idClient}, '${number}', ${idBank})`,
        function (err, result) {

            if (err) {
                res.json(err);
                throw err;
            }
            else {
                res.json(result)
            }
        }
    );
});
app.post("/updateAccount", function (req, res) {
    const idClient = req.body.idClient,
        number = req.body.number,
        idBank = req.body.idBank,
        idAccount = req.body.idAccount;
        

    connection.query(`UPDATE accounts SET idClient = ${idClient}, Number = '${number}', idBank = ${idBank} WHERE idAccount = ${idAccount}`,
        function (err, result) {

            if (err) {
                res.json(err);
                throw err;
            }
            else {
                res.json(result)
            }
        }
    );
});

app.post("/deleteAccount", function (req, res) {
    const idAccount = req.body.idAccount;
        

    connection.query(`DELETE FROM accounts WHERE idAccount = ${idAccount}`,
        function (err, result) {

            if (err) {
                res.json(err);
                throw error;
            }
            else {
                res.json(result)
            }
        }
    );
});
module.exports = app;
const app = require("express").Router();
const { response } = require("express");
const connection = require("../mysql");

app.get("/getBanks", function (req, res) {


    connection.query(`SELECT idBank, Name FROM banks;`,
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
app.post("/createBank", function (req, res) {
    const name = req.body.name;

    connection.query(`INSERT INTO banks (Name) VALUES  ('${name}')`,
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
app.post("/updateBank", function (req, res) {
    const name = req.body.name,
        idBank = req.body.idBank;


    connection.query(`UPDATE banks SET Name = '${name}' WHERE idBank = ${idBank}`,
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

app.post("/deleteBank", function (req, res) {
    const idBank = req.body.idBank;


    connection.query(`DELETE FROM Banks WHERE idBank = ${idBank}`,
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
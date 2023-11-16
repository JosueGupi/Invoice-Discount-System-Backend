const utils = require('../Utils.js');
const app = require("express").Router();
const { response } = require("express");
const connection = require("../mysql");

app.get("/getClientDeb", function (req, res) {
    connection.query(`CALL SP_DeudaPorCliente();`,
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

app.get("/getMonthlyInterest", function (req, res) {
    connection.query(`CALL SP_GetReceivables();`,
        function (err, result) {

            if (err) {
                res.json(err);
                throw err;
            }
            else {
                console.log(result[0]);
                const monthlyInterest = utils.getMonthsAndYearsList(result[0]);
                console.log(monthlyInterest);
                res.json(monthlyInterest);
            }
        }
    );
});

module.exports = app;
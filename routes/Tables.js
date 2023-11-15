const app = require("express").Router();
const { response } = require("express");
const connection = require("../mysql");

/*
app.get("/getTableMovements", function (req, res) {
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
});*/

app.get("/getTableReceivables", function (req, res) {
    connection.query(`CALL SP_GetReceivables();`,
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

module.exports = app;
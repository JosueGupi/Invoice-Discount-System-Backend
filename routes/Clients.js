const app = require("express").Router();
const { response } = require("express");
const connection = require("../mysql");

app.get("/getClients", function (req, res) {


    connection.query(`SELECT idClient, Name FROM clients;`,
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

module.exports = app;
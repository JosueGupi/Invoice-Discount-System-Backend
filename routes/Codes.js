const app = require("express").Router();
const { response } = require("express");
const connection = require("../mysql");

app.get("/getCodes", function (req, res) {
    connection.query(`SELECT Code, Description, clients.Name FROM accountingcodes INNER JOIN clients ON accountingcodes.idClient = clients.idClient;`,
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
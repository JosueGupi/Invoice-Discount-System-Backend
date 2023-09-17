const app = require("express").Router();
const { response } = require("express");
const connection = require("../mysql");

app.get("/getCodes", function (req, res) {
    connection.query(`SELECT idAccountingCodes, Code, Description, clients.Name FROM accountingcodes INNER JOIN clients ON accountingcodes.idClient = clients.idClient;`,
        function (err, result) {

            if (err) {
                res.json(err);
                throw err;
            }
            else {
                res.json(result);
            }
        }
    );
});

app.post("/updateCode", function (req, res) {
    const idClient = Number(req.body.idClient),
        code = Number(req.body.code),
        description = req.body.description,
        idAccountingCodes = Number(req.body.idAccountingCodes);


    connection.query(`UPDATE accountingcodes SET idClient = ${idClient}, Code = ${code}, Description = '${description}' WHERE idAccountingCodes = ${idAccountingCodes}`,
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

app.post("/createCode", function (req, res) {
    const idClient = Number(req.body.idClient),
        code = Number(req.body.code),
        description = req.body.description;

    connection.query(`INSERT INTO accountingcodes (idClient, Code, Description) VALUES  (${idClient}, ${code}, '${description}')`,
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
const app = require("express").Router();
const { response } = require("express");
const connection = require("../mysql");

app.get("/getCodes", function (req, res) {
    connection.query(`SELECT idAccountingCodes, Code, Description, clients.Name, CASE WHEN CodeType = 0 THEN 'Gastos Legales' WHEN CodeType = 1  THEN 'Intereses Reales' WHEN CodeType = 2 THEN 'Intereses Diferidos' ELSE 'Otros' END AS TypeCode FROM accountingcodes INNER JOIN clients ON accountingcodes.idClient = clients.idClient;`,
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
        idAccountingCodes = Number(req.body.idAccountingCodes),
        codeType = Number(req.body.codeType);


    connection.query(`UPDATE accountingcodes SET idClient = ${idClient}, Code = ${code}, Description = '${description}', CodeType = ${codeType} WHERE idAccountingCodes = ${idAccountingCodes}`,
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
        description = req.body.description,
        codeType = Number(req.body.codeType);

    connection.query(`INSERT INTO accountingcodes (idClient, Code, Description, CodeType) VALUES  (${idClient}, ${code}, '${description}',${codeType})`,
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

app.post("/deleteCode", function (req, res) {
    const idAccountingCodes = req.body.idAccountingCodes;


    connection.query(`DELETE FROM accountingcodes WHERE idAccountingCodes = ${idAccountingCodes}`,
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
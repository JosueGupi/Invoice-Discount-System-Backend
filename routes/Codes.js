const app = require("express").Router();
const { response } = require("express");
const connection = require("../mysql");
// refreshing
app.get("/getCodes", function (req, res) {
    connection.query(`CALL SP_GetCodes();`,
        function (err, result) {

            if (err) {
                res.json(err);
                throw err;
            }
            else {
                res.json(result[0]);
            }
        }
    );
});

app.post("/updateCode", function (req, res) {
    const idClient = Number(req.body.idClient),
        code = req.body.code,
        description = req.body.description,
        idAccountingCodes = Number(req.body.idAccountingCodes),
        codeType = Number(req.body.codeType);


    connection.query(`CALL SP_UpdateCode(${idClient}, '${code}', '${description}', ${idAccountingCodes}, ${codeType});`,
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

app.post("/createCode", function (req, res) {
    const idClient = Number(req.body.idClient),
        code = req.body.code,
        description = req.body.description,
        codeType = Number(req.body.codeType);

    connection.query(`CALL SP_CreateCode(${idClient}, '${code}', '${description}', ${codeType});`,
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

app.post("/deleteCode", function (req, res) {
    const idAccountingCodes = req.body.idAccountingCodes;


    connection.query(`CALL SP_DeleteCode(${idAccountingCodes});`,
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
app.post("/getClientCodes", function (req, res) {
    const idClient = req.body.idClient;
    connection.query(`CALL SP_GetClientCodes (${idClient});`,
        function (err, result) {

            if (err) {
                res.json(err);
                throw err;
            }
            else {
                res.json(result[0]);
            }
        }
    );
});

module.exports = app;
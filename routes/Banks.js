const app = require("express").Router();
const { response } = require("express");
const connection = require("../mysql");

app.get("/getBanks", function (req, res) {


    connection.query(`CALL SP_GetBanks();`,
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

    connection.query(`CALL SP_CreateBank('${name}');`,
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


    connection.query(`CALL SP_UpdateBank('${name}', ${idBank});`,
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


    connection.query(`CALL SP_DeleteBank(${idBank});`,
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
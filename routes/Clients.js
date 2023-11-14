const app = require("express").Router();
const { response } = require("express");
const connection = require("../mysql");

app.get("/getClients", function (req, res) {


    connection.query(`CALL SP_GetClients();`,
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

app.post("/createClient", function (req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const idenCard = req.body.idenCard;

    connection.query(`CALL SP_CreateClient('${name}', '${email}', '${idenCard}');`,
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
app.post("/updateClient", function (req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const idenCard = req.body.idenCard,
        idClient = req.body.idClient;


    connection.query(`CALL SP_UpdateClient('${name}', '${email}', '${idenCard}', ${idClient});`,
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

app.post("/deleteClient", function (req, res) {
    const idClient = req.body.idClient;


    connection.query(`CALL SP_DeleteClient(${idClient});`,
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
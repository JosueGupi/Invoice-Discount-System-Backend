const app = require("express").Router();
const { response } = require("express");
const connection = require("../mysql");

app.get("/getClients", function (req, res) {


    connection.query(`SELECT idClient, Name, Email, IdentificationCard FROM clients;`,
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

app.post("/createClient", function (req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const idenCard = req.body.idenCard;

    connection.query(`INSERT INTO banks (Name, Email, IdentificationCard) VALUES  ('${name}', '${email}', '${idenCard}')`,
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


    connection.query(`UPDATE banks SET Name = '${name}', Email = '${email}', IdentificationCard = '${idenCard}'  WHERE idClient = ${idClient}`,
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
    const idClient = req.body.idClient;


    connection.query(`DELETE FROM Banks WHERE idBank = ${idClient}`,
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
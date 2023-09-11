const app = require("express").Router();
const { response } = require("express");
const connection = require("../mysql");

app.post("/login", function (req, res) {
    const password = req.body.password,
        user = req.body.user;
    connection.query(`SELECT idUser, Name FROM users WHERE Email = ${user} AND Password = ${password};`,
        function (err, result) {
            console.log(result);
            if (err) {
                res.json(err);
                throw error;
            }

            res.json(result);
        }
    );
});

app.post("/evalEmail", function (req, res) {
    const email = req.body.email;
console.log(req);
    connection.query(`SELECT  idUser FROM users WHERE Email = ${user};`,
        function (err, result) {
            console.log(result);
            if (err) {
                res.json(err);
                throw error;
            }

            res.json(result);
        }
    );
});

app.post("/evalMatrix", function (req, res) {
    const idUser = req.body.idUser,
        cord1 = req.body.cord1,
        cord2 = req.body.cord2,
        cord3 = req.body.cord3;

    connection.query(`SELECT  Matrix FROM users WHERE idUser = ${idUser};`,
        function (err, result) {
            console.log(result);
            if (err) {
                res.json(err);
                throw error;
            }
            else{
                
            }
            
        }
    );
});


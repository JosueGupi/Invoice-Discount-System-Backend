const app = require("express").Router();
const { response } = require("express");
const connection = require("../mysql");

app.post("/login", function (req, res) {
    const password = req.body.password,
        user = req.body.user;
    connection.query(`SELECT idUser, Name FROM users WHERE Email = '${user}' AND Password = '${password}';`,
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
    connection.query(`SELECT  idUser, Name FROM users WHERE Email = '${email}';`,
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
        cord3 = req.body.cord3,
        cord1Showed = req.body.cord1Showed,
        cord2Showed = req.body.cord2Showed,
        cord3Showed = req.body.cord3Showed;

    connection.query(`SELECT  Matrix FROM usersmatrix WHERE idUser = ${idUser};`,
        function (err, result) {
            console.log(result);
            if (err) {
                res.json(err);
                throw error;
            }
            else{
                const matrix = result[0];
                console.log(matrix[cord1Showed[0]][cord1Showed[1]],"FIRST CORD");
                if(matrix[cord1Showed[0]][cord1Showed[1]] === cord1 && matrix[cord2Showed[0]][cord2Showed[1]] === cord2 
                    && matrix[cord3Showed[0]][cord3Showed[1]] === cord3){
                        res.json(0)
                    }
                else{
                    res.json(1)
                }
                
            }
            
        }
    );
});

module.exports = app;
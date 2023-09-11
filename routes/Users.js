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
        cord1 = Number(req.body.cord1),
        cord2 = Number(req.body.cord2),
        cord3 = Number(req.body.cord3),
        cord1Showed = req.body.cord1Showed,
        cord2Showed = req.body.cord2Showed,
        cord3Showed = req.body.cord3Showed;

    connection.query(`SELECT  Matrix FROM usersmatrix WHERE idUser = ${idUser};`,
        function (err, result) {
            
            if (err) {
                res.json(err);
                throw error;
            }
            else{
                const matrix = result[0].Matrix;
                
                if(matrix[cord1Showed[0]][cord1Showed[1]-1] === cord1 && matrix[cord2Showed[0]][cord2Showed[1]-1] === cord2 
                    && matrix[cord3Showed[0]][cord3Showed[1]-1] === cord3){
                        res.json(0)
                    }
                else{
                    res.json(1)
                }
                
            }
            
        }
    );
});
/*
app.get("/test" ,function (req, res) {
    const idUser = 1,
        cord1 = 1,
        cord2 = 2,
        cord3 = 3,
        cord1Showed = 'A1',
        cord2Showed = 'B2',
        cord3Showed = 'A3';

    connection.query(`SELECT  Matrix FROM usersmatrix WHERE idUser = ${idUser};`,
        function (err, result) {
            
            if (err) {
                res.json(err);
                throw error;
            }
            else{
                const matrix = result[0].Matrix;
                console.log(matrix,'Matrix');
                console.log(matrix[cord1Showed[0]][cord1Showed[1]-1],"FIRST");
                console.log(matrix[cord2Showed[0]][cord2Showed[1]-1],"SECOND");
                console.log(matrix[cord3Showed[0]][cord3Showed[1]-1],"THIRD");
                console.log()
                if(matrix[cord1Showed[0]][cord1Showed[1]-1] === cord1 && matrix[cord2Showed[0]][cord2Showed[1]-1] === cord2 
                    && matrix[cord3Showed[0]][cord3Showed[1]-1] === cord3){
                        res.json(0)
                    }
                else{
                    res.json(1)
                }
                
            }
            
        }
    );
});*/

module.exports = app;
const app = require("express").Router();
const { response } = require("express");
const connection = require("../mysql");

app.post("/login", function (req, res) {
    const password = req.body.password,
        email = req.body.email;
    connection.query(`SELECT idUser, Name FROM users WHERE Email = '${email}' AND Password = '${password}';`,
        function (err, result) {
            
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
            else {
                const matrix = result[0].Matrix;

                if (matrix[cord1Showed[0]][cord1Showed[1] - 1] === cord1 && matrix[cord2Showed[0]][cord2Showed[1] - 1] === cord2
                    && matrix[cord3Showed[0]][cord3Showed[1] - 1] === cord3) {
                    res.json(0)
                }
                else {
                    res.json(1)
                }

            }

        }
    );
});
app.post("/changePassword", function (req, res) {
    const idUser = req.body.idUser,
        password = req.body.password

    connection.query(`UPDATE users SET Password = '${password}' WHERE idUser = ${idUser};`,
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
app.get("/getUsers", function (req, res) {
    

    connection.query(`SELECT idUser, Name, Email, Password FROM users`,
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
app.post("/createUser", function (req, res) {
    const name = req.body.name,
        email = req.body.email,
        password = req.body.password

    connection.query(`INSERT INTO users (Name, Email, Password) VALUES  ('${name}', '${email}', '${password}')`,
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
app.post("/updateUser", function (req, res) {
    const name = req.body.name,
        email = req.body.email,
        idUser = req.body.idUser;
        

    connection.query(`UPDATE users SET Name = '${name}', Email = '${email} WHERE idUser = ${idUser}`,
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

app.delete("/deleteUser", function (req, res) {
    const idUser = req.body.idUser;
        

    connection.query(`DELETE FROM users WHERE idUser = '${idUser}'`,
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
const app = require("express").Router();
const { response } = require("express");
const connection = require("../mysql");
// refreshing
app.get("/getLastNumberOP", function (req, res) {
    connection.query(`CALL SP_GetLastNumberOP();`,
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


app.post("/createOperation", function (req, res) {
    const idClient = Number(req.body.idClient),//
        subTotal = Number(req.body.subTotal),//
        total = Number(req.body.total),//
        comission = Number(req.body.comission),//
        term = Number(req.body.term),//
        retention = Number(req.body.retention),//
        fee = Number(req.body.fee),//
        interest = Number(req.body.interest),//
        dollars = req.body.dollars,//
        transferCost = Number(req.body.transferCost),//
        opCode = Number(req.body.opCode),//
        comissionCode = Number(req.body.comissionCode),//
        legalExpenseCode = Number(req.body.legalExpenseCode),//
        transferCode = Number(req.body.transferCode),//
        retentionCode = Number(req.body.retentionCode),//
        invoices = req.body.invoices,//
        reductions = req.body.reductions,//
        honoraries = Number(req.body.honoraries),//
        realInterestCode = Number(req.body.realInterestCode),//
        deferredInterestCode = Number(req.body.deferredInterestCode);//
    let date = new Date();
    //date = date.toLocaleString("es-US", {timeZone: "America/Costa_Rica"});

    const queryStrin = `CALL SP_InsertOperation(${idClient}, ${subTotal}, ${total}, ${comission}, ${term}, ${retention}, ${fee}, ${interest}, ${dollars}, ${transferCost}, ${opCode}, ${honoraries},${comissionCode},${legalExpenseCode},${transferCode},${retentionCode},${realInterestCode},${deferredInterestCode},'${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}');`
    connection.query(queryStrin,
        function (err, result) {

            if (err) {
                res.json(err);
                throw err;
            }
            else {
                const insertedId = result.insertId;
                for (let i = 0; i < invoices.length; i++) {
                    let invoiceNumber = Number(invoices[i].number),
                        amount = Number(invoices[i].amount),
                        date = invoices[i].date,
                        payer = invoices[i].payer;

                    let queryInvoices = `CALL SP_InsertInvoice(${insertedId}, ${invoiceNumber}, '${payer}', '${date}', ${amount}); `
                    connection.query(queryInvoices,
                        function (err, result) {

                            if (err) {
                                res.json(err);
                                throw err;
                            }
                        })
                }

                for (let i = 0; i < reductions.length; i++) {
                    let reductionNumber = Number(reductions[i].number),
                        amount = Number(reductions[i].amount),
                        description = reductions[i].description,
                        code = reductions[i].code;

                    let queryReductions = `CALL SP_InsertReductions(${insertedId}, ${reductionNumber}, '${code}', ${amount}, '${description}');
                    `
                    connection.query(queryReductions,
                        function (err, result) {

                            if (err) {
                                res.json(err);
                                throw err;
                            }
                        })
                }


                res.json(result[0]);
            }
        }
    );
});


app.get("/getOperations", function (req, res) {
    connection.query(`CALL SP_GetOperations();`,
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

app.get("/calendarOperations", function (req, res) {
    connection.query(`CALL SP_GetCalendarOperations();`,
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

app.post("/operationDetail", function (req, res) {
    const idOperation = req.body.idOperation;
    connection.query(`CALL SP_GetOperationDetail(${idOperation});`,
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
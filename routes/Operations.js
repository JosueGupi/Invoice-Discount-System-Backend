const app = require("express").Router();
const { response } = require("express");
const connection = require("../mysql");
// refreshing
app.get("/getLastNumberOP", function (req, res) {
    connection.query(`SELECT MAX(idOperation) +1 FROM operations;`,
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
        
        

        
    const queryStrin = `INSERT INTO operations (idClient, SubTotal, Total, Commision, Term, Retention, Fee, Interest, Dollar, TransferCost, idAccountingCodeDeposit, Balance, Honoraries, idAccountingCodeComission, idAccountingCodeLegalExpense, idAccountingCodeTransfer, idAccountingCodeRetention, idAccountingCodeRealInterest, idAccountingCodeDeferredInterest) `+
    `VALUES (${idClient}, ${subTotal}, ${total}, ${comission}, ${term}, ${retention}, ${fee}, ${interest}, ${dollars}, ${transferCost}, ${opCode}, ${total}, ${honoraries},${comissionCode},${legalExpenseCode},${transferCode},${retentionCode},${realInterestCode},${deferredInterestCode});`
    console.log(queryStrin)
    connection.query(queryStrin,
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

module.exports = app;
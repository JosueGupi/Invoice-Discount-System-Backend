const cors = require('cors')
const express = require("express")
const app = express()
const Users = require('./routes/Users')
const Accounts = require('./routes/Accounts')
const Banks = require('./routes/Banks')
const Clients = require('./routes/Clients')
const Codes = require('./routes/Codes')
const Operations = require('./routes/Operations')
const Email = require('./routes/Email')
const Charts = require('./routes/Charts')
const Tables = require('./routes/Tables')

app.use(express.json())
app.use(cors())

app.use('/users', Users)
app.use('/accounts', Accounts)
app.use('/banks', Banks)
app.use('/clients', Clients)
app.use('/codes', Codes)
app.use('/operations', Operations)
app.use('/email', Email)
app.use('/charts', Charts)
app.use('/tables', Tables)

app.listen(process.env.PORT || 3001, () => {
    console.log('Servers Run')
});
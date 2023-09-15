const cors = require('cors')
const express = require("express")
const app = express()
const Users = require('./routes/Users')
const Accounts = require('./routes/Accounts')
app.use(express.json())
app.use(cors())

app.use('/users',Users)
app.use('/accounts',Accounts)


app.listen(process.env.PORT || 3001,()=>{
    console.log('Servers Run')
});
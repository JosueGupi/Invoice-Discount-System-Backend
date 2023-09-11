const cors = require('cors')
const express = require("express")
const app = express()
const Users = require('./routes/Users')
app.use(express.json())
app.use(cors())

app.use('/users',Users)


app.listen(process.env.PORT || 3001,()=>{
    console.log('Servers Run')
});
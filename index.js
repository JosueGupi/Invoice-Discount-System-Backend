const cors = require('cors')
const express = require("express")
const app = express()

app.use(express.json())
app.use(cors())

app.listen(process.env.PORT || 3001,()=>{
    console.log('Servers Run')
});
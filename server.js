const express = require('express')
const path = require('path')
const app = express()
const fs = require('fs');
const mailsDate = require('./mailsData');
var cors = require('cors')

app.use(cors())
//app.use(express.static(path.join(__dirname, 'build')))
const port = process.env.PORT || 8000
app.get('/getMails', (req, res) => {
    return res.send(mailsDate.testData)
})
app.put('/markRead/:id', (req, res) => {
    //Backend to update
    return res.status(201).send("success");
})
app.listen(port, ()=>{console.log("server is running on port:", port)})
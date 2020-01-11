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
  return res.send(mailsDate.mailsData)
})

app.listen(port, ()=>{console.log("server is running on port:", port)})
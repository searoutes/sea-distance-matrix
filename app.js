const express = require('express')
const port = 3000;

require('./config')

const route = require('./route')
const app = express()

app.use(route)
app.listen(port, () => console.log("Listening on "+ port))
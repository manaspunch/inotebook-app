const connectToMongo = require('./db-connect');
const express = require('express')
connectToMongo();

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello Manas!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
const connectToMongo = require('./db-connect');
const cors = require('cors')
const express = require('express')
connectToMongo();

const app = express()
const port = 5000
app.use(cors())
app.use(express.json());

// Available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
    console.log(`iNotebook backend listening at http://localhost:${port}`)
})
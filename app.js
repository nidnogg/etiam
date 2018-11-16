const express  = require('express')
const app = express()
const port = 3000

console.log("Starting node test server")

// Home routes
app.get('/', (req, res) => res.sendFile(__dirname + "/public/index.html"))
app.get('/home', (req, res) => res.sendFile(__dirname + "/public/index.html"))


app.listen(port, () => console.log(`Listening on port ${port}`))

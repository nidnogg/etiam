const mysql = require('mysql')
const express  = require('express')

const app = express()
const port = 3000

const conn = mysql.createConnection({
    host: "bdgiseli.cmr2oig5ij0x.sa-east-1.rds.amazonaws.com",
    user: "giselao",
    password: "giselaobd489-db"
});

conn.connect(function(err) { 
    if(err) throw err;
    console.log("Conectou ao banco");
});

console.log("Starting node test server")

app.use(express.static(__dirname + '/public'));

// Home routes
app.get('/', (req, res) => res.sendFile(__dirname + "/public/index.html"))
app.get('/home', (req, res) => res.sendFile(__dirname + "/public/index.html"))


app.listen(port, () => console.log(`Listening on port ${port}`))

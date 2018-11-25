const mysql = require('mysql')
const express  = require('express')

const app = express()
const port = 3000
const ejs = require('ejs')

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

app.use(express.static(__dirname + '/public/views/pages/'));
app.use('/assets', express.static(__dirname + '/public'));
//ejs view engine
app.set('view engine', 'ejs')

// Home routes

app.get('/', (req, res) => res.render( __dirname + '/public/views/pages/index.ejs'));
app.get('/home', (req, res) => res.render(__dirname + 'public/views/pages/index.ejs'));



app.listen(port, () => console.log(`Listening on port ${port}`))

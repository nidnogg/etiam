const express  = require('express');
const ejs = require('ejs');
const mysql = require('mysql');

const app = express();
const port = 3000;


console.log("Servidor app.js online");



const conn = mysql.createConnection({
    host: "bdgiseli.cmr2oig5ij0x.sa-east-1.rds.amazonaws.com",
    user: "giselao",
    password: "giselaobd489-db"
});

conn.connect(function(err) {
    if(err) throw err;
    console.log("Conectou ao banco");
});

function sql_query(qry, callback) {
    conn.query(qry, function(err,rows) {
        if (err) return callback(err);
        return callback(null,rows);
    });
}

// setando banco a ser usado
sql_query('USE BDGISELI', (err => {
    if(err) throw err;
    console.log('Usando BDGISELI\n');
}));


// Consultas
let obj = {};
let astronautas_por_estado = 'SELECT State, COUNT(Name) AS Quantity FROM Facilities GROUP BY (State)';

app.use(express.static(__dirname + '/public/views/pages/'));
app.use('/assets', express.static(__dirname + '/public'));

// ejs view engine
app.set('view engine', 'ejs');;
// routes
 
 app.get('/', function(req, res){
    sql_query(astronautas_por_estado, function(err, rows) {
        if(err){
            throw err;
        }else{
            console.log('Dados recebidos do Banco:\n');
            console.log(rows);
            obj = {data: rows};
            res.render( __dirname + '/public/views/pages/index.ejs',obj);          
        }
    });

});

app.get('/home', (req, res) => res.render(__dirname + '/public/views/pages/index.ejs'));


app.listen(port, () => console.log(`Listening on port ${port}`));

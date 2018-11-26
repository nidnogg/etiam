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

// Consulta setando banco a ser usado
sql_query('USE BDGISELI', (err => {
    if(err) throw err;
    console.log('Usando BDGISELI\n');
}));

// Consultas principais 
let obj = {};
const astr_qtd_por_ano_por_genero  = 'SELECT Year, Male, Female FROM FemaleAstronauts NATURAL JOIN MaleAstronauts';

const astr_mulheres = 'SELECT * FROM Astronaut WHERE Gender NOT IN (\'Male\')';

const astr_morte_por_missao_por_genero = 'SELECT DeathMissionFemale.MissionName, DeathMissionFemale.Count AS Female, DeathMissionMale.Count AS Male\
                                          FROM DeathMissionFemale INNER JOIN DeathMissionMale \
                                          ON DeathMissionFemale.MissionName = DeathMissionMale.MissionName';
                                        
const astr_morte_por_causa = 'SELECT Cause, COUNT(Cause) AS Quantity FROM Death GROUP BY (Cause) ORDER BY (Cause) DESC';

const astr_morte_por_causa_por_missao = 'SELECT Description, AstronautName, Cause \
                                         FROM  AstronautDeathMission INNER JOIN Death \
                                         ON DeathID = ID INNER JOIN Mission \
                                         ON MissionName = Mission.Name';
                                  
const astr_morte_por_ano = 'SELECT Year, COUNT(Year) AS Deaths \
                            FROM (SELECT SUBSTRING_INDEX(SUBSTRING_INDEX(DeathDate, \'/\', 1), \'/\', -1) \
                            AS Month,\
                            IF(  length(DeathDate) - length(replace(DeathDate, \'/\', \'\'))>1,\
                            SUBSTRING_INDEX(SUBSTRING_INDEX(DeathDate, \'/\', 2), \'/\', -1) ,NULL) AS Day,\
                            SUBSTRING_INDEX(SUBSTRING_INDEX(DeathDate, \'/\', 3), \'/\', -1) AS Year\
                            FROM Death ORDER B Year';

const eclipses_norte = 'SELECT * FROM SolarEclipse NATURAL JOIN (\
                        SELECT CatalogNumber FROM SolarEclipse \
                        WHERE Latitude LIKE \'%N%\') AS ecl_norte';

const facilities_por_estado = 'SELECT State, COUNT(Name) AS Quantity FROM Facilities GROUP BY (State)';

const walks_minutos = 'SELECT Name, COUNT(Duration) AS Quantity \
                       FROM (SELECT Name, SpaceWalkID \
                       FROM Astronaut LEFT OUTER JOIN AstronautDoSpaceWalk \
                       ON Astronaut.Name = AstronautDoSpaceWalk.AstronautName) \
                       AS ASW LEFT OUTER JOIN SpaceWalk ON SpaceWalk.ID = ASW.SpaceWalkID \
                       GROUP BY (Name) ORDER BY (Quantity) DESC';

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




// Consultas para views just in case (deletar assim que as queries respectivas estiverem funcionais)


/*
const astr_view_qtd_por_ano_por_genero = 'CREATE VIEW FemaleAstronauts AS \
                                          SELECT Astronaut.Year, COUNT(Astronaut.Gender) AS Female \
                                          FROM Astronaut WHERE Astronaut.Gender = "Female" GROUP BY (Year)';

const astr_view_morte_por_missao_por_genero_1 = 'CREATE VIEW DeathAstronautDeathMission AS \
                                                 SELECT * FROM Death INNER JOIN AstronautDeathMission \
                                                 ON Death.ID = AstronautDeathMission.DeathID';

const astr_view_morte_por_missao_por_genero_2 = 'CREATE VIEW DeathMissionMale AS \
                                                 SELECT Astronaut.Gender, DeathAstronautDeathMission.MissionName, \
                                                 COUNT(DeathAstronautDeathMission.DeathDate) AS Count\
                                                 FROM DeathAstronautDeathMission INNER JOIN Astronaut\
                                                 ON Astronaut.Name = DeathAstronautDeathMission.AstronautName \
                                                 WHERE Astronaut.Gender = "Male" GROUP BY (DeathAstronautDeathMission.MissionName)';

const astr_view_morte_por_missao_por_genero_3 = 'CREATE VIEW DeathMissionFemale AS\
                                                 SELECT Astronaut.Gender, DeathAstronautDeathMission.MissionName,\
                                                 COUNT(DeathAstronautDeathMission.DeathDate) AS Count \
                                                 FROM DeathAstronautDeathMission INNER JOIN Astronaut \
                                                 ON Astronaut.Name = DeathAstronautDeathMission.AstronautName \
                                                 WHERE Astronaut.Gender = "Female" GROUP BY (DeathAstronautDeathMission.MissionName)';

sql_query(astr_view_qtd_por_ano_por_genero, (err => {
    if(err) throw err;
    console.log('View astr_qtd_por_ano_por_genero criada com êxito\n');
}));

sql_query(astr_view_morte_por_missao_por_genero_1, (err => {
    if(err) throw err;
    console.log('View astr_view_morte_por_missao_por_genero_1 criada com êxito\n');
}));

sql_query(astr_view_morte_por_missao_por_genero_1, (err => {
    if(err) throw err;
    console.log('View astr_view_morte_por_missao_por_genero_2 criada com êxito\n');
}));

sql_query(astr_view_morte_por_missao_por_genero_1, (err => {
    if(err) throw err;
    console.log('View astr_view_morte_por_missao_por_genero_3 criada com êxito\n');
}));
*/
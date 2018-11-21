# GENERO DOS ASTRONAUTAS POR ANO
# GRAFICO

/*
create view FemaleAstronauts as select Astronaut.Year, count(Astronaut.Gender) as Female
from Astronaut
where Astronaut.Gender = "Female"
group by (Year);

create view MaleAstronauts as select Astronaut.Year, count(Astronaut.Gender) as Male
from Astronaut
where Astronaut.Gender = "Male"
group by (Year);

*/

select Year, Male, Female
from FemaleAstronauts natural join MaleAstronauts;
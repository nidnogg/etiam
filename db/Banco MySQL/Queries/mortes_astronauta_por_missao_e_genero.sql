# MORTES ASTRONAUTAS POR MISSAO E GENERO

create view DeathAstronautDeathMission as
select* from Death inner join AstronautDeathMission on Death.ID = AstronautDeathMission.DeathID;

create view DeathMissionMale as
select Astronaut.Gender, DeathAstronautDeathMission.MissionName, count(DeathAstronautDeathMission.DeathDate) as Count
from DeathAstronautDeathMission inner join Astronaut on Astronaut.Name = DeathAstronautDeathMission.AstronautName
where Astronaut.Gender = "Male"
group by(DeathAstronautDeathMission.MissionName);

create view DeathMissionFemale as
select Astronaut.Gender, DeathAstronautDeathMission.MissionName, count(DeathAstronautDeathMission.DeathDate) as Count
from DeathAstronautDeathMission inner join Astronaut on Astronaut.Name = DeathAstronautDeathMission.AstronautName
where Astronaut.Gender = "Female"
group by(DeathAstronautDeathMission.MissionName);

select DeathMissionFemale.MissionName, DeathMissionFemale.Count as Female, DeathMissionMale.Count as Male 
from DeathMissionFemale 
	inner join DeathMissionMale 
	on DeathMissionFemale.MissionName = DeathMissionMale.MissionName;
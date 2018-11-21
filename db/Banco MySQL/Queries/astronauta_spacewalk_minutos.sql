select Name, count(Duration) as Quantity
from (
	select Name, SpaceWalkID
	from Astronaut left outer join AstronautDoSpaceWalk on Astronaut.Name = AstronautDoSpaceWalk.AstronautName) as ASW 
		left outer join SpaceWalk on SpaceWalk.ID = ASW.SpaceWalkID
group by(Name)
order by(Quantity) desc;
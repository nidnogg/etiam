select State, count(Name) as Quantity
from Facilities
group by (State);



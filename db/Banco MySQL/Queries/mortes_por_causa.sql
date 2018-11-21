select Cause, count(Cause) as Quantity
from Death
group by(Cause)
order by(Cause) desc;
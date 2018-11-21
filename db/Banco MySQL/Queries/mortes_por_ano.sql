Select Year, count(Year) as Deaths
from (SELECT
   SUBSTRING_INDEX(SUBSTRING_INDEX(DeathDate, '/', 1), '/', -1) AS Month,
   If(  length(DeathDate) - length(replace(DeathDate, '/', ''))>1,  
       SUBSTRING_INDEX(SUBSTRING_INDEX(DeathDate, '/', 2), '/', -1) ,NULL) 
           as Day,
   SUBSTRING_INDEX(SUBSTRING_INDEX(DeathDate, '/', 3), '/', -1) AS Year
FROM Death
order by Year desc) as SepDates
group by Year 
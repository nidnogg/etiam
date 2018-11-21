SELECT *
FROM SolarEclipse natural join (SELECT CatalogNumber FROM SolarEclipse WHERE Latitude LIKE '%N%') as ecl_norte;

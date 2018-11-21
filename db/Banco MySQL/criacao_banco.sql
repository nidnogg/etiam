CREATE DATABASE `BDGISELI`;
CREATE TABLE LunarEclipse (
    CalendarDate VARCHAR(20),
    DeltaT INT,
    CatalogNumber INT PRIMARY KEY,
    TotalEclipseDuration FLOAT,
    CentralDuration FLOAT,
    EclipseTime FLOAT,
    Latitude VARCHAR(10),
    Longitude VARCHAR(10)
);
CREATE TABLE SolarEclipse (
    CalendarDate VARCHAR(20),
    DeltaT INT,
    CatalogNumber INT PRIMARY KEY,
    TotalEclipseDuration FLOAT,
    CentralDuration FLOAT,
    EclipseTime FLOAT,
    Latitude VARCHAR(10),
    Longitude VARCHAR(10)
);
CREATE TABLE Astronaut (
    BirthDate VARCHAR(20),
    Status VARCHAR(50),
    Year INT,
    Gender VARCHAR(10),
    Name VARCHAR(50) PRIMARY KEY
);
CREATE TABLE Mission (
    Description VARCHAR(256),
    Name VARCHAR(50) PRIMARY KEY,
    StartDate VARCHAR(20)
);
CREATE TABLE Facilities (
    Name VARCHAR(256) PRIMARY KEY,
    URLLink VARCHAR(256),
    Zipcode VARCHAR(20),
    City VARCHAR(64),
    State VARCHAR(64),
    Location VARCHAR(64),
    Center VARCHAR(64),
    Status VARCHAR(64)
);
CREATE TABLE Photograph (
    ID INT PRIMARY KEY,
    Name VARCHAR(256),
    Image BLOB
);
CREATE TABLE UndergraduateMajor (
    Astronaut VARCHAR(50) REFERENCES Astronaut (Name),
    UndergraduateMajor VARCHAR(50)
);
CREATE TABLE SpaceWalk (
    Date VARCHAR(50),
    Duration VARCHAR(5),
    Purpose VARCHAR(256),
    ID INT PRIMARY KEY
);
CREATE TABLE Death (
    Cause VARCHAR(50),
    DeathDate VARCHAR(20),
    ID INT PRIMARY KEY
);
CREATE TABLE Participated (
    MissionName VARCHAR(50) REFERENCES Mission (Name),
    AstronautName VARCHAR(50) REFERENCES Astronaut (Name)
);
CREATE TABLE AstronautDoSpaceWalk (
    AstronautName VARCHAR(50) REFERENCES Astronaut (Name),
    SpaceWalkID INT REFERENCES SpaceWalk (ID)
);
CREATE TABLE AstronautDeathMission (
    MissionName VARCHAR(50) REFERENCES Mission (Name),
    AstronautName VARCHAR(50) REFERENCES Astronaut (Name),
    DeathID INT REFERENCES Death (ID),
    PRIMARY KEY (AstronautName)
);
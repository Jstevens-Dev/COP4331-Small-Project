/*
COP 4331
05/19/2021
Summer 2021

Kavi Chapadia - Front-end
James Stevens - Database
Andres Torres - PM/Database
Musaab - API
Wendy Dominguez - Front-end
*/

CREATE TABLE Users ( 
UserID INT NOT NULL AUTO_INCREMENT, 
DateCreated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
DateLastLoggedIn DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
FirstName VARCHAR(50) NOT NULL DEFAULT '',
LastName VARCHAR(50) NOT NULL DEFAULT '',
UserName VARCHAR(50) NOT NULL DEFAULT '',
Password VARCHAR(50) NOT NULL DEFAULT '', 
PRIMARY KEY (UserID));

INSERT INTO Users (UserID, FirstName, LastName, UserName, Password) VALUES (NULL, "John", "Doe", "JDoe01", "Password");

INSERT INTO Users (UserID, FirstName, LastName, UserName, Password) VALUES (NULL, "Jane", "Doe", "JaneDoe", "Password2");

INSERT INTO Users (UserID, FirstName, LastName, UserName, Password) VALUES (NULL, "Albert", "Einstein", "AEinstien", "Password3");

INSERT INTO Users (UserID, FirstName, LastName, UserName, Password) VALUES (NULL, "Carl", "Sagan", "CSagan", "Password4");

INSERT INTO Users (UserID, FirstName, LastName, UserName, Password) VALUES (NULL, "Katie", "Bouman", "KBouman", "Password5");

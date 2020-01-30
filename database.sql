DROP DATABASE Bragsheet;

CREATE DATABASE Bragsheet;

USE Bragsheet;

CREATE TABLE Roles (
    id int UNIQUE NOT NULL AUTO_INCREMENT,
    role varchar(255) UNIQUE NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE Accounts (
    id int UNIQUE NOT NULL AUTO_INCREMENT,
    email varchar(255) UNIQUE NOT NULL,
    password varchar(255) NOT NULL,
    role int NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (role) REFERENCES Roles(id)
);

CREATE TABLE Temp_Accounts (
    id int UNIQUE NOT NULL AUTO_INCREMENT,
    email varchar(255) UNIQUE NOT NULL,
    password varchar(255) NOT NULL,
    role int NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (role) REFERENCES Roles(id)
);

CREATE TABLE Schools (
    id int UNIQUE NOT NULL AUTO_INCREMENT,
    school varchar(255) UNIQUE NOT NULL
);

CREATE TABLE Students (
    id int UNIQUE NOT NULL AUTO_INCREMENT,
    school int NOT NULL,
    osis bigint UNIQUE NOT NULL,
    account int UNIQUE NOT NULL,
    grade int NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (account) REFERENCES Accounts(id),
    FOREIGN KEY (school) REFERENCES Schools(id)
);

INSERT INTO Roles (role)
VALUES
('Student'),
('Admin');

INSERT INTO Schools (school)
VALUES
('Academy of Innovative Technology'),
('The Brooklyn Lab School'),
('Cypress Hills Collegiate Prep'),
('The Urban Assembly School for Collaborative Healthcare'),
('Multicultural High School'),
('Uncommon Leadership Charter High School');
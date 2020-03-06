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
    verified boolean NOT NULL DEFAULT FALSE,
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
    first_name varchar(255) NOT NUll,
    last_name varchar(255) NOT NULL,
    school int NOT NULL,
    osis bigint UNIQUE NOT NULL,
    account int UNIQUE NOT NULL,
    grade int NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (account) REFERENCES Accounts(id),
    FOREIGN KEY (school) REFERENCES Schools(id)
);

CREATE TABLE VerifyCodes (
    id int UNIQUE NOT NULL AUTO_INCREMENT,
    account int UNIQUE NOT NULL,
    code int NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (account) REFERENCES Accounts(id)
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
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
    role int,
    PRIMARY KEY (id),
    FOREIGN KEY (role) REFERENCES Roles(id)
);

CREATE TABLE Students (
    id int UNIQUE NOT NULL AUTO_INCREMENT,
    osis bigint UNIQUE NOT NULL,
    account int UNIQUE NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (account) REFERENCES Accounts(id)
);
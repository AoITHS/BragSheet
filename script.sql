DROP DATABASE ssc;

CREATE DATABASE ssc;

USE ssc;

CREATE TABLE IF NOT EXISTS `accounts` (
    `ID` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(64) UNIQUE NOT NULL,
    `password` VARCHAR(256) NOT NULL
);

CREATE TABLE IF NOT EXISTS `profiles` (
    `ID` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `first` VARCHAR(64) NOT NULL,
    `last` VARCHAR(64) NOT NULL,
    `OSIS` INT NOT NULL,
    `account_id` INT NOT NULL,

    FOREIGN KEY(account_id) REFERENCES accounts(ID)
);

CREATE TABLE IF NOT EXISTS `roles` (
    `ID` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `type` VARCHAR(64) NOT NULL
);


INSERT INTO `roles` VALUES  (0, "Administrator"),
                            (0, "Counsler"), 
                            (0, "Teacher"), 
                            (0, "Student"), 
                            (0, "Guest");

CREATE TABLE IF NOT EXISTS 'account_role' (
    `ID` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `account_id` INT NOT NULL,
    `role_id` INT NOT NULL,

    FOREIGN KEY(account_id) REFERENCES accounts(ID),
    FOREIGN KEY(role_id) REFERENCES role(ID)
);
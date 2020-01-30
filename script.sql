DROP DATABASE ssc;

CREATE DATABASE ssc;

USE ssc;

CREATE TABLE IF NOT EXISTS accounts (
    'ID' INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    'email' VARCHAR(64) UNIQUE NOT NULL,
    'password' VARCHAR(256) NOT NULL
);

CREATE TABLE IF NOT EXISTS profiles (
    'ID' INT NOT NULL AUTO_INCREMENT PRIMARY KEY,,
    'first' VARCHAR(64) NOT NULL,
    'last' VARCHAR(64) NOT NULL,
    'OSIS' INT NOT NULL,

    'account_id' INT NOT NULL,

    FOREGIN KEY(account_id) REFERENCES accounts(ID)
);
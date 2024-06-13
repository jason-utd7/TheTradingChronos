CREATE DATABASE trading_bot;
USE trading_bot;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email CHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    salt VARCHAR(255) NOT NULL
);

Insert into users (id, email, password, salt)
values(1, admin1@email.com, 4532lol, lol);
DROP TABLE IF EXISTS scores;

CREATE TABLE scores (
    id serial PRIMARY KEY,
    username varchar(30) NOT NULL UNIQUE,
    genre varchar(100) NOT NULL,
    score INT DEFAULT 0
);
DROP DATABASE IF EXISTS cooking_time;
CREATE DATABASE cooking_time;
\connect cooking_time;

DROP TABLE IF EXISTS recipes;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
  id serial PRIMARY KEY,
  user_name varchar(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS recipes (
  id serial PRIMARY KEY,
  recipe_name varchar(100) NOT NULL,
  user_id serial REFERENCES users(id),
  ingredients text NOT NULL,
  directions text NOT NULL,
  serving_size int DEFAULT 2,
  cooking_time int DEFAULT 30,
  images text[]
);

CREATE TABLE IF NOT EXISTS reviews (
  id serial PRIMARY KEY,
  review_text text NOT NULL,
  user_id serial REFERENCES users(id),
  recipe_id serial REFERENCES recipes(id)
);

INSERT INTO users (user_name) VALUES ('Anonymous');
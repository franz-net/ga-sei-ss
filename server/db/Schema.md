drop table if exists court;
drop table if exists reservation;
drop table if exists user;

CREATE TABLE users (
id SERIAL PRIMARY KEY NOT NULL,
name VARCHAR(50) UNIQUE NOT NULL,
email TEXT UNIQUE NOT NULL,
password TEXT NOT NULL,
lastName VARCHAR(50) DEFAULT 'Doe',
role varchar(30) DEFAULT 'user',
created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE court (
id SERIAL PRIMARY KEY,
courtName TEXT NOT NULL,
courtType TEXT NOT NULL,
inService INTEGER NOT NULL,
createdBy TIMESTAMP,
status boolean default FALSE,
user_id INTEGER REFERENCES users(id)
);


DROP DATABASE if exists todos_db;

create DATABASE todos_db;
\c todos_db

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    fullname varchar(255) NOT NULL,
    name varchar(255) NOT NULL,
    email varchar(255) NOT NULL UNIQUE,
    image varchar(255)
);

CREATE TABLE tasks(
    id SERIAL PRIMARY KEY,
    user_id SERIAL NOT NULL,
    title VARCHAR (255) NOT NULL,
    description VARCHAR(512),
    -- status ENUM("COMPLETED", "PENDING") NOT NULL,
    completed BOOLEAN not NULL DEFAULT false,
    due_date TIMESTAMP NOT NULL,
    FOREIGN key (user_id) REFERENCES users(id)
    on update CASCADE
    on delete CASCADE

);

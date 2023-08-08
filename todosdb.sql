
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

-- INSERT INTO users (fullname, name, email, image)
-- VALUES
--     ('Juan Pérez', 'juanperez', 'juanperez@example.com', 'imagen1.jpg'),
--     ('María López', 'marialopez', 'marialopez@example.com', 'imagen2.jpg'),
--     ('Pedro Gómez', 'pedrogomez', 'pedrogomez@example.com', 'imagen3.jpg');
-- INSERT INTO tasks (user_id, title, description, completed, due_date)
-- VALUES
--     (1, 'Terminar informe', 'Redactar y revisar informe mensual', false, '2023-08-10 12:00:00'),
--     (2, 'Comprar víveres', 'Hacer la lista de compras y visitar el supermercado', false, '2023-08-15 15:30:00'),
--     (3, 'Preparar presentación', 'Preparar diapositivas para reunión de ventas', true, '2023-08-20 09:00:00');

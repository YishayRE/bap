CREATE TABLE IF NOT EXISTS Usuario (
    id INT(10) NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
    email varchar(50) UNIQUE NOT NULL,
    password varchar(50) NOT NULL,
    nombre varchar(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS Tarea (
    id INT(10) NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
    titulo varchar(50) NOT NULL,
    descripcion varchar(200) NOT NULL,
    estatusComplecion BOOLEAN NOT NULL DEFAULT false,
    fechaEntrega TIMESTAMP NOT NULL,
    responsable INT(10),
    usuarioId INTEGER NOT NULL,
    FOREIGN KEY(usuarioId)
        REFERENCES `Usuario` (`id`) ON UPDATE RESTRICT ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Tag (
    id INT(10) NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
    tag varchar(50) NOT NULL,
    tareaId INTEGER NOT NULL,
    FOREIGN KEY(tareaId) REFERENCES `Tarea` (`id`) ON UPDATE RESTRICT ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Comentario (
    id INT(10) NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
    comentario varchar(200) NOT NULL,
    fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    usuarioId INTEGER NOT NULL,
    tareaId INTEGER NOT NULL,
    FOREIGN KEY(usuarioId) REFERENCES `Usuario` (`id`) ON UPDATE RESTRICT ON DELETE CASCADE,
    FOREIGN KEY(tareaId) REFERENCES `Tarea` (`id`) ON UPDATE RESTRICT ON DELETE CASCADE
);
--No es necesario que se ejecute este archivo, ya que se ejecuta desde el archivo de config.js
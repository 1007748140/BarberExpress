DROP DATABASE IF EXISTS BarberExpress;
CREATE DATABASE BarberExpress;
USE BarberExpress;

CREATE TABLE gente (
  id INT (20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  nombre VARCHAR(50) NOT NULL,
  apellido VARCHAR(50) NOT NULL
);

CREATE TABLE rol(
  id INT (20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  nombre VARCHAR(100) NOT NULL
);

-- Inserción de datos por defecto para la tabla rol
INSERT INTO rol (id, nombre) VALUES
(1, 'cliente'),
(2, 'Barbero');

CREATE TABLE pais(
  id INT (20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  nombre VARCHAR(255) NOT NULL
);

-- Inserción de datos por defecto para la tabla pais
INSERT INTO pais (nombre) VALUES ('Colombia');

CREATE TABLE departamentos (
  id INT (20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  id_pais INT (20) NOT NULL,
  FOREIGN KEY (id_pais) REFERENCES pais(id) ON DELETE CASCADE
);


CREATE TABLE ubicacion_gente (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  id_gente INT(20) NOT NULL,
  id_pais INT(20) NOT NULL,
  id_departamento INT(20) NOT NULL,
  latitud DECIMAL(10, 7) NOT NULL,
  longitud DECIMAL(10, 7) NOT NULL,
  FOREIGN KEY (id_gente) REFERENCES gente(id) ON DELETE CASCADE,
  FOREIGN KEY (id_pais) REFERENCES pais(id) ON DELETE CASCADE,
  FOREIGN KEY (id_departamento) REFERENCES departamentos(id) ON DELETE CASCADE
);

CREATE TABLE informacion_gente(
  id INT (20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  id_gente INT(20) NOT NULL,
  id_rol INT(20) NOT NULL,
  id_ubicacion_gente INT(20) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  telefono VARCHAR(10),
  imagen_perfil VARCHAR(255), -- URL de la imagen de perfil
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_gente) REFERENCES gente(id) ON DELETE CASCADE,
  FOREIGN KEY (id_rol) REFERENCES rol(id) ON DELETE CASCADE,
  FOREIGN KEY (id_ubicacion_gente) REFERENCES ubicacion_gente(id) ON DELETE CASCADE
);

CREATE TABLE barberias (
  id INT (20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  id_gente INT (20) NOT NULL,
  id_ubicacion_gente INT (20) NOT NULL,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT NOT NULL,
  FOREIGN KEY (id_gente) REFERENCES gente(id) ON DELETE CASCADE,
  FOREIGN KEY (id_ubicacion_gente) REFERENCES ubicacion_gente(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE horarios (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  id_barberia INT (20) NOT NULL,
  hora_inicio TIME NOT NULL,
  hora_fin TIME NOT NULL,
  dia ENUM('Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo') NOT NULL,
  estado_barberia BOOLEAN NOT NULL DEFAULT 1,  -- 1 = Abierto, 0 = Cerrado
  FOREIGN KEY (id_barberia) REFERENCES barberias(id) ON DELETE CASCADE
);

CREATE TABLE barberos(
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  id_barberia INT(20) NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  foto_perfil VARCHAR(100) NOT NULL,
  estado BOOLEAN DEFAULT 1, -- indica si esta disponible o no el barbero que brinda el servicio.
  FOREIGN KEY (id_barberia) REFERENCES barberias(id) ON DELETE CASCADE
);

CREATE TABLE bancos(
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  nombre ENUM('BANCOLOMBIA', 'NEQUI', 'LULOBANK', 'DAVIDPLATA') NOT NULL -- SOLO ESTOS BANCOS PARA TRANSFERENCIAS
);

CREATE TABLE cuentas_barberos(
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  id_barbero INT(20) NOT NULL,
  id_banco INT(20) NOT NULL,
  num_cuenta VARCHAR(20) NOT NULL,
  FOREIGN KEY (id_barbero) REFERENCES barberos(id)ON DELETE CASCADE,
  FOREIGN KEY (id_banco) REFERENCES bancos(id)ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE servicios (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  id_barberia INT(20) NOT NULL,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT,
  precio DECIMAL(10, 2) NOT NULL,
  duracion TIME NOT NULL,        -- Duración estimada del servicio
  FOREIGN KEY (id_barberia) REFERENCES barberias(id) ON DELETE CASCADE
);

CREATE TABLE productos (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  id_barberia INT(20) NOT NULL,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT,
  precio DECIMAL(10, 2) NOT NULL,
  stock INT(20) NOT NULL,            -- Cantidad de productos en stock
  FOREIGN KEY (id_barberia) REFERENCES barberias(id) ON DELETE CASCADE
);
-- dado que un producto tiene un proveedor, en una futura actualizacion se añadira el rol de proveedor


CREATE TABLE citas (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  id_barberia INT(20) NOT NULL,
  id_gente INT(20) NOT NULL,
  id_servicio INT(20) NOT NULL,
  id_barbero INT (20) NOT NULL,
  fecha DATETIME NOT NULL,
  estado ENUM('pendiente', 'confirmada', 'cancelada', 'completada') DEFAULT 'pendiente',
  FOREIGN KEY (id_barberia) REFERENCES barberias(id) ON DELETE CASCADE,
  FOREIGN KEY (id_gente) REFERENCES gente(id) ON DELETE CASCADE,
  FOREIGN KEY (id_servicio) REFERENCES servicios(id) ON DELETE CASCADE,
  FOREIGN KEY (id_barbero) REFERENCES barberos(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE publicaciones (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  id_barberia INT(20) NOT NULL,
  id_barbero INT(20) NOT NULL,
  titulo VARCHAR(255) NOT NULL,
  contenido TEXT,
  multimedia VARCHAR(255), -- URL de la imagen o video asociada a la publicación
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_barberia) REFERENCES barberias(id) ON DELETE CASCADE,
  FOREIGN KEY (id_barbero) REFERENCES barberos (id) ON DELETE CASCADE
);

-- en una futura actualizacion se añadira la calificacion para barberos, en este caso, la calificacion solo va hacia la barberia

CREATE TABLE resenas (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  id_barberia INT(20) NOT NULL,
  id_gente INT(20) NOT NULL,
  id_cita INT(20) NOT NULL,
  comentario TEXT,
  puntuacion INT(1) NOT NULL, -- Calificación entre 1 y 5
  FOREIGN KEY (id_barberia) REFERENCES barberias(id) ON DELETE CASCADE,
  FOREIGN KEY (id_gente) REFERENCES gente(id) ON DELETE CASCADE,
  FOREIGN KEY (id_cita) REFERENCES citas(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pagos (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  id_cita INT(20) NOT NULL,
  id_gente INT(20) NOT NULL,
  id_barberia INT(20) NOT NULL,
  id_barbero INT(20) NOT NULL,
  monto DECIMAL(10, 2) NOT NULL,
  metodo_pago ENUM('efectivo', 'transferencia') NOT NULL,
  estado ENUM('pendiente', 'pagado') DEFAULT 'pendiente',
  tirilla_pago VARCHAR (255) NOT NULL,
  fecha_pago TIMESTAMP,
  FOREIGN KEY (id_cita) REFERENCES citas(id) ON DELETE CASCADE,
  FOREIGN KEY (id_gente) REFERENCES gente(id) ON DELETE CASCADE,
  FOREIGN KEY (id_barberia) REFERENCES barberias(id) ON DELETE CASCADE,
  FOREIGN KEY (id_barbero) REFERENCES barberos(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

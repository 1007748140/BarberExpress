DROP DATABASE IF EXISTS BarberExpress2;
CREATE DATABASE BarberExpress2;
USE BarberExpress2;

CREATE TABLE countries (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL
);

INSERT INTO countries (name) VALUES ('Colombia');

CREATE TABLE `departments` (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  id_country INT(20) NOT NULL,
  FOREIGN KEY (id_country) REFERENCES countries(id) ON DELETE CASCADE
);

CREATE TABLE `roles` (
id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
`name` varchar(255) NOT NULL
);
INSERT INTO `roles` (`name`) VALUES ('customer'), ('barber');

CREATE TABLE people (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  id_role INT(20),
  foreign key (id_role) references `roles`(id) ON DELETE CASCADE
);

CREATE TABLE users(
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  id_role INT(20) NOT NULL,
  `first_name` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(10) NOT NULL,
  profile_image VARCHAR(255), -- URL of the profile image
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_role) REFERENCES roles(id) ON DELETE CASCADE
);


CREATE TABLE users_location (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  id_user INT(20) NOT NULL,
  id_country INT(20) NOT NULL,
  id_department INT(20) NOT NULL,
  latitude DECIMAL(10, 7) NOT NULL,
  longitude DECIMAL(10, 7) NOT NULL,
  FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (id_country) REFERENCES countries(id) ON DELETE CASCADE,
  FOREIGN KEY (id_department) REFERENCES `departments`(id) ON DELETE CASCADE
);

CREATE TABLE barbershops (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  id_user INT(20) NOT NULL,
  id_location INT(20) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (id_location) REFERENCES users_location(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `schedule` (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  id_barbershop INT(20) NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  `day` VARCHAR(100) NOT NULL,
  shop_status BOOLEAN NOT NULL DEFAULT 1, -- 1 = Open, 0 = Closed
  FOREIGN KEY (id_barbershop) REFERENCES barbershops(id) ON DELETE CASCADE
);
INSERT INTO `schedule` (`day`) VALUES ('Lunes'), ('Martes'), ('Miercoles'), ('Jueves'), ('Viernes'), ('Sabado'), ('Domingo');

-- Tabla para el estado de los barberos
CREATE TABLE barber_status (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `status` VARCHAR(100) NOT NULL

);
INSERT INTO barber_status (`status`) VALUES ('Disponible'), ('Ocupado'), ('En descanso')

-- las barbershops contienen a los barbers. Es una relación de uno a muchos. una barbershop puede tener muchos barbers.
CREATE TABLE barbers (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  id_barbershop INT(20) NOT NULL,
  id_barber_state INT(20) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `last_name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(10) NOT NULL,
  profile_picture VARCHAR(255) NOT NULL,
  FOREIGN KEY (id_barbershop) REFERENCES barbershops(id) ON DELETE CASCADE,
  FOREIGN KEY (id_barber_state) REFERENCES barber_status(id) ON DELETE CASCADE
);

CREATE TABLE services (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  id_barbershop INT(20) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `description` TEXT NOT NULL,
  `price` DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (id_barbershop) REFERENCES barbershops(id) ON DELETE CASCADE
);

CREATE TABLE products (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  id_barbershop INT(20) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `description` TEXT NOT NULL,
  `price` DECIMAL(10, 2) NOT NULL,
  `image` VARCHAR(255) NOT NULL,
  FOREIGN KEY (id_barbershop) REFERENCES barbershops(id) ON DELETE CASCADE
);
-- Tabla de registro de citas
CREATE TABLE appointments (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  id_user INT(20) NOT NULL,
  id_barber INT(20) NOT NULL,
  id_service INT(20) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (id_barber) REFERENCES barbers(id) ON DELETE CASCADE,
  FOREIGN KEY (id_service) REFERENCES services(id) ON DELETE CASCADE
);

-- Tabla para el estado de los pagos
CREATE TABLE payment_status (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `status` VARCHAR(100) NOT NULL
);

-- Insertamos algunos estados comunes
INSERT INTO payment_status (`status`) VALUES ('Pendiente'), ('Completado'), ('Fallido'), ('Reembolsado');

-- Tabla para los pagos de los productos
CREATE TABLE product_payments (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  id_user INT(20) NOT NULL,
  id_product INT(20) NOT NULL,
  id_payment_status INT(20) NOT NULL,
  quantity INT(20) NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (id_product) REFERENCES products(id) ON DELETE CASCADE,
  FOREIGN KEY (id_payment_status) REFERENCES payment_status(id) ON DELETE CASCADE
);

-- Tabla para los pagos de las citas
CREATE TABLE appointment_payments (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  id_user INT(20) NOT NULL,
  id_appointment INT(20) NOT NULL,
  id_payment_status INT(20) NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (id_appointment) REFERENCES appointments(id) ON DELETE CASCADE,
  FOREIGN KEY (id_payment_status) REFERENCES payment_status(id) ON DELETE CASCADE
);

CREATE TABLE posts_classification(
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `name` VARCHAR(255) NOT NULL
);
INSERT INTO publication_classification (`name`) VALUES ('Promociones'), ('Eventos'), ('Noticias'), ('Consejos'), ('Tendencias'), ('Historias'), ('Tutoriales'), ('Entrevistas'), ('productos');
-- tabla para registro de publicaciones
CREATE TABLE posts (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  id_barbershop INT(20) NOT NULL,
  id_barber INT(20) NOT NULL,
  id_classification INT(20) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `content` TEXT NOT NULL,
  `media` VARCHAR(255), -- URL of the image or video related to the post
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_barbershop) REFERENCES barbershops(id) ON DELETE CASCADE,
  FOREIGN KEY (id_barber) REFERENCES barbers(id) ON DELETE CASCADE,
  FOREIGN KEY (id_classification) REFERENCES posts_classification(id) ON DELETE CASCADE
);

-- Tabla para los comentarios de las publicaciones
CREATE TABLE comments (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  id_user INT(20) NOT NULL,
  id_post INT(20) NOT NULL,
  `comment` TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (id_post) REFERENCES posts(id) ON DELETE CASCADE
);


-- Tabla para los reviews de las barberias
CREATE TABLE reviews (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  id_user INT(20) NOT NULL,
  id_barbershop INT(20) NOT NULL,
  `comment` TEXT NOT NULL,
  `rating` INT(1) NOT NULL, -- Rating between 1 and 5
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (id_barbershop) REFERENCES barbershops(id) ON DELETE CASCADE
);

-- Tabla para los reviews de los barberos
CREATE TABLE barber_reviews (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  id_user INT(20) NOT NULL,
  id_barber INT(20) NOT NULL,
  `rating` INT(1) NOT NULL, -- Rating between 1 and 5
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (id_barber) REFERENCES barbers(id) ON DELETE CASCADE
);


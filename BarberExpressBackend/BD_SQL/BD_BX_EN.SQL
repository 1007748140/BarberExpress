DROP DATABASE IF EXISTS BarberExpress11;
CREATE DATABASE BarberExpress11;
USE BarberExpress11;

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
-- el rol 'Administrador' es para los usuarios que registran su barberia. En la parte de la aplicacion se
-- debe validarque si el usuario decide registrarse, se mostrara los roles 'Usuario' y 'Barbero', pero si
-- el usuario decide registrar su barberia, se mostrara el rol 'Administrador' y un formulario para registrar
-- la barberia junto con sus datos.
INSERT INTO `roles` (`name`) VALUES ('Cliente'), ('Barbero'), ('Administrador');

CREATE TABLE users (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL
);

-- Tabla para el estado de los barberos. Si el rol corresponde a 'Barbero'
-- Este debe tener una interfaz diferente, la cual le muestre opciones de barbero
-- y pueda actualizar su estado como barbero.
CREATE TABLE barber_status (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `status` VARCHAR(100) NOT NULL

);
INSERT INTO barber_status (`status`) VALUES ('Disponible'), ('Ocupado'), ('En descanso');


CREATE TABLE people (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  id_user INT(20) NOT NULL,
  id_role INT(20) NOT NULL,
  id_barber_state INT(20) NOT NULL, -- si un usuario es barbero debe tener un estado, pero si una persona tiene rol de cliente, este campo  no se debe mostrar en la interfaz grafica del usuario.
  `first_name` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(10) NOT NULL,
  profile_image VARCHAR(255), -- URL of the profile image
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (id_role) REFERENCES roles(id) ON DELETE CASCADE,
  FOREIGN KEY (id_barber_state) REFERENCES barber_status(id) ON DELETE CASCADE
);

CREATE TABLE people_location (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  id_people INT(20) NOT NULL,
  id_country INT(20) NOT NULL,
  id_department INT(20) NOT NULL,
  latitude DECIMAL(10, 7) NOT NULL,
  longitude DECIMAL(10, 7) NOT NULL,
  FOREIGN KEY (id_people) REFERENCES people(id) ON DELETE CASCADE,
  FOREIGN KEY (id_country) REFERENCES countries(id) ON DELETE CASCADE,
  FOREIGN KEY (id_department) REFERENCES `departments`(id) ON DELETE CASCADE
);


----------- TABLAS RELACIONADAS PARA ESTABLECER EL HORARIO DE LAS BARBERIAS -----------------

CREATE TABLE days_week(
 id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
 `days` VARCHAR(100) NOT NULL
);

INSERT INTO days_week (days) VALUES ('Lunes'), ('Martes'), ('Miercoles'), ('Jueves'), ('Viernes'), ('Sabado'), ('Domingo');

-- la tabla de horas debe tener un campo de tipo TIME, para poder almacenar la hora,
-- la cual sera usada tanto para la hora de inicio como para la hora de fin.
-- se debe insertar las horas y minutos para que la barberia pueda seleccionar la hora de inicio y fin.
CREATE TABLE `hours` (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `hour` VARCHAR(2) ,
  `minutes` VARCHAR(2) ,
  periodo VARCHAR(2)
);

-- inserta en la tabla hours las horas de 1 a 12. NO INSERTAR MINUTOS NI PERIODO, TAMPOCO DEBES INSERTAR DATOS EN ESOS CAMPOS MENCIONADOS.
INSERT INTO `hours` (`hour`)
VALUES
('01'), ('02'), ('03'), ('04'), ('05'), ('06'), ('07'), ('08'), ('09'), ('10'), ('11'), ('12');

INSERT INTO `hours` (`minutes`)
VALUES
('00'), ('01'), ('02'), ('03'), ('04'), ('05'), ('06'), ('07'), ('08'), ('09'), ('10'), ('11'), ('12'),
('13'), ('14'), ('15'), ('16'), ('17'), ('18'), ('19'), ('20'), ('21'), ('22'), ('23'), ('24'),
('25'), ('26'), ('27'), ('28'), ('29'), ('30'), ('31'), ('32'), ('33'), ('34'), ('35'), ('36'),
('37'), ('38'), ('39'), ('40'), ('41'), ('42'), ('43'), ('44'), ('45'), ('46'), ('47'), ('48'),
('49'), ('50'), ('51'), ('52'), ('53'), ('54'), ('55'), ('56'), ('57'), ('58'), ('59');

INSERT INTO `hours` (`periodo`)
VALUES
('AM'),
('PM');



-- Tabla para el horario de la barberia
CREATE TABLE `schedules` (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  id_day INT(20) NOT NULL,
  id_start_hour INT(20) NOT NULL,
  id_end_hour INT(20) NOT NULL,
  FOREIGN KEY (id_day) REFERENCES days_week(id) ON DELETE CASCADE,
  FOREIGN KEY (id_start_hour) REFERENCES `hours`(id) ON DELETE CASCADE,
  FOREIGN KEY (id_end_hour) REFERENCES `hours`(id) ON DELETE CASCADE
);

-- Tabla para el estado de las barberias
CREATE TABLE states_barbershop(
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `name` VARCHAR(255) NOT NULL
);

INSERT INTO states_barbershop (`name`) VALUES ('Abierto'), ('Cerrado'), ('En mantenimiento');


--------------------------- BANK OF SERVICES --------------------------------------

-- Tabla para la clasificacion de servicios de las barberias
CREATE TABLE services_classification(
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `name` VARCHAR(255) NOT NULL
);

INSERT INTO services_classification (`name`) VALUES ('Corte de cabello'), ('Afeitado'), ('Tinte'), ('Peinado'), ('Barba'), ('Manicure'), ('Pedicure'), ('Depilacion');

-- Tabla para el banco de servicios de las barberias
CREATE TABLE bank_services (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  id_classification INT(20) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `description` TEXT NOT NULL,
  `price` DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (id_classification) REFERENCES services_classification(id) ON DELETE CASCADE
);

--------------------------- BANK OF PRODUCTS --------------------------------------

-- Tabla para la clasificacion de productos de las barberias
CREATE TABLE products_classification(
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `name` VARCHAR(255) NOT NULL
);

INSERT INTO products_classification (`name`) VALUES ('Cuidado del cabello'), ('Cuidado de la barba'), ('Cuidado de la piel'), ('Cuidado de las manos'), ('Cuidado de los pies'), ('Cuidado personal'), ('Accesorios');

-- Tabla para el banco de productos de las barberias
CREATE TABLE bank_products (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  id_classification INT(20) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `description` TEXT NOT NULL,
  `price` DECIMAL(10, 2) NOT NULL,
  `image` VARCHAR(255) NOT NULL,
  FOREIGN KEY (id_classification) REFERENCES products_classification(id) ON DELETE CASCADE
);
---------------------------------------------------------------------------------------

-- Tabla parara las barberias.
CREATE TABLE barbershops (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  id_people INT(20) NOT NULL,
  id_location INT(20) NOT NULL,
  id_state_barbershops INT(20) NOT NULL,
  id_shedule INT(20) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  image_banner VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_people) REFERENCES people(id) ON DELETE CASCADE,
  FOREIGN KEY (id_location) REFERENCES people_location(id) ON DELETE CASCADE,
  FOREIGN KEY (id_state_barbershops) REFERENCES states_barbershop(id) ON DELETE CASCADE,
  FOREIGN KEY (id_shedule) REFERENCES schedules(id) ON DELETE CASCADE

);

--------------------------- TIENDA DE LA BARBERIA --------------------------------------

-- Tabla para relacionar las barberias con los productos que se venden en la barberia.
CREATE TABLE barbershop_products (
    id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
    id_barbershop INT(20) NOT NULL,
    id_classification INT(20) NOT NULL,
    id_product INT(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_barbershop) REFERENCES barbershops(id) ON DELETE CASCADE,
    FOREIGN KEY (id_product) REFERENCES bank_products(id) ON DELETE CASCADE,
    FOREIGN KEY (id_classification) REFERENCES products_classification(id) ON DELETE CASCADE
);

--------------------------- SERVICIOS DE LA BARBERIA --------------------------------------

-- Tabla para establecer la duracion de los servicios
CREATE TABLE services_duration (
    id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
    `duration` INT(20) NOT NULL
);

-- Insertamos la duracion de los servicios
INSERT INTO services_duration (`duration`) VALUES (15), (30), (45), (60), (75), (90), (105), (120);




-- Tabla para relacionar las barberias con los servicios que se ofrecen, con su respectivo tiempo de duracion.
CREATE TABLE barbershop_services (
    id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
    id_barbershop INT(20) NOT NULL,
    id_classification INT(20) NOT NULL,
    id_service INT(20) NOT NULL,
    id_duration INT(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_barbershop) REFERENCES barbershops(id) ON DELETE CASCADE,
    FOREIGN KEY (id_service) REFERENCES bank_services(id) ON DELETE CASCADE,
    FOREIGN KEY (id_classification) REFERENCES services_classification(id) ON DELETE CASCADE,
    FOREIGN KEY (id_duration) REFERENCES services_duration(id) ON DELETE CASCADE
);
---------------------------------------------------------------------------------------

-- Tabla para relacionar las barberias con los barberos que trabajan en la barberia.
CREATE TABLE barbershop_barbers (
    id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
    id_barbershop INT(20) NOT NULL,
    id_people INT(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_barbershop) REFERENCES barbershops(id) ON DELETE CASCADE,
    FOREIGN KEY (id_people) REFERENCES people(id) ON DELETE CASCADE
);



--------------------------- REGISTRO DE CITAS Y PAGOS --------------------------------------

-- Tabla para el estado de los pagos
CREATE TABLE payment_status (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `status` VARCHAR(100) NOT NULL
);

-- Insertamos estados de los pagos
INSERT INTO payment_status (`status`) VALUES ('Pendiente'), ('Completado'), ('Fallido'), ('Reembolsado');

-- Tabla para la comicion que cobrare por cada pago de citas
CREATE TABLE commission_value_product(
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `value` DECIMAL(10, 2) NOT NULL
);

-- Tabla para la comicion que cobrare por cada pago de productos
CREATE TABLE commission_value_appointment(
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `value` DECIMAL(10, 2) NOT NULL
);
-- Tabla para los pagos de los productos
CREATE TABLE product_payments (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  id_people INT(20) NOT NULL,
  id_product INT(20) NOT NULL,
  id_payment_status INT(20) NOT NULL,
  quantity INT(20) NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  total_receive_barbershop DECIMAL(10, 2) NOT NULL,
  id_commission_value_product INT(20) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_people) REFERENCES people(id) ON DELETE CASCADE,
  FOREIGN KEY (id_product) REFERENCES barbershop_products(id) ON DELETE CASCADE,
  FOREIGN KEY (id_payment_status) REFERENCES payment_status(id) ON DELETE CASCADE,
  FOREIGN KEY (id_commission_value_product) REFERENCES commission_value_product(id) ON DELETE CASCADE
);

-- Tabla para los pagos de las citas
CREATE TABLE appointment_payments (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  id_people INT(20) NOT NULL,
  id_appointment INT(20) NOT NULL,
  id_payment_status INT(20) NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  total_receive_barbershop DECIMAL(10, 2) NOT NULL,
  id_commission_value_appointment INT(20) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_people) REFERENCES people(id) ON DELETE CASCADE,
  FOREIGN KEY (id_appointment) REFERENCES barbershop_services(id) ON DELETE CASCADE,
  FOREIGN KEY (id_payment_status) REFERENCES payment_status(id) ON DELETE CASCADE,
  FOREIGN KEY (id_commission_value_appointment) REFERENCES commission_value_appointment(id) ON DELETE CASCADE
);

CREATE TABLE posts_classification(
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `name` VARCHAR(255) NOT NULL
);
INSERT INTO posts_classification (`name`) VALUES ('Promociones'), ('Eventos'), ('Noticias'), ('Consejos'), ('Tendencias'), ('Historias'), ('Tutoriales'), ('Entrevistas'), ('productos');
-- tabla para registro de publicaciones
CREATE TABLE posts (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  id_barbershop INT(20) NOT NULL,
  id_people INT(20) NOT NULL,
  id_classification INT(20) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `content` TEXT NOT NULL,
  `media` VARCHAR(255), -- URL of the image or video related to the post
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_barbershop) REFERENCES barbershops(id) ON DELETE CASCADE,
  FOREIGN KEY (id_people) REFERENCES people(id) ON DELETE CASCADE,
  FOREIGN KEY (id_classification) REFERENCES posts_classification(id) ON DELETE CASCADE
);

-- Tabla para los comentarios de las publicaciones
CREATE TABLE comments (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  id_people INT(20) NOT NULL,
  id_post INT(20) NOT NULL,
  `comment` TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_people) REFERENCES people(id) ON DELETE CASCADE,
  FOREIGN KEY (id_post) REFERENCES posts(id) ON DELETE CASCADE
);


-- Tabla para los reviews de las barberias
CREATE TABLE reviews (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  id_people INT(20) NOT NULL,
  id_barbershop INT(20) NOT NULL,
  `comment` TEXT NOT NULL,
  `rating` INT(1) NOT NULL, -- Rating between 1 and 5
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_people) REFERENCES people(id) ON DELETE CASCADE,
  FOREIGN KEY (id_barbershop) REFERENCES barbershops(id) ON DELETE CASCADE
);
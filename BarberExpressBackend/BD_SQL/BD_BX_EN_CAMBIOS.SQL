DROP DATABASE IF EXISTS BarberExpress11;
CREATE DATABASE BarberExpress11;
USE BarberExpress11;

CREATE TABLE countries (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO countries (name) VALUES ('Colombia');

CREATE TABLE `departments` (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  id_country INT(20) NOT NULL,
  FOREIGN KEY (id_country) REFERENCES countries(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO departments (`name`, id_country) VALUES 
('Amazonas', 1), ('Antioquia', 1), ('Arauca', 1), ('Atlántico', 1), 
('Bolívar', 1), ('Boyacá', 1), ('Caldas', 1), ('Caquetá', 1), 
('Casanare', 1), ('Cauca', 1), ('Cesar', 1), ('Chocó', 1), 
('Córdoba', 1), ('Cundinamarca', 1), ('Guainía', 1), 
('Guaviare', 1), ('Huila', 1), ('La Guajira', 1), ('Magdalena', 1), 
('Meta', 1), ('Nariño', 1), ('Norte de Santander', 1), ('Putumayo', 1), 
('Quindío', 1), ('Risaralda', 1), ('San Andrés y Providencia', 1), 
('Santander', 1), ('Sucre', 1), ('Tolima', 1), 
('Valle del Cauca', 1), ('Vaupés', 1), ('Vichada', 1);


CREATE TABLE `roles` (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `name` varchar(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
-- el rol 'Administrador' es para los usuarios que registran su barberia. En la parte de la aplicacion se
-- debe validarque si el usuario decide registrarse, se mostrara los roles 'Usuario' y 'Barbero', pero si
-- el usuario decide registrar su barberia, se mostrara el rol 'Administrador' y un formulario para registrar
-- la barberia junto con sus datos.
INSERT INTO `roles` (`name`) VALUES ('Cliente'), ('Barbero'), ('AdminBarberia');

-- Tabla para el estado de los barberos. Si el rol corresponde a 'Barbero'
-- Este debe tener una interfaz diferente, la cual le muestre opciones de barbero
-- y pueda actualizar su estado.
CREATE TABLE barber_status (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `status` VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

);
INSERT INTO barber_status (`status`) VALUES ('Disponible'), ('Ocupado'), ('En descanso'), ('No aplica');



CREATE TABLE users (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  id_barber_state INT(20) NOT NULL, -- si un usuario es barbero debe tener un estado, pero si un usuario tiene rol de cliente, este campo  no se debe mostrar en la interfaz grafica del usuario.
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  is_email_verified BOOLEAN DEFAULT FALSE,
  verification_token VARCHAR(255) NULL,
  verification_token_expires TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (id_barber_state) REFERENCES barber_status(id) ON DELETE CASCADE
);

CREATE TABLE user_roles (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  id_user INT(20) NOT NULL,
  id_role INT(20) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (id_role) REFERENCES roles(id) ON DELETE CASCADE
);

-- Tabla para almacenar la ubicacion de los usuarios
CREATE TABLE user_location (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  id_user INT(20) NOT NULL,
  id_country INT(20) NOT NULL,
  id_department INT(20) NOT NULL,
  latitude DECIMAL(10, 7) NOT NULL,
  longitude DECIMAL(10, 7) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (id_country) REFERENCES countries(id) ON DELETE CASCADE,
  FOREIGN KEY (id_department) REFERENCES `departments`(id) ON DELETE CASCADE
);

--------------------------- INFORMACION BANCARIA--------------------------------------

-- Tabla 'documents_types' para almacenar los tipos de documentos de identidad.
CREATE TABLE documents_types (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insertamos los tipos de documentos
INSERT INTO documents_types (`name`) VALUES ('Cedula de ciudadania'), ('Cedula de extranjeria'), ('Pasaporte');

-- Tabla para el tipo de cuenta bancaria.
CREATE TABLE account_types (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insertamos los tipos de cuenta bancaria
INSERT INTO account_types (`name`) VALUES ('Ahorros'), ('Corriente');



-- Tabla para que los usuarios registrados como 'barbero' y 'AdminBarberia' puedan registrar su cuenta bancaria.
CREATE TABLE bank_accounts (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  id_user INT(20) NOT NULL,
  id_document_type INT(20) NOT NULL,
  id_account_type INT(20) NOT NULL,
  `bank_name` VARCHAR(255) NOT NULL,
  `account_number` VARCHAR(255) NOT NULL,
  `account_owner` VARCHAR(255) NOT NULL, -- este campo es para el nombre del titular de la cuenta
  `document_number` VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (id_document_type) REFERENCES documents_types(id) ON DELETE CASCADE,
  FOREIGN KEY (id_account_type) REFERENCES account_types(id) ON DELETE CASCADE
);

---------------------------------------------------------------------------------------

CREATE TABLE people (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  id_user INT(20) NOT NULL,
  `first_name` VARCHAR(255) NOT NULL, -- nombres
  `last_name` VARCHAR(255) NOT NULL, -- apellidos
  `phone` VARCHAR(10) NOT NULL,
  profile_image VARCHAR(255) NULL, -- URL de la profile image
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE
);




----------- TABLAS RELACIONADAS PARA ESTABLECER EL HORARIO DE LAS BARBERIAS -----------------

CREATE TABLE days_week(
 id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
 `days` VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO days_week (days) VALUES ('Lunes'), ('Martes'), ('Miercoles'), ('Jueves'), ('Viernes'), ('Sabado'), ('Domingo');

-- la tabla de horas debe tener un campo de tipo TIME, para poder almacenar la hora,
-- la cual sera usada tanto para la hora de inicio como para la hora de fin.
-- se debe insertar las horas y minutos para que la barberia pueda seleccionar la hora de inicio y fin.
CREATE TABLE `hours` (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `hour` VARCHAR(2) ,
  `minutes` VARCHAR(2) ,
  periodo VARCHAR(2) ,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insertamos las horas y minutos
INSERT INTO `hours` (`hour`)
VALUES
('01'), ('02'), ('03'), ('04'), ('05'), ('06'), ('07'), ('08'), ('09'), ('10'), ('11'), ('12');

-- Insertamos los minutos
INSERT INTO `hours` (`minutes`)
VALUES
('00'), ('01'), ('02'), ('03'), ('04'), ('05'), ('06'), ('07'), ('08'), ('09'), ('10'), ('11'), ('12'),
('13'), ('14'), ('15'), ('16'), ('17'), ('18'), ('19'), ('20'), ('21'), ('22'), ('23'), ('24'),
('25'), ('26'), ('27'), ('28'), ('29'), ('30'), ('31'), ('32'), ('33'), ('34'), ('35'), ('36'),
('37'), ('38'), ('39'), ('40'), ('41'), ('42'), ('43'), ('44'), ('45'), ('46'), ('47'), ('48'),
('49'), ('50'), ('51'), ('52'), ('53'), ('54'), ('55'), ('56'), ('57'), ('58'), ('59');

-- Insertamos los periodos
INSERT INTO `hours` (`periodo`)
VALUES
('AM'),
('PM');


-- Tabla para el estado de las barberias
CREATE TABLE states_barbershop(
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO states_barbershop (`name`) VALUES ('Abierto'), ('Cerrado'), ('En mantenimiento');


--------------------------- BANK OF SERVICES --------------------------------------

-- Tabla para la clasificacion de servicios de las barberias
CREATE TABLE services_classification(
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO services_classification (`name`) VALUES ('Corte de cabello'), ('Afeitado'), ('Tinte'), ('Peinado'), ('Barba'), ('Manicure'), ('Pedicure'), ('Depilacion');

-- Tabla para el banco de servicios de las barberias
CREATE TABLE bank_services (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  id_classification INT(20) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `description` TEXT NOT NULL,
  `price` DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (id_classification) REFERENCES services_classification(id) ON DELETE CASCADE
);

--------------------------- BANK OF PRODUCTS --------------------------------------

-- Tabla para la clasificacion de productos de las barberias
CREATE TABLE products_classification(
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
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
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (id_classification) REFERENCES products_classification(id) ON DELETE CASCADE
);
---------------------------------------------------------------------------------------

-- Tabla para las barberias.
CREATE TABLE barbershops (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  id_user INT(20) NOT NULL, -- id del usuario que registro la barberia, el cual tiene rol de 'AdminBarberia'
  id_state_barbershops INT(20) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  image_banner VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (id_state_barbershops) REFERENCES states_barbershop(id) ON DELETE CASCADE
);

-- Tabla para  que el usuario con rol de 'AdminBarberia' registre el horario de atencion barberia.
CREATE TABLE `schedules` (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  id_barbershop INT(20) NOT NULL,
  id_day INT(20) NOT NULL,
  id_start_hour INT(20) NOT NULL,
  id_end_hour INT(20) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (id_barbershop) REFERENCES barbershops(id) ON DELETE CASCADE,
  FOREIGN KEY (id_day) REFERENCES days_week(id) ON DELETE CASCADE,
  FOREIGN KEY (id_start_hour) REFERENCES `hours`(id) ON DELETE CASCADE,
  FOREIGN KEY (id_end_hour) REFERENCES `hours`(id) ON DELETE CASCADE
);
--------------------------- TIENDA DE LA BARBERIA --------------------------------------

-- Tabla para relacionar las barberias con los productos que se venden en la barberia.
CREATE TABLE barbershop_products (
    id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
    id_barbershop INT(20) NOT NULL,
    id_product INT(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_barbershop) REFERENCES barbershops(id) ON DELETE CASCADE,
    FOREIGN KEY (id_product) REFERENCES bank_products(id) ON DELETE CASCADE
);

-- Tabla para el inventario de los productos de la barberia
CREATE TABLE inventory (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_barbershop_product INT NOT NULL,
  quantity INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (id_barbershop_product) REFERENCES barbershop_products(id)
);

--------------------------- SERVICIOS DE LA BARBERIA --------------------------------------

-- Tabla para establecer la duracion de los servicios
CREATE TABLE services_duration (
    id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
    `duration` INT(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insertamos la duracion de los servicios
INSERT INTO services_duration (`duration`) VALUES (15), (30), (45), (60), (75), (90), (105), (120);




-- Tabla para relacionar las barberias con los servicios que se ofrecen, con su respectivo tiempo de duracion.
CREATE TABLE barbershop_services (
    id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
    id_barbershop INT(20) NOT NULL,
    id_service INT(20) NOT NULL,
    id_duration INT(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_barbershop) REFERENCES barbershops(id) ON DELETE CASCADE,
    FOREIGN KEY (id_service) REFERENCES bank_services(id) ON DELETE CASCADE,
    FOREIGN KEY (id_duration) REFERENCES services_duration(id) ON DELETE CASCADE
);
---------------------------------------------------------------------------------------

-- Tabla para relacionar los barberos que trabajan en  barberias.
CREATE TABLE barbershop_barbers (
    id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
    id_barbershop INT(20) NOT NULL,
    id_user INT(20) NOT NULL, -- id del usuario que tiene rol de 'Barbero'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_barbershop) REFERENCES barbershops(id) ON DELETE CASCADE,
    FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE
);



--------------------------- REGISTRO DE CITAS Y PAGOS --------------------------------------

-- Tabla para el estado de los pagos
CREATE TABLE payment_status (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `status` VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- creamos la tabla para registrar los medios de pago
CREATE TABLE payment_gateways(
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insertamos los medios de pago
INSERT INTO payment_gateways (`name`) VALUES ('Efectivo'), ('Transferencia bancaria'), ('Pago en linea');


-- Insertamos estados de los pagos
INSERT INTO payment_status (`status`) VALUES ('Pendiente'), ('Completado'), ('Fallido'), ('Reembolsado');

-- Tabla para los vouchers de pago de las citas y productos cuando se pagan por medio de transferencia bancaria.
-- Si el pago se realiza por medio de transferencia bancaria, el barbero debe subir o registrar el voucher de pago.
-- para tener soporte de que el pago fue realizado.
CREATE TABLE payment_vouchers (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  id_user INT(20) NOT NULL,
  id_barbershop INT(20) NOT NULL,
  id_payment_gateway INT(20) NOT NULL,
  id_payment_status INT(20) NOT NULL,
  voucher_image VARCHAR(255) NOT NULL, -- URL de la imagen del voucher de pago
  total DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (id_barbershop) REFERENCES barbershops(id) ON DELETE CASCADE,
  FOREIGN KEY (id_payment_gateway) REFERENCES payment_gateways(id) ON DELETE CASCADE,
  FOREIGN KEY (id_payment_status) REFERENCES payment_status(id) ON DELETE CASCADE
);

-- Tabla para la comicion que cobrare por cada pago de citas
CREATE TABLE commission_value_product(
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `value` DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla para la comicion que cobrare por cada pago de productos
CREATE TABLE commission_value_appointment(
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `value` DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
-- Tabla para los pagos de los productos
CREATE TABLE product_payments (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  id_user INT(20) NOT NULL,  -- id del usuario que realiza el pago
  id_barbershop INT(20) NOT NULL, -- id de la barberia
  id_product INT(20) NOT NULL,
  id_payment_gateways INT(20) NOT NULL,
  id_payment_status INT(20) NOT NULL,
  quantity INT(20) NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  total_receive_barbershop DECIMAL(10, 2) NOT NULL,
  id_commission_product INT(20) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (id_product) REFERENCES barbershop_products(id) ON DELETE CASCADE,
  FOREIGN KEY (id_payment_gateways) REFERENCES payment_gateways(id) ON DELETE CASCADE,
  FOREIGN KEY (id_payment_status) REFERENCES payment_status(id) ON DELETE CASCADE,
  FOREIGN KEY (id_commission_product) REFERENCES commission_value_product(id) ON DELETE CASCADE,
  FOREIGN KEY (id_barbershop) REFERENCES barbershops(id) ON DELETE CASCADE
);

-- Tabla para los pagos de las citas
CREATE TABLE appointment_payments (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  id_user INT(20) NOT NULL,
  id_barbershop INT(20) NOT NULL, -- id de la barberia
  id_barbershop_barber INT(20) NOT NULL, -- id del barbero que atendio la cita
  id_appointment INT(20) NOT NULL,
  id_payment_gateways INT(20) NOT NULL,
  id_payment_status INT(20) NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  total_receive_barbershop DECIMAL(10, 2) NOT NULL,
  id_commission_appointment INT(20) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (id_barbershop) REFERENCES barbershops(id) ON DELETE CASCADE,
  FOREIGN KEY (id_barbershop_barber) REFERENCES barbershop_barbers(id) ON DELETE CASCADE,
  FOREIGN KEY (id_appointment) REFERENCES barbershop_services(id) ON DELETE CASCADE,
  FOREIGN KEY (id_payment_status) REFERENCES payment_status(id) ON DELETE CASCADE,
  FOREIGN KEY (id_payment_gateways) REFERENCES payment_gateways(id) ON DELETE CASCADE,
  FOREIGN KEY (id_commission_appointment) REFERENCES commission_value_appointment(id) ON DELETE CASCADE
);

-- Tabla para las citas que vera el barbero en su agenda.
CREATE TABLE appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    id_barbershop INT NOT NULL,
    id_barber INT NOT NULL,
    id_service INT NOT NULL,
    appointment_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    `status` VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users(id),
    FOREIGN KEY (id_barbershop) REFERENCES barbershops(id),
    FOREIGN KEY (id_barber) REFERENCES barbershop_barbers(id),
    FOREIGN KEY (id_service) REFERENCES barbershop_services(id)
);
---------------------------------------------------------------------------------------

--------------------------- REGISTRO DE PUBLICACIONES --------------------------------------

CREATE TABLE posts_classification(
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
INSERT INTO posts_classification (`name`) VALUES ('Promociones'), ('Eventos'), ('Noticias'), ('Consejos'), ('Tendencias'), ('Historias'), ('Tutoriales'), ('Entrevistas'), ('productos');
-- tabla para registro de publicaciones
CREATE TABLE posts (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  id_user INT(20) NOT NULL, -- solo usuarios con rol de 'barbero' y 'AdminBarberia' pueden realizar publicaciones
  id_barbershop INT(20) NOT NULL,
  id_classification INT(20) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `content` TEXT NOT NULL,
  `media` VARCHAR(255), -- URL of the image or video related to the post
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (id_barbershop) REFERENCES barbershops(id) ON DELETE CASCADE,
  FOREIGN KEY (id_classification) REFERENCES posts_classification(id) ON DELETE CASCADE
);

-- Tabla para los comentarios de las publicaciones
CREATE TABLE comments (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  id_user INT(20) NOT NULL,
  id_post INT(20) NOT NULL,
  `comment` TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
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
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (id_barbershop) REFERENCES barbershops(id) ON DELETE CASCADE
);


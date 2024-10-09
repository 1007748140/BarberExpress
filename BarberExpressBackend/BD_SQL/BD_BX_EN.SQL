DROP DATABASE IF EXISTS BarberExpress;
CREATE DATABASE BarberExpress;
USE BarberExpress;

CREATE TABLE people (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL
);

CREATE TABLE `role` (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  name VARCHAR(100) NOT NULL
);

-- Insertion of default data for the role table
INSERT INTO `role` (id, name) VALUES
(1, 'customer'),
(2, 'barber');

CREATE TABLE country (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL
);

-- Insertion of default data for the country table
INSERT INTO country (name) VALUES ('Colombia');

CREATE TABLE `state` (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  country_id INT(20) NOT NULL,
  FOREIGN KEY (country_id) REFERENCES country(id) ON DELETE CASCADE
);

CREATE TABLE people_location (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  people_id INT(20) NOT NULL,
  country_id INT(20) NOT NULL,
  state_id INT(20) NOT NULL,
  latitude DECIMAL(10, 7) NOT NULL,
  longitude DECIMAL(10, 7) NOT NULL,
  FOREIGN KEY (people_id) REFERENCES people(id) ON DELETE CASCADE,
  FOREIGN KEY (country_id) REFERENCES country(id) ON DELETE CASCADE,
  FOREIGN KEY (state_id) REFERENCES `state`(id) ON DELETE CASCADE
);

CREATE TABLE people_info (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  people_id INT(20) NOT NULL,
  role_id INT(20) NOT NULL,
  location_id INT(20) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  phone VARCHAR(10),
  profile_image VARCHAR(255), -- URL of the profile image
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (people_id) REFERENCES people(id) ON DELETE CASCADE,
  FOREIGN KEY (role_id) REFERENCES `role`(id) ON DELETE CASCADE,
  FOREIGN KEY (location_id) REFERENCES people_location(id) ON DELETE CASCADE
);

CREATE TABLE barbershop (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  people_id INT(20) NOT NULL,
  location_id INT(20) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  FOREIGN KEY (people_id) REFERENCES people(id) ON DELETE CASCADE,
  FOREIGN KEY (location_id) REFERENCES people_location(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE schedule (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  barbershop_id INT(20) NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  `day` ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday') NOT NULL,
  shop_status BOOLEAN NOT NULL DEFAULT 1, -- 1 = Open, 0 = Closed
  FOREIGN KEY (barbershop_id) REFERENCES barbershop(id) ON DELETE CASCADE
);

CREATE TABLE barbers (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  barbershop_id INT(20) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  profile_picture VARCHAR(100) NOT NULL,
  `status` BOOLEAN DEFAULT 1, -- indicates if the barber is available for service.
  FOREIGN KEY (barbershop_id) REFERENCES barbershop(id) ON DELETE CASCADE
);

CREATE TABLE banks (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `name` ENUM('BANCOLOMBIA', 'NEQUI', 'LULOBANK', 'DAVIDPLATA') NOT NULL -- Only these banks for transfers
);

CREATE TABLE barber_accounts (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  barber_id INT(20) NOT NULL,
  bank_id INT(20) NOT NULL,
  account_number VARCHAR(20) NOT NULL,
  FOREIGN KEY (barber_id) REFERENCES barbers(id) ON DELETE CASCADE,
  FOREIGN KEY (bank_id) REFERENCES banks(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE services (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  barbershop_id INT(20) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  duration TIME NOT NULL, -- Estimated service duration
  FOREIGN KEY (barbershop_id) REFERENCES barbershop(id) ON DELETE CASCADE
);

CREATE TABLE products (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  barbershop_id INT(20) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT,
  price DECIMAL(10, 2) NOT NULL,
  stock INT(20) NOT NULL, -- Number of products in stock
  FOREIGN KEY (barbershop_id) REFERENCES barbershop(id) ON DELETE CASCADE
);

CREATE TABLE appointments (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  barbershop_id INT(20) NOT NULL,
  people_id INT(20) NOT NULL,
  service_id INT(20) NOT NULL,
  barber_id INT(20) NOT NULL,
  `date` DATETIME NOT NULL,
  status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
  FOREIGN KEY (barbershop_id) REFERENCES barbershop(id) ON DELETE CASCADE,
  FOREIGN KEY (people_id) REFERENCES people(id) ON DELETE CASCADE,
  FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
  FOREIGN KEY (barber_id) REFERENCES barbers(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  barbershop_id INT(20) NOT NULL,
  barber_id INT(20) NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  media VARCHAR(255), -- URL of the image or video related to the post
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (barbershop_id) REFERENCES barbershop(id) ON DELETE CASCADE,
  FOREIGN KEY (barber_id) REFERENCES barbers(id) ON DELETE CASCADE
);

CREATE TABLE reviews (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  barbershop_id INT(20) NOT NULL,
  people_id INT(20) NOT NULL,
  appointment_id INT(20) NOT NULL,
  comment TEXT,
  rating INT(1) NOT NULL, -- Rating between 1 and 5
  FOREIGN KEY (barbershop_id) REFERENCES barbershop(id) ON DELETE CASCADE,
  FOREIGN KEY (people_id) REFERENCES people(id) ON DELETE CASCADE,
  FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE payments (
  id INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  appointment_id INT(20) NOT NULL,
  people_id INT(20) NOT NULL,
  barbershop_id INT(20) NOT NULL,
  barber_id INT(20) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  payment_method ENUM('cash', 'transfer') NOT NULL,
  `status` ENUM('pending', 'paid') DEFAULT 'pending',
  receipt_url VARCHAR(255) NOT NULL,
  payment_date TIMESTAMP,
  FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE CASCADE,
  FOREIGN KEY (people_id) REFERENCES people(id) ON DELETE CASCADE,
  FOREIGN KEY (barbershop_id) REFERENCES barbershop(id) ON DELETE CASCADE,
  FOREIGN KEY (barber_id) REFERENCES barbers(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

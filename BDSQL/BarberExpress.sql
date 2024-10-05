DROP DATABASE IF EXISTS BarberExpress;
CREATE DATABASE BarberExpress;
USE BarberExpress;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  address TEXT,
  `role` ENUM('barber', 'client') NOT NULL,
  profile_image VARCHAR(255),   -- URL of the profile image
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE barbershops (
  id INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT,
  address TEXT,
  owner_id INT NOT NULL,  -- Relates to the owner of the barbershop (user role: barber)
  FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE schedules (
  id INT AUTO_INCREMENT PRIMARY KEY,
  barber_id INT NOT NULL,       -- Barber ID
  `day` ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday') NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  FOREIGN KEY (barber_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  barber_id INT NOT NULL,       -- Barber ID offering the service
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT,
  price DECIMAL(10, 2) NOT NULL,
  duration TIME NOT NULL,        -- Estimated duration of the service
  FOREIGN KEY (barber_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  barber_id INT NOT NULL,       -- Barber ID selling the product
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT,
  price DECIMAL(10, 2) NOT NULL,
  stock INT NOT NULL,            -- Quantity of products in stock
  FOREIGN KEY (barber_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  barber_id INT NOT NULL,
  client_id INT NOT NULL,
  service_id INT NOT NULL,      -- Related to the service offered in the appointment
  `date` DATETIME NOT NULL,
  `status` ENUM('pending', 'confirmed', 'canceled', 'completed') DEFAULT 'pending',
  FOREIGN KEY (barber_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (client_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  barber_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  image VARCHAR(255),          -- URL of the image associated with the post
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (barber_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  barber_id INT NOT NULL,
  client_id INT NOT NULL,
  appointment_id INT NOT NULL,
  `comment` TEXT,
  rating INT CHECK (rating BETWEEN 1 AND 5), -- Rating between 1 and 5
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (barber_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (client_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE CASCADE
);

CREATE TABLE payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  appointment_id INT NOT NULL,          -- ID of the appointment for which the payment was made
  client_id INT NOT NULL,
  barber_id INT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  payment_method ENUM('card', 'cash', 'transfer') NOT NULL,
  `status` ENUM('pending', 'paid') DEFAULT 'pending',
  payment_date TIMESTAMP,
  FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE CASCADE,
  FOREIGN KEY (client_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (barber_id) REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

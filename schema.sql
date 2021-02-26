DROP DATABASE IF EXISTS employees_DB;

CREATE DATABASE employees_DB;

USE employees_DB;

CREATE TABLE department (
  id INT AUTO_INCREMENT NOT NULL,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT AUTO_INCREMENT NOT NULL ,
  title VARCHAR(30),
  salary DECIMAL(10,2),
  department_id INT,
  CONSTRAINT f_department FOREIGN KEY (department_id) REFERENCES department (id) ON DELETE CASCADE,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT AUTO_INCREMENT NOT NULL ,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT NULL,
  INDEX role_ind(role_id),
  manager_id INT NULL,
  CONSTRAINT f_role FOREIGN KEY (role_id) REFERENCES role (id) ON DELETE CASCADE,
  INDEX manager_ind(manager_id),
  CONSTRAINT f_manager FOREIGN KEY (manager_id) REFERENCES employee (id) ON DELETE SET NULL,
  PRIMARY KEY (id)
);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;
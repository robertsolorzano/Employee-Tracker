USE employee_tracker;

-- Insert departments
INSERT INTO department (name) VALUES
  ('Sales'),
  ('Marketing'),
  ('Engineering'),
  ('Finance'),
  ('Human Resources');

-- Insert roles
INSERT INTO role (title, salary, department_id) VALUES
  ('Sales Manager', 80000, 1),
  ('Sales Representative', 50000, 1),
  ('Marketing Manager', 90000, 2),
  ('Marketing Coordinator', 60000, 2),
  ('Software Engineer', 100000, 3),
  ('QA Engineer', 75000, 3),
  ('Accountant', 70000, 4),
  ('HR Manager', 85000, 5),
  ('HR Coordinator', 55000, 5);

-- Insert employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ('John', 'Doe', 1, NULL),
  ('Jane', 'Smith', 2, 1),
  ('Michael', 'Johnson', 2, 1),
  ('Emily', 'Brown', 3, NULL),
  ('David', 'Wilson', 4, 4),
  ('Sarah', 'Taylor', 5, NULL),
  ('Robert', 'Solorzano', 5, 6),
  ('Olivia', 'Thomas', 6, 6),
  ('William', 'Jackson', 7, NULL),
  ('Emma', 'White', 8, NULL),
  ('James', 'Harris', 9, 10),
  ('Sophia', 'Martin', 9, 10);
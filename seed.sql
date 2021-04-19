USE employee_trackDB;

INSERT INTO department(name) VALUES ('Accounting'), ('Marketing');

INSERT INTO role(title, salary, department_id) VALUES ('Staff Accountant', 60000, 1), ('Marketing Associate', 35000, 2);

INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ('Tyler', 'Abegg', 1, NULL), ('Andrew', 'Watson', 2, NULL);


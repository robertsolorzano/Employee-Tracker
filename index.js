const inquirer = require('inquirer');
const connection = require('./config/connection');

// Function to display the main menu
function displayMenu() {
  inquirer
    .prompt({
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit',
      ],
      loop: false,
    })
    .then((answer) => {
      switch (answer.choice) {
        case 'View all departments':
          viewAllDepartments();
          break;
        case 'View all roles':
          viewAllRoles();
          break;
        case 'View all employees':
          viewAllEmployees();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();//need to make later
          break;
        case 'Add an employee':
          addEmployee();//need to make later
          break;
        case 'Update an employee role':
          updateEmployeeRole();//need to make later
          break;
        case 'Exit':
          connection.end();
          console.log('Goodbye!');
          break;
      }
    });
}

// Function to view all departments
function viewAllDepartments() {
    const query = 'SELECT * FROM department';
    connection.query(query, (err, res) => {
      if (err) throw err;
      console.table(res);
      displayMenu();
    });
  }

// Function to view all roles
function viewAllRoles() {
    const query = `
      SELECT role.id, role.title, department.name AS department, role.salary
      FROM role
      INNER JOIN department ON role.department_id = department.id
    `;
    connection.query(query, (err, res) => {
      if (err) throw err;
      console.table(res);
      displayMenu();
    });
  }
  
// Function to view all employees
function viewAllEmployees() {
    const query = `
      SELECT 
        employee.id, 
        employee.first_name, 
        employee.last_name, 
        role.title, 
        department.name AS department,
        role.salary, 
        CONCAT(manager.first_name, ' ', manager.last_name) AS manager
      FROM employee
      LEFT JOIN role ON employee.role_id = role.id
      LEFT JOIN department ON role.department_id = department.id
      LEFT JOIN employee manager ON employee.manager_id = manager.id
    `;
    connection.query(query, (err, res) => {
      if (err) throw err;
      console.table(res);
      displayMenu();
    });
  }

// Function to add a department
function addDepartment() {
    inquirer
      .prompt({
        type: 'input',
        name: 'departmentName',
        message: 'Enter the name of the department:',
      })
      .then((answer) => {
        const query = 'INSERT INTO department SET ?';
        connection.query(query, { name: answer.departmentName }, (err, res) => {
          if (err) throw err;
          console.log('Department added successfully!');
          displayMenu();
        });
      });
  }

// Start the application
displayMenu();
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
          viewAllRoles();//need to make later
          break;
        case 'View all employees':
          viewAllEmployees();//need to make later
          break;
        case 'Add a department':
          addDepartment();//need to make later
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


// Start the application
displayMenu();
const inquirer = require('inquirer');
const connection = require('./config/connection');
const { viewAllDepartments, addDepartment } = require('./lib/departments');
const { viewAllRoles, addRole, updateEmployeeRole } = require('./lib/roles');
const { viewAllEmployees, addEmployee, updateEmployeeManager } = require('./lib/employees');
const { viewDepartmentBudget } = require('./lib/budgets');
const { generateLogo } = require('./utils/logo')

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
        'View department budgets',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Update an employee manager',
        'Exit',
      ],
      loop: false,
    })
    .then((answer) => {
      switch (answer.choice) {
        case 'View all departments':
          viewAllDepartments(displayMenu);
          break;
        case 'View all roles':
          viewAllRoles(displayMenu);
          break;
        case 'View all employees':
          viewAllEmployees(displayMenu);
          break;
        case 'View department budgets':
          viewDepartmentBudget(displayMenu);
          break;
        case 'Add a department':
          addDepartment(displayMenu);
          break;
        case 'Add a role':
          addRole(displayMenu);
          break;
        case 'Add an employee':
          addEmployee(displayMenu);
          break;
        case 'Update an employee role':
          updateEmployeeRole(displayMenu);
          break;
        case 'Update an employee manager':
          updateEmployeeManager(displayMenu);
          break;
        case 'Exit':
          connection.end();
          console.log('Goodbye!');
          break;
      }
    });
}


// Start the application
generateLogo();
displayMenu();
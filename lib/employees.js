const inquirer = require('inquirer');
const connection = require('./config/connection');

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

// Function to add an employee
function addEmployee() {
    const roleQuery = 'SELECT * FROM role';
    const managerQuery = 'SELECT * FROM employee';
  
    connection.query(roleQuery, (err, roles) => {
      if (err) throw err;
  
      connection.query(managerQuery, (err, managers) => {
        if (err) throw err;
  
        inquirer
          .prompt([
            {
              type: 'input',
              name: 'firstName',
              message: "Enter the employee's first name:",
            },
            {
              type: 'input',
              name: 'lastName',
              message: "Enter the employee's last name:",
            },
            {
              type: 'list',
              name: 'roleId',
              message: "Select the employee's role:",
              choices: roles.map((role) => ({
                name: role.title,
                value: role.id,
              })),
            },
            {
              type: 'list',
              name: 'managerId',
              message: "Select the employee's manager:",
              choices: [
                { name: 'None', value: null },
                ...managers.map((manager) => ({
                  name: `${manager.first_name} ${manager.last_name}`,
                  value: manager.id,
                })),
              ],
            },
          ])
          .then((answer) => {
            const query = 'INSERT INTO employee SET ?';
            connection.query(
              query,
              {
                first_name: answer.firstName,
                last_name: answer.lastName,
                role_id: answer.roleId,
                manager_id: answer.managerId,
              },
              (err, res) => {
                if (err) throw err;
                console.log('Employee added successfully!');
                displayMenu();
              }
            );
          });
      });
    });
  }

// Function to update an employee's manager
function updateEmployeeManager() {
    const employeeQuery = 'SELECT * FROM employee';
  
    connection.query(employeeQuery, (err, employees) => {
      if (err) throw err;
  
      inquirer
        .prompt([
          {
            type: 'list',
            name: 'employeeId',
            message: 'Select the employee to update:',
            choices: employees.map((employee) => ({
              name: `${employee.first_name} ${employee.last_name}`,
              value: employee.id,
            })),
          },
          {
            type: 'list',
            name: 'managerId',
            message: 'Select the new manager for the employee:',
            choices: [
              { name: 'None', value: null },
              ...employees.map((employee) => ({
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id,
              })),
            ],
          },
        ])
        .then((answer) => {
          const query = 'UPDATE employee SET manager_id = ? WHERE id = ?';
          connection.query(
            query,
            [answer.managerId, answer.employeeId],
            (err, res) => {
              if (err) throw err;
              console.log('Employee manager updated successfully!');
              displayMenu();
            }
          );
        });
    });
  }

module.exports = {
    viewAllEmployees,
    addEmployee,
    updateEmployeeManager
};
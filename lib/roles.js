const inquirer = require('inquirer');
const connection = require('./config/connection');

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

// Function to add a role
function addRole() {
    const query = 'SELECT * FROM department';
    connection.query(query, (err, departments) => {
      if (err) throw err;
  
      inquirer
        .prompt([
          {
            type: 'input',
            name: 'title',
            message: 'Enter the title of the role:',
          },
          {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary for the role:',
          },
          {
            type: 'list',
            name: 'departmentId',
            message: 'Select the department for the role:',
            choices: departments.map((department) => ({
              name: department.name,
              value: department.id,
            })),
          },
        ])
        .then((answer) => {
          const query = 'INSERT INTO role SET ?';
          connection.query(
            query,
            {
              title: answer.title,
              salary: answer.salary,
              department_id: answer.departmentId,
            },
            (err, res) => {
              if (err) throw err;
              console.log('Role added successfully!');
              displayMenu();
            }
          );
        });
    });
  }

// Function to update an employee's role
function updateEmployeeRole() {
    const employeeQuery = 'SELECT * FROM employee';
    const roleQuery = 'SELECT * FROM role';
  
    connection.query(employeeQuery, (err, employees) => {
      if (err) throw err;
  
      connection.query(roleQuery, (err, roles) => {
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
              name: 'roleId',
              message: 'Select the new role for the employee:',
              choices: roles.map((role) => ({
                name: role.title,
                value: role.id,
              })),
            },
          ])
          .then((answer) => {
            const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
            connection.query(
              query,
              [answer.roleId, answer.employeeId],
              (err, res) => {
                if (err) throw err;
                console.log('Employee role updated successfully!');
                displayMenu();
              }
            );
          });
      });
    });
  }

module.exports = {
    viewAllRoles,
    addRole,
    updateEmployeeRole
};
  
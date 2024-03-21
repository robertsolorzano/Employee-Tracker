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
        'Update an employee manager',
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
          addRole();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Update an employee role':
          updateEmployeeRole();
          break;
        case 'Update an employee manager':
          updateEmployeeManager();
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

// Start the application
displayMenu();
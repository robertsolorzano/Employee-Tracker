const inquirer = require('inquirer');
const connection = require('./config/connection');

// Function to view all departments
function viewAllDepartments() {
    const query = 'SELECT * FROM department';
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

module.exports = {
    viewAllDepartments , addDepartment
};
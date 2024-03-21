const connection = require('./config/connection');

// Function to view the total utilized budget of a department
function viewDepartmentBudget() {
    const query = `
      SELECT 
        department.name AS department,
        SUM(role.salary) AS total_budget
      FROM employee
      JOIN role ON employee.role_id = role.id
      JOIN department ON role.department_id = department.id
      GROUP BY department.name
    `;
  
    connection.query(query, (err, res) => {
      if (err) throw err;
      console.table(res);
      displayMenu();
    });
  }

module.exports = {
    viewDepartmentBudget
};
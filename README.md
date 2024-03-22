# Employee-Tracker ![License](https://img.shields.io/badge/License-MIT-blue.svg) 

## Description

Employee Tracker is a command-line application that allows business owners to efficiently manage and organize their company's departments, roles, and employees. Built using Node.js, Inquirer, and MySQL, this application provides a user-friendly interface for performing various operations related to employee management.

![preview-image](/public/images/preview.png)

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Credits](#credits)
- [License](#license)

## Features

- View all departments: Display a formatted table showing department names and department IDs.
- View all roles: Display a table with job titles, role IDs, departments, and salaries.
- View all employees: Display a table with employee data, including IDs, first names, last names, job titles, departments, salaries, and managers.
- Add a department: Prompt the user to enter the name of a new department and add it to the database.
- Add a role: Prompt the user to enter the name, salary, and department for a new role and add it to the database.
- Add an employee: Prompt the user to enter the employee's first name, last name, role, and manager, and add the employee to the database.
- Update an employee role: Prompt the user to select an employee and update their role in the database.
- Update an employee manager: Prompt the user to select an employee and update their manager in the database.
- View department budgets: Display the total utilized budget for each department, calculated as the sum of salaries of all employees in that department.


## Installation

1. Clone the repository:
```bash
git clone git@github.com:robertsolorzano/Employee-Tracker.git
```

2. Install the dependencies:
```bash
npm install
```

3. Initialize schema:
    - Inside your repository, run this command to access mySql shell: 
        ```bash
        mysql -u yourusername -p
        ```
    - Enter mySql password
    - Inside mySql shell enter: 
        ```sql
        source ./db/schema.sql
        ```

    - (Optional) Edit seed.sql with your existing employees to initially seed your DB:
    ```sql
    source ./db/seed.sql
    ```


4. Start the app: 
```bash
npm start
```

## Usage

Use the arrow keys ⬆️⬇️ to navigate and press `Enter` to select an option. Follow the prompts and when you are done simply press the `Exit` button to return back. 

## Contributing

Contributors: [robertsolorzano](https://github.com/robertsolorzano)

## Credits

- ascII art generator:
[patorjk.com](https://patorjk.com/software/taag/#p=display&h=3&v=3&f=Soft&t=Employee%20%0ATracker)

- MYSQL function references: 
[w3schools.com](https://www.w3schools.com/sql/sql_ref_mysql.asp)

## License

This project is licensed under the MIT license. For more information, see [here](https://opensource.org/licenses/MIT).
  



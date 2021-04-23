const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Be sure to update with your own MySQL password!
  password: "password1",
  database: "employee_trackDB",
});

connection.connect((err) => {
  if (err) throw err;
  runPrompt();
});

const runPrompt = () => {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View all employees",
        "View all roles",
        "View all departments",
        "Add an employee",
        "Add a role",
        "Add a department",
        "Update employee roles",
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case "View all employees":
          viewAllEmployees();
          break;
        case "View all roles":
          viewAllRoles();
          break;
        case "View all departments":
          viewAllDepartments();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Update employee roles":
          updateEmployeeRoles();
          break;
        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};

const viewAllRoles = () => {
  connection.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    console.table(res);
    runPrompt();
  });
};

const viewAllEmployees = () => {
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    console.table(res);
    runPrompt();
  });
};
const viewAllDepartments = () => {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.table(res);
    runPrompt();
  });
};

const addEmployee = () => {
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    const managerChoices = [];
    res.forEach((man) => {
      managerChoices.push({
        name: `${man.first_name} ${man.last_name}`,
        value: man.id,
      });
    });
    connection.query("SELECT * FROM role", (err, res) => {
      if (err) throw err;
      const roleChoices = [];
      res.forEach((rol) => {
        roleChoices.push({ name: rol.title, value: rol.id });
      });
      inquirer
        .prompt([
          {
            name: "first_name",
            type: "input",
            message: "What is the first name of the employee?",
          },
          {
            name: "last_name",
            type: "input",
            message: "What is the last name of the employee?",
          },
          {
            name: "role_id",
            type: "rawlist",
            message: "What role will this employee be?",
            choices: roleChoices,
          },
          {
            name: "manager_id",
            type: "rawlist",
            message: "Who does this employee work under?",
            choices: managerChoices,
          },
        ])
        .then((answers) => {
          connection.query(
            "INSERT INTO employee SET ?",
            answers,
            (err, res) => {
              if (err) throw err;
              runPrompt();
            }
          );
        });
    });
  });
};

const addRole = () => {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    const departmentChoices = [];
    res.forEach((dep) => {
      departmentChoices.push({ name: dep.name, value: dep.id });
    });
    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "What is the title of this role?",
        },
        {
          name: "salary",
          type: "input",
          message: "What is their salary?",
        },
        {
          name: "department_id",
          type: "rawlist",
          message: "What department does this employee work in?",
          choices: departmentChoices,
        },
      ])
      .then((answers) => {
        connection.query("INSERT INTO role SET ?", answers, (err, res) => {
          if (err) throw err;
          runPrompt();
        });
      });
  });
};

const addDepartment = () => {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "What department would you like to add?",
      },
    ])
    .then((answers) => {
      connection.query("INSERT INTO department SET ?", answers, (err, res) => {
        if (err) throw err;
        runPrompt();
      });
    });
};

// connection.query("SELECT * FROM role", (err, res) => {
//   if (err) throw err;
//   console.table(res);
//   runPrompt();
// });

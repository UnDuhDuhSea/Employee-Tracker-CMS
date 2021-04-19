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
      choices: ["View all employees", "Add a role"],
    })
    .then((answer) => {
      switch (answer.action) {
        case "View all employees":
          viewAllEmployees();
          break;
        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};

const viewAllEmployees = () => {};

const addRole = () => {
  connection.query("SELECT * FROM department", (err, res) => {
    const departmentChoices = [];
    res.forEach((dep) => {
      departmentChoices.push({ name: dep.name, value: dep.id });
    });
    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "What would you like to do?",
        },
        {
          name: "salary",
          type: "input",
          message: "What would you like to do?",
        },
        {
          name: "department_id",
          type: "rawlist",
          message: "What would you like to do?",
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

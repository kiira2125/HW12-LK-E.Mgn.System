// Import Modules
const db = require('../config/connection');
const inquirer = require('inquirer');


// Refactored for ASYNC AWAIT
async function updateEmployee() {
    try {
        // List Possible Empolyees
        const [employee] = await db.promise().query("SELECT id, first_name, last_name FROM employees")
        const employeeChoices = employee.map(emp => {
            return {
                name: `${emp.first_name} ${emp.last_name}`,
                value: emp.id
            }
        })
        // List Possible Roles
        const [roles] = await db.promise().query(`SELECT role_id, role_title FROM roles`)
        const choices = roles.map(role => {
            return {
                name: role.role_title,
                value: role.role_id
            }
        })

        const { employee_id, role_id } = await inquirer.prompt([
            {
                name: "employee_id",
                type: 'list',
                message: "Select Employee To Update:",
                choices: employeeChoices
            },

            {
                name: "role_id",
                message: "Select Employee's Title:",
                type: "list",
                choices
            }
        ])
        // Update Employee
        await db.promise().query(`UPDATE employees SET ? WHERE ?`, [{ role_id }, { id: employee_id }])
        return `Employee's Role has been updated...`
    } catch (err) {
        console.log(`Oh no! Something went wrong...`, err)
    }
}


//Export
module.exports = updateEmployee;


// Original
// function updateEmployee() {
//     // Show All Employees
//     db.promise().query(`SELECT * FROM employees`)
//         .then((results) => {
//             const employeeChoices = results[0].map(emp => {
//                 return {
//                     name: `${emp.first_name} ${emp.last_name}`,
//                     value: emp.id
//                 }
//             })
//             // Show current Roles
//             db.promise().query(`SELECT * FROM roles`)
//                 .then((roles) => {
//                     const roleChoices = roles[0].map(role => {
//                         return {
//                             name: role.role_title,
//                             value: role.role_id
//                         }
//                     })

//                     const updateEmployeeQuestions = [
//                         {
//                             name: "id",
//                             message: "Which employee would you like to update?",
//                             type: "list",
//                             choices: employeeChoices
//                         },
//                         {
//                             name: "role_id",
//                             message: "What is the employee's new title?",
//                             type: "list",
//                             choices: roleChoices
//                         }
//                     ]
//                     inquirer.prompt(updateEmployeeQuestions)
//                         .then(results => {
//                             // Update Employee Table
//                             db.promise().query('UPDATE employees SET ? WHERE ?', [results, { id: results.id }])
//                                 .then(() => {
//                                     console.log('Employee Updated');
//                                     userChoice()
//                                 })
//                         })
//                 })
//         })
// }
// Import Modules
const db = require('../config/connection');
const inquirer = require('inquirer');


// Refactored for ASYNC AWAIT
async function addRole() {
    try {
        // List Possible Departments
        const [department] = await db.promise().query("SELECT * FROM departments")
        const departChoices = department.map(dep => {
            return {
                name: dep.department_name,
                value: dep.department_id
            }
        })

        const { role_title, role_salary, department_id } = await inquirer.prompt([
            {
                type: 'input',
                name: "role_title",
                message: "Enter Role's Title:",
            },
            {
                type: 'input',
                name: "role_salary",
                message: "Enter Role's Salary:",
            },
            {
                type: 'list',
                name: "department_id",
                message: "Enter Role's Department:",
                choices: departChoices
            }
        ])
        // Add Role
        await db.promise().query(`INSERT INTO roles (role_title, role_salary, department_id) VALUES (?, ?, ?)`, [role_title, role_salary, department_id])
        return `${role_title} has been added to the database`
    } catch (err) {
        console.log(`Oh no! Something went wrong...`, err)
    }

}


//Export
module.exports = addRole;


// Original
// function addRole() {
//     // Show current Departments
//     db.promise().query(`SELECT * FROM departments`)
//         .then((depart) => {
//             const departmentChoices = depart[0].map(dep => {
//                 return {
//                     name: dep.department_name,
//                     value: dep.department_id
//                 }
//             })

//             const addRoleQuestions = [
//                 {
//                     name: "role_title",
//                     message: "Enter role title",
//                 },
//                 {
//                     name: "role_salary",
//                     message: "Enter role salary",
//                 },
//                 {
//                     name: "department_id",
//                     message: "Enter role department",
//                     type: "list",
//                     choices: departmentChoices
//                 }
//             ]
//             inquirer.prompt(addRoleQuestions)
//                 .then(results => {
//                     // Add results to Role Table
//                     db.promise().query('INSERT INTO roles SET ?', results)
//                         .then(() => {
//                             console.log('Role Added');
//                             userChoice()
//                         })
//                 })
//         })
// }
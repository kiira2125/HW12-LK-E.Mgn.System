// Import Modules
const db = require('../config/connection');
const inquirer = require('inquirer');


// Refactored for ASYNC AWAIT
async function addDepartment() {
    try {
        const { department_name } = await inquirer.prompt([
            {
                type: 'input',
                name: "department_name",
                message: "Enter Department Name:",
            },
        ])
        // Add Department
        console.log(department_name)
        await db.promise().query(`INSERT INTO departments (department_name) VALUES (?)`, [department_name])
        return `${department_name} has been added to the database`
    } catch (err) {
        console.log(`Oh no! Something went wrong...`, err)
    }
}


//Export
module.exports = addDepartment;


// Original
// function addDepartment() {
//     const addDepartmentQuestions = [
//         {
//             name: "department_name",
//             message: "Enter department name",
//         }
//     ]
//     inquirer.prompt(addDepartmentQuestions)
//         .then(results => {
//             // Add results to Department Table
//             db.promise().query('INSERT INTO departments SET ?', results)
//                 .then(() => {
//                     console.log('Department Added');
//                     userChoice()
//                 })
//         }
//         )
// }
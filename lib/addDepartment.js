// Import Modules
const db = require('../config/connection');
const inquirer = require('inquirer');


// Refactored ASYNC to AWAIT
async function addDepartment() {
    try {
        const { department_name } = await inquirer.prompt([
            {
                type: 'input',
                name: "department_name",
                message: "Enter Department Name:",
            },
        ])
        // adding the dept
        console.log(department_name)
        await db.promise().query(`INSERT INTO departments (department_name) VALUES (?)`, [department_name])
        return `${department_name} has been added to the database`
    } catch (err) {
        console.log(`Oh no! Something went wrong...`, err)
    }
}


 
module.exports = addDepartment;

 
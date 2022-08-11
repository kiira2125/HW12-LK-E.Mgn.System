// Import Modules
const db = require('../config/connection');
const inquirer = require('inquirer');


// Refactored  ASYNC to AWAIT
async function addEmployee() {
    try {
        // List of maybe Mgrs
        const [manager] = await db.promise().query("SELECT id, first_name, last_name FROM employees")
        const managerChoices = manager.map(man => {
            return {
                name: `${man.first_name} ${man.last_name}`,
                value: man.id
            }
        })
        // List  of maybe Roles
        const [roles] = await db.promise().query(`SELECT role_id, role_title FROM roles`)
        const choices = roles.map(role => {
            return {
                name: role.role_title,
                value: role.role_id
            }
        })
        const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
            {
                name: "first_name",
                type: 'input',
                message: "Enter Employee's First Name:",
            },
            {
                name: "last_name",
                message: "Enter Employee's Last Name:",
                type: 'input',
            },
            {
                name: "role_id",
                message: "Select Employee's Title:",
                type: "list",
                choices
            },
            {
                name: "manager_id",
                message: "Select Employee's Manager:",
                type: "list",
                choices: [...managerChoices, { name: 'No Manager', value: null }],

            }
        ])
        // Add Emp 
        await db.promise().query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [first_name, last_name, role_id, manager_id])
        return `${first_name} ${last_name} has been added to the database`
    } catch (err) {
        console.log(`Oh no! Something went wrong...`, err)
    }
}


 
module.exports = addEmployee;
 
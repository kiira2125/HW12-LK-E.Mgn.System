// Bonus

// Import Modules
const db = require('../config/connection');
const inquirer = require('inquirer');


// Get Manager IDs
async function viewByManager() {
    try {
        const allManagers = await db.promise().query('SELECT first_name, last_name, id FROM employees WHERE (id IN (SELECT manager_id FROM employees));');

        const managerIDs = allManagers[0].map((m) => ({
            name: `${m.first_name} ${m.last_name}`,
            value: m.id,
        }));

        const { manager_id } = await inquirer.prompt([
            {
                type: 'list',
                name: 'manager_id',
                message: 'Select Manager:',
                choices: managerIDs,

            }
        ]);
        const viewManEmployees = await db.promise().query(`SELECT * FROM employees WHERE manager_id = ${manager_id}`);
        return viewManEmployees;
    } catch (err) {
        console.log(`Oh no! Something went wrong...`, err)
    }
}


// Export
module.exports = viewByManager;
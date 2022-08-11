// Bonus

// Import Modules
const db = require('../config/connection');
const inquirer = require('inquirer');


// Update Employee's Manager
async function updateEmpMan() {
    try {
        // List Possible Employees
        const [employee] = await db.promise().query("SELECT id, first_name, last_name FROM employees")
        const employeeChoices = employee.map(emp => {
            return {
                name: `${emp.first_name} ${emp.last_name}`,
                value: emp.id
            }
        })
        // List Possible Managers
        const [manager] = await db.promise().query("SELECT id, first_name, last_name FROM employees")
        const managerChoices = manager.map(man => {
            return {
                name: `${man.first_name} ${man.last_name}`,
                value: man.id
            }
        })
        const { employee_id, manager_id } = await inquirer.prompt([
            {
                name: "employee_id",
                type: 'list',
                message: "Select Employee To Update:",
                choices: employeeChoices
            },
            {
                name: "manager_id",
                message: "Select New Manager:",
                type: "list",
                choices: managerChoices
            }
        ])
        // Update Employee's Manager
        await db.promise().query(`UPDATE employees SET manager_id = ? WHERE id = ?`, [manager_id, employee_id])
        return `Employee's Manager has been updated...`
    } catch (err) {
        console.log(`Oh no! Something went wrong...`, err)
    }
}


// Export
module.exports = updateEmpMan;
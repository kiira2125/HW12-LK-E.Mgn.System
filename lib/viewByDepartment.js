// Bonus

// Import Modules
const db = require('../config/connection');
const inquirer = require('inquirer');
const viewAllDepartments = require('./viewAllDepartments');


// Get Department IDs
async function viewByDepartment() {
    try {
        const allDepartments = await viewAllDepartments();
        const { department_id } = await inquirer.prompt([
            {
                type: 'list',
                name: 'department_id',
                message: 'Select Department To View All Employees:',
                choices: allDepartments[0].map((d) => ({
                    name: d.department_name,
                    value: d.department_id,
                })),
            }
        ]);
        const departEmployees = await db.promise().query(`SELECT departments.department_name, roles.department_id, employees.first_name, employees.last_name, employees.role_id, roles.role_title
    FROM ((employees
    INNER JOIN roles ON employees.role_id = roles.role_id)
    INNER JOIN departments ON roles.department_id = departments.department_id) 
    WHERE departments.department_id = ${department_id}`);

        return departEmployees;
    } catch (err) {
        console.log(`Oh no! Something went wrong...`, err)
    }
}


// Export
module.exports = viewByDepartment;
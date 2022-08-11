// Bonus

// Import Modules
const db = require('../config/connection');
const inquirer = require('inquirer');
const viewAllRoles = require('./viewAllRoles');


// Delete Role
async function delRole() {
    try {
        const allRoles = await viewAllRoles();
        const { role_id } = await inquirer.prompt([
            {
                type: 'list',
                name: 'role_id',
                message: 'Select Role To Delete:',
                choices: allRoles[0].map((r) => ({
                    name: r.role_title,
                    value: r.role_id,
                })),
            }
        ]);
        const delRole = await db.promise().query(`DELETE FROM roles WHERE role_id = ${role_id}`);
        return `Role has been deleted...`;
    } catch (err) {
        console.log(`Oh no! Something went wrong...`, err)
    }
}


// Export
module.exports = delRole;
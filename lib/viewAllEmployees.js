// Import Modules
const db = require('../config/connection');


// employee ids, first names, last names, 
// job titles, departments, salaries, and managers
async function viewAllEmployees() {
    try {
        const allEmployees = await db.promise().query(`SELECT employees.id, employees.first_name, employees.last_name, roles.role_title, departments.department_name, roles.role_salary, employees.manager_id 
    FROM ((employees 
    INNER JOIN roles ON employees.role_id = roles.role_id) 
    INNER JOIN departments ON roles.department_id = departments.department_id)`);
        return allEmployees;
    } catch (err) {
        console.log(`Oh no! Something went wrong...`, err)
    }
}

// Export
module.exports = viewAllEmployees;


// Original
// function viewAllEmployees() {
//     db.query('SELECT * FROM employees', function (err, results) {
//         console.table(results);
//     });
//     userChoice();
// }


// Refactored for ASYNC AWAIT
// async function viewAllEmployees() {
//     const allEmployees = await db.promise().query('SELECT * FROM employees')
//     return allEmployees;
// }
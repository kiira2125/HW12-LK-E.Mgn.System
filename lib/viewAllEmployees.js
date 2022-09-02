// Import Modules
const db = require('../config/connection');


// employee ids, first names, last names, job titles, dept, salaries, and mgrs
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

 
module.exports = viewAllEmployees;


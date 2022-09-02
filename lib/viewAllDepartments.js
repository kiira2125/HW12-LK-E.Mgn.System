// Import Modules
const db = require('../config/connection');


// Refactor ASYNC to AWAIT
async function viewAllDepartments() {
    try {
        const allDepartments = await db.promise().query('SELECT * FROM departments')
        return allDepartments
    } catch (err) {
        console.log(`Oh no! Something went wrong...`, err)
    }
}


 
module.exports = viewAllDepartments;
 
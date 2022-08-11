// Import Modules
const db = require('../config/connection');


// Refactored for ASYNC AWAIT
async function viewAllDepartments() {
    try {
        const allDepartments = await db.promise().query('SELECT * FROM departments')
        return allDepartments
    } catch (err) {
        console.log(`Oh no! Something went wrong...`, err)
    }
}


// Export
module.exports = viewAllDepartments;


// Original
// function viewAllDepartments() {
//     db.query('SELECT * FROM departments', function (err, results) {
//         console.table(results);
//     });
//     userChoice();
// }

// Refactor
// const viewAllDepartments = () => {
//     db.query('SELECT * FROM departments', function (err, results) {
//         console.table('\n', results);
//     });
//     // userChoice();
// }
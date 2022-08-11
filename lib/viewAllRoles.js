// Import Modules
const db = require('../config/connection');


// Refactored for ASYNC AWAIT
async function viewAllRoles() {
    try {
        const allRoles = await db.promise().query('SELECT * FROM roles')
        return allRoles
    } catch (err) {
        console.log(`Oh no! Something went wrong...`, err)
    }
}


// Export
module.exports = viewAllRoles;


// Original
// function viewAllRoles() {
//     db.query('SELECT * FROM roles', function (err, results) {
//         console.table(results);
//     });
//     userChoice();
// }
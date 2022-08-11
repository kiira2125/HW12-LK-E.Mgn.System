// Import Modules
const db = require('../config/connection');
const inquirer = require('inquirer');


// Refactored for ASYNC AWAIT
async function addEmployee() {
    try {
        // List Possible Managers
        const [manager] = await db.promise().query("SELECT id, first_name, last_name FROM employees")
        const managerChoices = manager.map(man => {
            return {
                name: `${man.first_name} ${man.last_name}`,
                value: man.id
            }
        })
        // List Possible Roles
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
        // Add Employee
        await db.promise().query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [first_name, last_name, role_id, manager_id])
        return `${first_name} ${last_name} has been added to the database`
    } catch (err) {
        console.log(`Oh no! Something went wrong...`, err)
    }
}


// Export
module.exports = addEmployee;

// Original
// function addEmployee() {
//     // Show Possible Managers
//     db.promise().query(`SELECT id, first_name, last_name FROM employees`)
//         .then((manager) => {
//             console.log('This is the manager choices -----', manager[0]);
//             // console.log(manager[0]);

//             const managerChoices = manager[0].map(man => {
//                 return {
//                     name: `${man.first_name} ${man.last_name}`,
//                     value: man.id
//                 }
//             })
//             // Show current Roles
//             db.promise().query(`SELECT role_id, role_title FROM roles`)
//                 .then((results) => {
//                     // console.log(results[0]);
//                     const choices = results[0].map(role => {
//                         return {
//                             name: role.role_title,
//                             value: role.role_id
//                         }
//                     })
//                     console.table(managerChoices)
//                     // console.table(choices)
//                     // Ask employee info
//                     const addEmployeeQuestions = [
//                         {
//                             name: "first_name",
//                             message: "Enter employee's first name",
//                         },
//                         {
//                             name: "last_name",
//                             message: "Enter employee's last name",
//                         },
//                         {
//                             name: "role_id",
//                             message: "What is the employee's title?",
//                             type: "list",
//                             choices
//                         },
//                         {
//                             name: "manager_id",
//                             message: "Who's is their manager?",
//                             type: "list",
//                             choices: [...managerChoices, { name: 'No Manager', value: null }],

//                         }
//                     ]
//                     inquirer.prompt(addEmployeeQuestions)
//                         .then(results => {
//                             console.log(`RESULTS -----`, results)

//                             // Add results to Employee Table
//                             db.promise().query('INSERT INTO employees SET ?', results)
//                                 .then(() =>
//                                     userChoice())
//                         })
//                 })
//         })
// }
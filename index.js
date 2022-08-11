// Node Application

// Import Modules
const inquirer = require('inquirer');
const mysql = require('mysql2');
const db = require('./config/connection')
const viewAllDepartments = require('./scripts/viewAllDepartments')
const viewAllEmployees = require('./scripts/viewAllEmployees')
const viewAllRoles = require('./scripts/viewAllRoles')
const addEmployee = require('./scripts/addEmployee')
const addDepartment = require('./scripts/addDepartment')
const addRole = require('./scripts/addRole')
const updateEmployee = require('./scripts/updateEmployee')

// here are the Bonus menu items
const updateEmpMan = require('./scripts/updateEmpMan')
const viewByManager = require('./scripts/viewByManager');
const viewByDepartment = require('./scripts/viewByDepartment')
const delDepartment = require('./scripts/delDepartment');
const delEmployee = require('./scripts/delEmployee');
const delRole = require('./scripts/delRole');
const viewDepartSalary = require('./scripts/viewDepartSalary')

// redo to async / await
async function userChoice() {
    const { choice } = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            choices: [
                'View All Employees',
                'View Employees By Manager',
                'View Employees By Department',
                'View All Departments',
                'View Department Salary',
                'View All Roles',
                'Add an Employee',
                'Add a Department',
                'Add a Role',
                `Update an Employee's Role`,
                `Update an Employee's Manager`,
                `Delete a Department`,
                `Delete a Role`,
                `Delete an Employee`,
                'Exit'
            ],
            message: 'What would you like to do?',
        }
    ])
    switch (choice) {
        case 'View All Employees':
            console.log(`You picked: `, choice)
            const allEmployees = await viewAllEmployees();
            console.table(allEmployees[0]);
            return userChoice();

        case 'View Employees By Manager':
            console.log(`You picked: `, choice)
            const viewManEmployees = await viewByManager();
            console.table(viewManEmployees[0]);
            return userChoice();

        case 'View Employees By Department':
            console.log(`You picked: `, choice)
            const viewEmpDepart = await viewByDepartment();
            console.table(viewEmpDepart[0]);
            return userChoice();

        case 'View All Departments':
            console.log(`You picked: `, choice)
            const allDepartments = await viewAllDepartments();
            console.table(allDepartments[0]);
            return userChoice();

        case 'View Department Salary':
            console.log(`You picked: `, choice)
            const departSalary = await viewDepartSalary();
            console.table(departSalary[0]);
            return userChoice();

        case 'View All Roles':
            console.log(`You picked: `, choice)
            const allRoles = await viewAllRoles();
            console.table(allRoles[0]);
            return userChoice();

        case 'Add an Employee':
            console.log(`You picked: `, choice)
            const employee = await addEmployee();
            console.log(employee);
            return userChoice();

        case 'Add a Department':
            console.log(`You picked: `, choice)
            const department = await addDepartment();
            console.log(department);
            return userChoice();

        case 'Add a Role':
            console.log(`You picked: `, choice)
            const role = await addRole();
            console.log(role);
            return userChoice();

        case `Update an Employee's Role`:
            console.log(`You picked: `, choice)
            const update = await updateEmployee();
            console.log(update);
            return userChoice();

        case `Update an Employee's Manager`:
            console.log(`You picked: `, choice)
            const empMan = await updateEmpMan();
            console.log(empMan);
            return userChoice();

        case `Delete a Department`:
            console.log(`You picked: `, choice)
            const delDep = await delDepartment();
            console.log(delDep);
            return userChoice();

        case `Delete a Role`:
            console.log(`You picked: `, choice)
            const deleteRole = await delRole();
            console.log(deleteRole);
            return userChoice();

        case `Delete an Employee`:
            console.log(`You picked: `, choice)
            const delEmp = await delEmployee();
            console.log(delEmp);
            return userChoice();

        default:
            // Exit
            console.log('Exiting Application... bye')
            process.exit(1);

    }
}


// CLI Application Start
function init() {
    // Menu Grpahic
    console.log('**************************************************************')
    console.log('*                                                            *')
    console.log('*                                                            *')
    console.log('*                    The Employee Menu                       *')
    console.log('*                                by LK                       *')                       
    console.log('*                                                            *')
    console.log('*                                                            *')
    console.log('**************************************************************')

    // Call function
    userChoice();
}
init();








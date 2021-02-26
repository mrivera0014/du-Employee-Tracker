const inquirer = require('inquirer')
const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Canelo!14',
    database: 'employees_DB'
})

connection.connect((err) => {
    if (err) throw err;
    console.log(`Connected as id ${connection.threadId}`)
    start()
})

const start = () => {
    inquirer.prompt(
        {
            type: 'list',
            message: 'What would you like to view?',
            choices: ['Department', 'Employee', 'Role', 'Exit'],
            name: 'startOptions'
        }).then(choice => {
            switch (choice.startOptions) {
                case 'Department':
                    viewDepartments()
                    break;
                case 'Employee':
                    viewEmployees()
                    break;
                case 'Role':
                    viewRoles()
                    break;
                case 'Exit':
                    connection.end()
                    break;
                default:
                    start()
            }
        })
}

const viewDepartments = () => {
    inquirer.prompt(
        {
            type: 'list',
            message: 'What would you like to do??',
            choices: ['View All Departments', 'Add Department', 'Remove Department', 'Exit', 'Go Back'],
            name: 'departmentChoices'
        }).then(choice => {
            switch (choice.departmentChoices) {
                case 'View All Departments':
                    readDepartments()
                    break;
                case 'Add Department':
                    addDepartment()
                    break;
                case 'Remove Department':
                    deleteDepartment()
                    break;
                case 'Exit':
                    connection.end()
                    break;
                default:
                    start()
            }
        })
}

const readDepartments = () => {
    console.log('Viewing all departments. . .')
    const query = connection.query('SELECT * FROM department',
        (err, data) => {
            if (err) throw err
            console.log(data)
            start()
        }
    )
    console.log(query.sql)
}

const deleteDepartment = () => {

    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the department you want to delete?',
            name: 'departmentDeleted'
        }
    ]).then((answer) => {
        // console.log(answer.departmentAdded)
        remove(answer.departmentDeleted) //do I need two arguments?
    })
}

const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the department you want to add?',
            name: 'departmentAdded'
        }
    ]).then((answer) => {
        // console.log(answer.departmentAdded)
        console.log('Adding department')
        connection.query('INSERT INTO department SET ?',
            {
                name: answer.departmentAdded
            }, (err) => {
                if (err) throw err;
                // console.log(departmentAdded)
                // console.log(data)
                start()
            }
        )
    })
}

const viewEmployees = () => {
    inquirer.prompt(
        {
            type: 'list',
            message: 'What would you like to do??',
            choices: ['View All Employees', 'Add Employee', 'Remove Employee', 'Exit', 'Go Back'],
            name: 'employeeChoices'
        }).then(choice => {
            switch (choice.employeeChoices) {
                case 'View All Employees':
                    readEmployees()
                    break;
                case 'Add Employee':
                    addEmployee()
                    break;
                case 'Remove Employee':
                    deleteEmployee()
                    break;
                case 'Exit':
                    connection.end()
                    break;
                default:
                    start()
            }
        })
}

const readEmployees = () => {
    console.log('Viewing all employees. . .')
    const query = connection.query('SELECT * FROM employee',
        (err, data) => {
            if (err) throw err
            console.log(data)
            start()
        }
    )
    console.log(query.sql)
}

const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the first name of the employee you want to add?',
            name: 'employeeAddedFirst'
        },
        {
            type: 'input',
            message: 'What is the last name of the employee you want to add?',
            name: 'employeeAddedLast'
        }
    ]).then((answer) => {
        console.log(answer.employeeAdded)
        console.log('Adding employee')
        connection.query('INSERT INTO employee SET ?', [
            {
                first_name: answer.employeeAddedFirst,
            },
            {
                last_name: answer.employeeAddedLast,
            },
        ]
            , (err) => {
                if (err) throw err;
                start()
            }
        )
    })
}

const viewRoles = () => {
    inquirer.prompt(
        {
            type: 'list',
            message: 'What would you like to do??',
            choices: ['View All Roles', 'Add Role', 'Remove Role', 'Exit', 'Go Back'],
            name: 'roleChoices'
        }).then(choice => {
            switch (choice.roleChoices) {
                case 'View All Roles':
                    readRoles()
                    break;
                case 'Add Role':
                    addRole()
                    break;
                case 'Remove Role':
                    deleteRole()
                    break;
                case 'Exit':
                    connection.end()
                    break;
                default:
                    start()
            }
        })
}

const readRoles = () => {
    console.log('Viewing all roles. . .')
    const query = connection.query('SELECT * FROM role',
        (err, data) => {
            if (err) throw err
            console.log(data)
            start()
        }
    )
    console.log(query.sql)
}

const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the title of the role you want to add?',
            name: 'roleTitle'
        },
        {
            type: 'input',
            message: 'What is the salary of the title you added?',
            name: 'roleSalary'
        }
    ]).then((answer) => {
        console.log(answer.roleTitle)
        console.log(answer.roleSalary)
        console.log('Adding role')
        connection.query('INSERT INTO role SET ?', [
            {
                title: answer.roleTitle,
            },
            {
                salary: answer.roleSalary,
            },
        ]
            , (err) => {
                if (err) throw err;
                start()
            }
        )
    })
}
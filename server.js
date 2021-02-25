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
            name: 'start'
        }).then(choice => {
            switch (choice.start) {
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
        remove(answer.departmentAdded) //do I need two arguments?
    })
}

const remove = (departmentDeleted) => {
    console.log('Deleting department')
    connection.query('DELETE FROM department WHERE ?',
        {
            name: departmentDeleted
        }, (err) => {
            if (err) throw err;
            // console.log(departmentAdded)
            // console.log(data)
            start()
        }
    )
}


// const updateDepartment = () => {
//     console.log('Updating department. . .')
//     const query = connection.query('UPDATE department SET ?',
//         [
//             {
//                 name: 'stocking'
//             }
//         ],
//         (err, res) => {
//             if (err) throw err
//             console.log(`${res.affectedRows} department updated!\n`)
//             deleteDepartment()
//         }
//     )
//     console.log(query.sql)
// }

const addDepartment = (req) => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the department you want to add?',
            name: 'departmentAdded'
        }
    ]).then((answer) => {
        // console.log(answer.departmentAdded)
        add(answer.departmentAdded) //do I need two arguments?
    })
}

const add = (departmentAdded) => {
    console.log('Adding department')
    connection.query('INSERT INTO department SET ?',
        {
            name: departmentAdded
        }, (err) => {
            if (err) throw err;
            // console.log(departmentAdded)
            // console.log(data)
            start()
        }
    )
}


// const viewDepartments = () => {
//     inquirer.prompt
// }
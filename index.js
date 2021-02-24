
//create constructor function for adding employees, roles, and departments -- use team profile generator for reference
// -- name above functions employee.js, roles.js, etc.
//create index.js and move start() to that file -- this file will run all functionality

const start = () => {
    inquirer.prompt(
        {
            type: 'list',
            message: 'What would you like to do?',
            choices: ['View All Employees', 'View All Employees by Department', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'],
            name: 'start'
        }).then(choice => {
            switch (choice.start) {
                case 'View All Employees':
                    allEmployees()
                    break;
                case 'View All Employees by Department':
                    employeesByDepartment()
                    break;
                case 'View All Employees by Manager':
                    employeesByManager()
                    break;
                case 'Add Employee':
                    addEmployee()
                    break;
                case 'Remove Employee':
                    removeEmployee()
                    break;
                default:
                    start()
            }
        })
}
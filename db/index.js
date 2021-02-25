const connection = require('./connection')

class DB {
    constructor(connection) {
        this.connection = connection
    }
    readEmployees() {
        return this.connection.query(
            'SELECT employee.id, employee.first_name,employee.last_name, role.title, department.name AS department, CONCAT(manager.first_name," ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id'
        )
    }
    readDepartments() {
        return this.connection.query('SELECT * FROM department')
    }
    readRoles() {
        return this.connection.query('SELECT * FROM role')
    }
    addDepartment(departmentAdded) {
        return this.connection.query('INSERT INTO department SET ?', departmentAdded)
    }
    addRole(roleAdded) {
        return this.connection.query('INSERT INTO role SET ?', roleAdded)
    }
    addEmployee(employeeAdded) {
        return this.connection.query('INSERT INTO employee SET ?', employeeAdded)
    }
}


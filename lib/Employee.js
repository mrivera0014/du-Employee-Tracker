class Employee {
    constructor(firstName, lastName, roleId, managerId) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.roleId = roleId;
        this.managerId = managerId
    }
    getFirstName() {
        return this.firstName
    }
    getLastName() {
        return this.LastName
    }
    getRoleId() {
        return this.roleId
    }
    getManagerId() {
        return this.managerId
    }
}

module.exports = Employee;
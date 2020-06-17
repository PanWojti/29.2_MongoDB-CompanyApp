const Employee = require('../employee.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

after(() => {
  mongoose.models = {};
});

describe('Employee', () => {

  it('should throw an error if no arguments are passed on', () => {
    const emp = new Employee({}); // create new Employee, but don't set no attr values
    emp.validate(err => {
      expect(err.errors.firstName && err.errors.lastName && err.errors.department).to.exist;
    });
  });

  it('should not throw an error if all arguments are correct', () => {
    const firstName = 'John';
    const lastName = 'Doe';
    const department = 'IT';
    const emp = new Employee({firstName: firstName, lastName: lastName, department: department}); // create new Employee with correct attributes
    emp.validate(err => {
      expect(err).to.not.exist;
    });
  });

  it('should throw an error if one or two arguments are missing', () => {
    const firstName = 'John';
    const lastName = 'Doe';
    const department = 'IT';
    const emp = new Employee({ firstName: firstName }); // create new Employee with two attributes missing
    emp.validate(err => {
      expect(err.errors.lastName && err.errors.department).to.exist;
    });
    const emp1 = new Employee({ firstName: firstName, lastName: lastName }); // create new Employee with one attribute missing
    emp1.validate(err => {
      expect(err.errors.department).to.exist;
    });
  });

  it('should throw an error if at least one arg is not a string', () => {
    const firstName = [];
    const lastName = 'Doe';
    const department = 'IT';
    const emp = new Employee({firstName: firstName, lastName: lastName, department: department}); // create new Employee with correct attributes
    emp.validate(err => {
      expect(err.errors.firstName).to.exist;
    });
  });

});

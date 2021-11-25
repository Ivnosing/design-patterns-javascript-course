class Address {
  constructor(suite, street, city) {
    this.suite = suite;
    this.street = street;
    this.city = city;
  }

  toString() {
    return `Suite ${this.suite}, ${this.street}, ${this.city}`;
  }
}

class Employee {
  constructor(name, address) {
    this.name = name;
    this.address = address;
  }

  toString() {
    return `${this.name} works at ${this.address}`;
  }
}

class Serializer {
  constructor(...types) {
    this.types = types;
  }

  recurse(object, fn) {
    const index = this.types.findIndex(t => t.name === object.constructor.name);

    if (index >= 0) {
      fn(index, object);

      for (const key in object) {
        if (object.hasOwnProperty(key) && object[key] && typeof object[key] === 'object') {
          this.recurse(object[key], fn);
        }
      }
    }
  }

  markRecursive(object) {
    this.recurse(object, (index, obj) => {
      obj['typeIndex'] = index;
    });
  }

  unmarkRecursive(object) {
    this.recurse(object, (index, obj) => {
      delete obj.typeIndex;
    });
  }

  reconstructRecursive(object) {
    if (object.hasOwnProperty('typeIndex')) {
      const type = this.types[object.typeIndex];
      const obj = new type();

      for (const key in object) {
        if (object.hasOwnProperty(key) && object[key]) {
          obj[key] = this.reconstructRecursive(object[key]);
        } else {
          obj[key] = object[key];
        }
      }

      delete obj.typeIndex;
      return obj;
    }

    return object;
  }

  clone(object) {
    this.markRecursive(object);
    const copy = JSON.parse(JSON.stringify(object));
    this.unmarkRecursive(object);
    return this.reconstructRecursive(copy);
  }
}

class EmployeeFactory {
  static _newEmployee(proto, name, suite) {
    const copy = EmployeeFactory.serializer.clone(proto);
    copy.name = name;
    copy.address.suite = suite;
    return copy;
  }

  static newMainOfficeEmployee(name, suite) {
    return EmployeeFactory._newEmployee(EmployeeFactory.main, name, suite);
  }

  static newAuxOfficeEmployee(name, suite) {
    return EmployeeFactory._newEmployee(EmployeeFactory.aux, name, suite);
  }
}
EmployeeFactory.serializer = new Serializer(Employee, Address);
EmployeeFactory.main = new Employee(null, new Address(null, '123 East Dr', 'London'));
EmployeeFactory.aux = new Employee(null, new Address(null, '200 London Rd', 'Oxford'));

const john = EmployeeFactory.newMainOfficeEmployee('John', 4321);
const jane = EmployeeFactory.newAuxOfficeEmployee('Jane', 222);

console.log(john.toString());
console.log(jane.toString());

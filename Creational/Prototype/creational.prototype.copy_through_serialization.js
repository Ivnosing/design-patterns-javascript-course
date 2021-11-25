class Address {
  constructor(street, city, country) {
    this.street = street;
    this.city = city;
    this.country = country;
  }

  toString() {
    return `Address: ${this.street}, ${this.city}, ${this.country}`;
  }
}

class Person {
  constructor(name, address) {
    this.name = name;
    this.address = address;
  }

  toString() {
    return `${this.name} lives at ${this.address}`;
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

const john = new Person('John', new Address('123 London St', 'London', 'UK'));

const serializer = new Serializer(Person, Address);

const jane = serializer.clone(john);
jane.name = 'Jane';
jane.address.street = '321 Angel St';

console.log(john);
console.log(jane);
console.log(john.toString());
console.log(jane.toString());

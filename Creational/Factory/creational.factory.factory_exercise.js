class Person {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

class PersonFactory {
  constructor() {
    this.peopleCount = 0;
  }
  
  createPerson(name) {
    const id = this.peopleCount++;
    return new Person(id, name);
  }
}

const pf = new PersonFactory();

const p1 = pf.createPerson('Iván');
console.log(p1);
const p2 = pf.createPerson('Aida');
console.log(p2);
const p3 = pf.createPerson('Jose');
console.log(p3);

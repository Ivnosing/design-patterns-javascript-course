class Property {
  constructor(value, name = '') {
    this._value = value;
    this.name = name;
  }

  get value() {
    return this._value;
  }

  set value(value) {
    if (this._value === value) return;
    console.log(`Assigning ${value} to ${this.name}`);
    this._value = value;
  }
}

class Creature {
  constructor() {
    this._agility = new Property(10, 'agility');
  }

  get agility() {
    return this._agility;
  }

  set agility(value) {
    this._agility.value = value;
  }
}

const creature = new Creature();
creature.agility = 5;
console.log(creature.agility.value);

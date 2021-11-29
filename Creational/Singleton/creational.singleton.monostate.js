class ChiefExecutiveOfficer {
  get name() {
    return ChiefExecutiveOfficer._name;
  }
  set name(value) {
    ChiefExecutiveOfficer._name = value;
  }

  get age() {
    return ChiefExecutiveOfficer._age;
  }
  set age(value) {
    ChiefExecutiveOfficer._age = value;
  }

  get pronoun() {
    return ChiefExecutiveOfficer._pronoun;
  }
  set pronoun(value) {
    ChiefExecutiveOfficer._pronoun = value;
  }

  toString() {
    return `CEO's name is ${this.name} and ${this.pronoun} is ${this.age} years old`;
  }
}

ChiefExecutiveOfficer._age = undefined;
ChiefExecutiveOfficer._name = undefined;
ChiefExecutiveOfficer._pronoun = undefined;

const ceo1 = new ChiefExecutiveOfficer();
ceo1.name = 'Adam Smith';
ceo1.age = 55;
ceo1.pronoun = 'he';

const ceo2 = new ChiefExecutiveOfficer();
ceo2.name = 'Jane Gold';
ceo2.age = 66;
ceo2.pronoun = 'she';

console.log(ceo1.toString());
console.log(ceo2.toString());

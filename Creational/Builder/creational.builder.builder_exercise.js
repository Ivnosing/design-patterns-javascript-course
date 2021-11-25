class Class {
  static get indentSize() {
    return 2;
  }

  constructor(name) {
    this.name = name;
    this.fields = [];
  }

  toString() {
    const code = [];
    const i = ' '.repeat(Class.indentSize);
    code.push(`class ${this.name} {`);

    if (this.fields.length) {
      code.push(`${i}constructor(${this.fields.join(', ')}) {`);

      for (const field of this.fields) {
        code.push(`${i + i}this.${field} = ${field};`);
      }

      code.push(`${i}}`);
    }

    code.push(`}`);

    return code.join('\n');
  }
}

class CodeBuilder {
  constructor(className) {
    this.class = new Class(className);
  }

  addField(name) {
    this.class.fields.push(name);
    return this;
  }

  toString() {
    return this.class.toString();
  }
}

const cb = new CodeBuilder('Person');
cb.addField('name').addField('age');
console.log(cb.toString());

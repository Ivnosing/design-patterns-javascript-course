class SingleValue {
  get value() {
    return this._value;
  }

  constructor(value) {
    this._value = value;
  }
}

class ManyValues extends Array {
  get value() {
    return this.reduce((acc, curr) => acc + (typeof curr === 'number' ? curr : curr.value), 0);
  }

  constructor(value) {
    super();
    value && this.push(value);
  }
}

const sum = containers => containers.reduce((acc, curr) => acc + curr.value, 0);

const single = new SingleValue(11);
const many = new ManyValues();

many.push(22);
many.push(33);

console.log(sum([single, many]));

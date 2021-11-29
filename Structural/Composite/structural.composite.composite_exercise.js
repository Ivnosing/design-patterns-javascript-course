class SingleValue {
  constructor(value) {
    this.value = value;
  }

  [Symbol.iterator]() {
    let returned = false;
    return {
      next: () => ({
        value: this.value,
        done: returned++
      })
    };
  }
}

class ManyValues extends Array {}

const sum = containers => {
  let result = 0;
  for (let c of containers)
    for (let i of c)
      result += i;
  return result;
};

const single = new SingleValue(11);
const many = new ManyValues();

many.push(22);
many.push(33);

console.log(sum([single, many]));

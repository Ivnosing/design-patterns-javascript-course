class Singleton {
  constructor() {
    const instance = this.constructor.instance;

    if (instance) {
      return instance;
    }

    this.constructor.instance = this;
  }
}

const s1 = new Singleton();
const s2 = new Singleton();
console.log('Identical? ', s1 === s2);

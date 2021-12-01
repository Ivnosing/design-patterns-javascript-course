class Bird {
  constructor(age = 0) {
    this.age = age;
  }

  fly() {
    return this.age < 10 ? 'flying' : 'too old';
  }
}

class Lizard {
  constructor(age = 0) {
    this.age = age;
  }

  crawl() {
    return this.age > 1 ? 'crawling' : 'too young';
  }
}

class Dragon {
  #bird;
  #lizard;
  #age;

  get age() {
    return this.#age;
  }

  set age(age) {
    this.#bird.age = this.#lizard.age = this.#age = age;
  }

  constructor(bird = new Bird(), lizard = new Lizard(), age = 0) {
    this.#bird = bird;
    this.#lizard = lizard;
    this.age = age;
  }

  fly() {
    return this.#bird.fly();
  }

  crawl() {
    return this.#lizard.crawl();
  }
}

const bird = new Bird(5);
const lizard = new Lizard(7);

const dragon = new Dragon(bird, lizard, 900);

console.log(dragon.fly());
console.log(dragon.crawl());

dragon.age = 5;

console.log(dragon.fly());
console.log(dragon.crawl());

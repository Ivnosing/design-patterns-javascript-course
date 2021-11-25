const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class HotDrink {
  consume() {
    /** abstract */
  }
}

class Tea extends HotDrink {
  consume() {
    console.log('This tea is nice with lemon!');
  }
}

class Coffee extends HotDrink {
  consume() {
    console.log('This coffee is delicious!');
  }
}

class HotDrinkFactory {
  prepare(amount) {
    /** abstract */
  }
}

class TeaFactory extends HotDrinkFactory {
  prepare(amount) {
    console.log(`Put in tea bag, boil water, pour ${amount}ml`);
    return new Tea();
  }
}

class CoffeeFactory extends HotDrinkFactory {
  prepare(amount) {
    console.log(`Grind some beans, boil water, pour ${amount}ml`);
    return new Coffee();
  }
}

const AvailableDinks = Object.freeze({
  coffee: CoffeeFactory,
  tea: TeaFactory
});

class HotDrinkMachine {
  constructor() {
    this.factories = {};

    for (const drink in AvailableDinks) {
      this.factories[drink] = new AvailableDinks[drink]();
    }
  }

  interact(consumer) {
    rl.question('Please specify drink and amount (e.g. tea 50): ', answer => {
      const [drink, amount] = answer.split(' ');
      const d = this.factories[drink].prepare(amount);
      rl.close();
      consumer(d);
    });
  }

  // Before refactoring
  // makeDrink(type) {
  //   switch (type) {
  //     case 'tea':
  //       return new TeaFactory().prepare(200);
  //     case 'coffee':
  //       return new CoffeeFactory().prepare(200);
  //     default:
  //       throw new Error('');
  //   }
  // }
}

const machine = new HotDrinkMachine();

machine.interact(drink => {
  drink.consume();
});

// Before refactoring
// rl.question('Which drink?', answer => {
//   const drink = machine.makeDrink(answer);
//   drink.consume();
//   rl.close();
// });

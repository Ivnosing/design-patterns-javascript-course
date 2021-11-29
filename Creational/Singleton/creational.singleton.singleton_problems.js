class MyDatabase {
  constructor() {
    const instance = this.constructor.instance;

    if (instance) {
      return instance;
    }

    this.constructor.instance = this;

    this.capitals = {
      Tokyo: 13929286,
      Beijing: 21542000,
      Madrid: 3266126,
      Paris: 2241346,
      'Mexico City': 8918653
    };
  }

  getPopulation(capital) {
    return this.capitals[capital];
  }
}

// ↑↑↑ low-level module

// ↓↓↓ high-level module
// Provide singleton as dependency
// class SingletonRecordFinder {
//   totalPopulation(...capitals) {
//     return capitals
//       .map(capital => new MyDatabase().getPopulation(capital))
//       .reduce((sum, curr) => sum + curr, 0);
//   }
// }

class SingletonRecordFinder {
  constructor(database = new MyDatabase()) {
    this.database = database;
  }

  totalPopulation(...capitals) {
    return capitals
      .map(capital => this.database.getPopulation(capital))
      .reduce((sum, curr) => sum + curr, 0);
  }
}

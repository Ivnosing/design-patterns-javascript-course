class SingletonTester {
  static isSingleton(generator) {
    const a = generator();
    const b = generator();
    return a === b;
  }
}

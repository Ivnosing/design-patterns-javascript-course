class Car {
  drive() {
    console.log('Car is being driven');
  }
}

class CarProxy {
  constructor(driver) {
    this.driver = driver;
    this._car = new Car();
  }

  drive() {
    if (this.driver.age >= 16) {
      this._car.drive();
    } else {
      console.log(`Driver too young`);
    }
  }
}

class Driver {
  constructor(age) {
    this.age = age;
  }
}

new CarProxy(new Driver(15)).drive();
new CarProxy(new Driver(18)).drive();

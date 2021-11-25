class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }



  // Factory method option
  // static newCartesianPoint(x, y) {
  //   return new Point(x, y);
  // }

  // static newPolarPoint(rho, theta) {
  //   return new Point(rho * Math.cos(theta), rho * Math.sin(theta));
  // }



  // Factory instance option.
  // Need to change methods to not static
  // static get factory() {
  //   return new PointFactory();
  // }
}

// Could instantiate instead of using static methods
// Only if you need some state or data related to an instance
class PointFactory {
  static newCartesianPoint(x, y) {
    return new Point(x, y);
  }

  static newPolarPoint(rho, theta) {
    return new Point(rho * Math.cos(theta), rho * Math.sin(theta));
  }
}

const p1 = PointFactory.newCartesianPoint(4, 5);
console.log(p1);

const p2 = PointFactory.newPolarPoint(5, Math.PI / 2);
console.log(p2);

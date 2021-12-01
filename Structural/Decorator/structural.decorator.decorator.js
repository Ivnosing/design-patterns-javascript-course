class Shape {}

class Circle extends Shape {
  constructor(radius = 0) {
    super();
    this.radius = radius;
  }

  resize(factor) {
    this.radius *= factor;
  }

  toString() {
    return `A circle of radius ${this.radius}`;
  }
}

class ColoredShape extends Shape {
  constructor(shape, color) {
    super();
    this.shape = shape;
    this.color = color;
  }

  toString() {
    return `${this.shape.toString()} of color ${this.color}`;
  }
}

class TransparentShape extends Shape {
  constructor(shape, transparency) {
    super();
    this.shape = shape;
    this.transparency = transparency;
  }

  toString() {
    return `${this.shape.toString()} of transparency ${this.transparency * 100}%`;
  }
}

const circle = new Circle(2);
console.log(circle.toString());

const redCircle = new ColoredShape(circle, 'red');
redCircle.shape.resize(2);
console.log(redCircle.toString());

const redTransparentCircle = new TransparentShape(redCircle, 0.5);
console.log(redTransparentCircle.toString());

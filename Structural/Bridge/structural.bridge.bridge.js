class Renderer {
  /**
   * Renders a shape in a specific format.
   * @param {string} shape
   */
  render(shape) {}
}

/**
 * @class VectorRenderer
 * @extends {Renderer}
 */
class VectorRenderer extends Renderer {
  render(shape) {
    console.log(`Rendering a shape:\n${shape}`);
  }
}

/**
 * @class RasterRenderer
 * @extends {Renderer}
 */
class RasterRenderer extends Renderer {
  render(shape) {
    console.log(`Rendering a shape in pixels:\n${shape}`);
  }
}

class Shape {
  /**
   * Creates an instance of Shape.
   * @param {Renderer} renderer
   */
  constructor(renderer) {
    this.renderer = renderer;
  }

  draw() {}
}

/**
 * @class Circle
 * @extends {Shape}
 */
class Circle extends Shape {
  /**
   * Creates an instance of Circle.
   * @param {Renderer} renderer
   * @param {number} radius
   */
  constructor(renderer, radius) {
    super(renderer);
    this.radius = radius;
  }

  draw() {
    const shape = `Circle of radius ${this.radius}\n`;
    this.renderer.render(shape);
  }

  resize(factor) {
    this.radius *= factor;
  }
}

/**
 * @class Square
 * @extends {Shape}
 */
class Square extends Shape {
  /**
   * Creates an instance of Square.
   * @param {Renderer} renderer
   * @param {number} side
   */
  constructor(renderer, side) {
    super(renderer);
    this.side = side;
  }

  draw() {
    const shape = `Square of side ${this.side}\n`;
    this.renderer.render(shape);
  }

  resize(factor) {
    this.side *= factor;
  }
}

// Shape - Square, Circle, Triangle...
// Renderer - Raster, Vector...

const raster = new RasterRenderer();
const vector = new VectorRenderer();
const circle = new Circle(raster, 5);
const square = new Square(vector, 10);

circle.draw();
square.draw();

circle.resize(3);
square.resize(2);

circle.draw();
square.draw();

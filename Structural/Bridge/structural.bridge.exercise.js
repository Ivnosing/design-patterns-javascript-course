class Renderer {
  get whatToRenderAs() {
    throw new Error('abstract');
  }
}

class VectorRenderer extends Renderer {
  get whatToRenderAs() {
    return 'lines';
  }
}

class RasterRenderer extends Renderer {
  get whatToRenderAs() {
    return 'pixels';
  }
}

class Shape {
  constructor(renderer, name) {
    this.renderer = renderer;
    this.name = name;
  }

  toString() {
    return `Drawing ${this.name} as ${this.renderer.whatToRenderAs}`;
  }
}

class Triangle extends Shape {
  constructor(renderer) {
    super(renderer, 'triangle');
  }
}

class Square extends Shape {
  constructor(renderer) {
    super(renderer, 'square');
  }
}

const triangle = new Triangle(new RasterRenderer());
console.log(triangle.toString());


// Avoid this ↓↓↓
// class VectorSquare extends Square {
//   toString() {
//     return `Drawing square as lines`;
//   }
// }

// class RasterSquare extends Square {
//   toString() {
//     return `Drawing square as pixels`;
//   }
// }

// imagine VectorTriangle and RasterTriangle are here too

class Square {
  constructor(side) {
    this.side = side;
  }
}

class SquareToRectangleAdapter {
  constructor(square) {
    this._width = square.side;
    this._height = square.side;
  }
}

function area(rectangle) {
  return rectangle._width * rectangle._height;
}

const sq = new Square(123);
console.log(area(new SquareToRectangleAdapter(sq)));

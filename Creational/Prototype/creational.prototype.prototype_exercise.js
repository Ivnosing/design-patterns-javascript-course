class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  deepCopy() {
    return new Point(this.x, this.y);
  }
}

class Line {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  deepCopy() {
    return new Line(this.start.deepCopy(), this.end.deepCopy());
  }
}

const l1 = new Line(new Point(1, 2), new Point(3, 4));
const l2 = l1.deepCopy();

l2.start.x = 7;
l2.start.y = 5;
l2.end.x = 11;
l2.end.y = 2;

console.log(l1);
console.log(l2);

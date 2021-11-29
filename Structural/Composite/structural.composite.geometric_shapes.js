class GraphicObject {
  get name() {
    return this._name;
  }

  constructor(name = 'Group ' + GraphicObject.count++) {
    this._name = name;
    this.color = undefined;
    this.children = [];
  }

  print(buffer, depth) {
    buffer.push('*'.repeat(depth));
    if (depth > 0) buffer.push(' ');
    if (this.color) buffer.push(this.color + ' ');
    buffer.push(this.name);
    buffer.push('\n');

    for (let child of this.children) child.print(buffer, depth + 1);
  }

  toString() {
    const buffer = [];
    this.print(buffer, 0);
    return buffer.join('');
  }
}
GraphicObject.count = 0;

class Circle extends GraphicObject {
  constructor(color) {
    super('Circle');
    this.color = color;
  }
}

class Square extends GraphicObject {
  constructor(color) {
    super('Square');
    this.color = color;
  }
}

const drawing = new GraphicObject();
drawing.children.push(new Square('Red'));
drawing.children.push(new Square('Yellow'));

const group = new GraphicObject();
group.children.push(new Circle('Blue'));
group.children.push(new Square('Blue'));
drawing.children.push(group);

console.log(drawing.toString());

class Tag {
  static get indentSize() { return 2; }
  
  constructor(name = '', text = '') {
    this.name = name;
    this.text = text;
    this.children = [];
  }

  toStringImpl(indent = 0) {
    const html = [];
    const i = ' '.repeat(indent * Tag.indentSize);
    html.push(`${i}<${this.name}>\n`);

    if (this.text.length > 0) {
      html.push(i + i);
      html.push(this.text);
      html.push('\n');
    }

    for (const child of this.children) {
      html.push(child.toStringImpl(indent + 1));
    }

    html.push(`${i}</${this.name}>\n`);
    return html.join('');
  }

  toString() {
    return this.toStringImpl(0);
  }

  // optional
  static create(name) {
    return new HtmlBuilder(name);
  }
}

class HtmlBuilder {
  constructor(rootName) {
    this.root = new Tag(rootName);
    this.rootName = rootName;
  }

  addChild(childName, childText) {
    const child = new Tag(childName, childText);
    this.root.children.push(child);
  }

  addChildFluent(childName, childText) {
    const child = new Tag(childName, childText);
    this.root.children.push(child);
    return this;
  }

  toString() {
    return this.root.toString();
  }

  clear() {
    this.root = new Tag(this.rootName);
  }

  build() {
    return this.root;
  }
}



const words = ['Hello', 'world'];


// const builder = new HtmlBuilder('ul');
// optional
const builder = Tag.create('ul');

for (const word of words) {
  builder.addChild('li', word);
}

console.log(builder.toString());

builder.clear();
builder
  .addChildFluent('li', 'foo')
  .addChildFluent('li', 'bar')
  .addChildFluent('li', 'baz');

console.log(builder.toString());
  
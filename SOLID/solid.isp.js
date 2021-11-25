const aggregation = (baseClass, ...mixins) => {
  class Base extends baseClass {
    constructor(...args) {
      super(...args);
      mixins.forEach(mixin => {
        copyProps(this, new mixin());
      });
    }
  }

  const copyProps = (target, source) => {
    // this function copies all properties and symbols, filtering out some special ones
    Object.getOwnPropertyNames(source)
      .concat(Object.getOwnPropertySymbols(source))
      .forEach(prop => {
        if (
          !prop.match(
            /^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/
          )
        )
          Object.defineProperty(target, prop, Object.getOwnPropertyDescriptor(source, prop));
      });
  };
  mixins.forEach(mixin => {
    // outside constructor() to allow aggregation(A,B,C).staticFunction() to be called etc.
    copyProps(Base.prototype, mixin.prototype);
    copyProps(Base, mixin);
  });
  return Base;
};

class Machine {
  constructor() {
    if (this.constructor.name === 'Machine') throw new Error('Machine is abstract!');
  }

  print(doc) {}
  fax(doc) {}
  scan(doc) {}
}

class MultiFunctionPrinter extends Machine {
  print(doc) {
    //
  }

  fax(doc) {
    //
  }

  scan(doc) {
    //
  }
}

class NotImplementedError extends Error {
  constructor(name) {
    const msg = `${name} is not implemented!`;
    super(msg);
    // maintain proper stack trace
    if (Error.captureStackTrace) Error.captureStackTrace(this, NotImplementedError);
    // your custom stuff here :)
  }
}

class OldFashionedPrinter extends Machine {
  print(doc) {
    // ok
  }

  // omitting this is the same as no-op impl

  // fax(doc) {
  //   // do nothing
  // }

  scan(doc) {
    // throw new Error('not implemented!');
    throw new NotImplementedError('OldFashionedPrinter.scan');
  }
}

// solution
class Printer {
  constructor() {
    if (this.constructor.name === 'Printer') throw new Error('Printer is abstract!');
  }

  print() {}
}

class Scanner {
  constructor() {
    if (this.constructor.name === 'Scanner') throw new Error('Scanner is abstract!');
  }

  scan() {}
}

class Photocopier extends aggregation(Printer, Scanner) {
  print() {
    // IDE won't help you here
  }

  scan() {
    //
  }
}

// we don't allow this!
// const m = new Machine();

const printer = new OldFashionedPrinter();
printer.fax(); // nothing happens
//printer.scan();

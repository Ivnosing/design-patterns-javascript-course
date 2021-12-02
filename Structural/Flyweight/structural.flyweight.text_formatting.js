class TextRange {
  constructor(start, end) {
    this.start = start;
    this.end = end;
    this.capitalize = false;
  }

  covers(position) {
    return position >= this.start && position <= this.end;
  }
}

class FormattedText {
  constructor(plainText) {
    this.plainText = plainText;
    this.caps = new Array(plainText.length).fill(false);
  }

  capitalize(start, end) {
    for (let i = start; i <= end; ++i) {
      this.caps[i] = true;
    }
  }

  toString() {
    const buffer = [];

    for (const i in this.plainText) {
      const c = this.plainText[i];
      buffer.push(this.caps[i] ? c.toUpperCase() : c);
    }

    return buffer.join('');
  }
}

// Old ↑↑↑

// New ↓↓↓

class BetterFormattedText {
  constructor(plainText) {
    this.plainText = plainText;
    this.formatting = [];
  }

  addRange(start, end) {
    const range = new TextRange(start, end);
    this.formatting.push(range);
    return range;
  }

  toString() {
    return this.formatting.reduce((text, textRange) => {
      if (!textRange.capitalize) {
        return text;
      }

      const start = textRange.start;
      const end = textRange.end + 1;

      return text
        .slice(0, start)
        .concat(text.slice(start, end).toUpperCase())
        .concat(text.slice(end));
    }, this.plainText);
  }
}

const text = 'This is a brave new world';
const ft = new FormattedText(text);
ft.capitalize(10, 15);
console.log(ft.toString());

const bft = new BetterFormattedText(text);
bft.addRange(16, 19).capitalize = true;
console.log(bft.toString());

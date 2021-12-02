class WordToken {
  constructor() {
    this.capitalize = false;
  }
}

class Sentence {
  constructor(plainText) {
    this.words = plainText.split(' ');
    this.tokens = {};
  }

  at(index) {
    return (this.tokens[index] = new WordToken());
  }

  toString() {
    return this.words
      .map((word, index) => !this.tokens[index]?.capitalize ? word : word.toUpperCase())
      .join(' ');
  }
}

const sentence = new Sentence('alpha beta gamma');
sentence.at(1).capitalize = true;
console.log(sentence.toString());

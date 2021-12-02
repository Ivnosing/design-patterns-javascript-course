class Word {
  constructor(value) {
    this.value = value;
    this.capitalize = false;
  }
}

class Sentence {
  constructor(plainText) {
    this.words = plainText.split(' ').map(word => new Word(word));
  }

  at(index) {
    return this.words[index];
  }

  toString() {
    return this.words
      .map(word => (!word.capitalize ? word.value : word.value.toUpperCase()))
      .join(' ');
  }
}

const sentence = new Sentence('alpha beta gamma');
sentence.at(1).capitalize = true;
console.log(sentence.toString());

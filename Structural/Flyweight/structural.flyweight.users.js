class User {
  constructor(fullName) {
    this.fullName = fullName;
  }
}

// Old ↑↑↑

// New ↓↓↓

class BetterUser {
  constructor(fullName) {
    const getOrAdd = s => {
      const index = BetterUser.strings.indexOf(s);

      if (index !== -1) {
        return index;
      }

      BetterUser.strings.push(s);
      return BetterUser.strings.length - 1;
    };

    this.names = fullName.split(' ').map(getOrAdd);
  }

  getFullName() {
    return this.names.map(i => BetterUser.strings[i]).join(' ');
  }
}
BetterUser.strings = [];






function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const randomString = () => {
  return new Array(10)
    .fill()
    .map(() => String.fromCharCode(65 + getRandomInt(26)))
    .join('');
};

const firstNames = [];
const lastNames = [];

for (let i = 0; i < 100; i++) {
  firstNames.push(randomString());
  lastNames.push(randomString());
}

const users = [];
const betterUsers = [];

for (let first of firstNames) {
  for (let last of lastNames) {
    users.push(new User(`${first} ${last}`));
    betterUsers.push(new BetterUser(`${first} ${last}`));
  }
}

console.log(`10k users take up approx ${JSON.stringify(users).length} chars`);

console.log(betterUsers[0].getFullName());
console.log(
  `10k users take up approx ${
    JSON.stringify(betterUsers).length +
    JSON.stringify(BetterUser.strings).length
  } chars`
);

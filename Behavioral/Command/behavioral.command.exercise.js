let Action = Object.freeze({
  deposit: 0,
  withdraw: 1
});

class Command {
  constructor(action, amount) {
    this.action = action;
    this.amount = amount;
    this.success = false;
  }
}

class Account {
  constructor() {
    this.balance = 0;
  }

  /** @param {Command} cmd */
  process(cmd) {
    switch (cmd.action) {
      case Action.deposit:
        this.balance += cmd.amount;
        cmd.success = true;
        break;
      case Action.withdraw:
        if (this.balance - cmd.amount > 0) {
          this.balance += cmd.amount;
          cmd.success = true;
        } else {
          cmd.success = false;
        }

        break;
      default:
        throw new Error('Unknown action.');
    }
  }
}

const acc = new Account();
console.log(acc.balance);

const deposit = new Command(Action.deposit, 50);

acc.process(deposit);
console.log(acc.balance);

const withdraw = new Command(Action.withdraw, 60);

acc.process(withdraw);
console.log(acc.balance);
console.log(withdraw.success);

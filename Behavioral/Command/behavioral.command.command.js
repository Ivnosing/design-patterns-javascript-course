class BankAccount {
  static overdraftLimit = -500;

  constructor(balance = 0) {
    this.balance = balance;
  }

  deposit(amount) {
    this.balance += amount;
    console.log(`Deposited ${amount}, balance is now ${this.balance}`);
    return true;
  }

  withdraw(amount) {
    if (this.balance - amount >= BankAccount.overdraftLimit) {
      this.balance -= amount;
      console.log(`Withdrew ${amount}, balance is now ${this.balance}`);
      return true;
    }

    return false;
  }
}

const Action = Object.freeze({
  deposit: 1,
  withdraw: 2
});

class BankAccountCommand {
  constructor(account, action, amount) {
    this.account = account;
    this.action = action;
    this.amount = amount;
    this.succeeded = false;
  }

  call() {
    switch (this.action) {
      case Action.deposit:
        this.succeeded = this.account.deposit(this.amount);
        break;
      case Action.withdraw:
        this.succeeded = this.account.withdraw(this.amount);
        break;
      default:
        throw new Error('Unknown action.');
    }
  }

  undo() {
    if (!this.succeeded) return;

    switch (this.action) {
      case Action.deposit:
        this.succeeded = this.account.withdraw(this.amount);
        break;
      case Action.withdraw:
        this.succeeded = this.account.deposit(this.amount);
        break;
      default:
        throw new Error('Unknown action.');
    }
  }
}

const ba = new BankAccount(100);
// ba.deposit(100);

// const cmd = new BankAccountCommand(ba, Action.withdraw, 650);
const cmd = new BankAccountCommand(ba, Action.deposit, 50);
cmd.call();
cmd.undo();

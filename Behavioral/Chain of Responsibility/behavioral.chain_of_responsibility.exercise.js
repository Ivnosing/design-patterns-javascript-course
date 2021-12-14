class Goblin {
  /**
   * Creates an instance of Goblin.
   * @param {Game} game
   * @param {number} [baseAttack]
   * @param {number} [baseDefense]
   */
  constructor(game, baseAttack = 1, baseDefense = 1) {
    this.game = game;
    this.attack = this.baseAttack = baseAttack;
    this.defense = this.baseDefense = baseDefense;
    game.addGoblin(this);
  }
}

class GoblinKing extends Goblin {
  constructor(game) {
    super(game, 3, 3);
  }
}

class AbstractHandler {
  constructor() {
    this.next = null;
  }

  setNext(handler) {
    return (this.next = handler);
  }

  /** @param {Goblin} goblin */
  handle(goblin) {
    this.next?.handle(goblin);
  }
}

class GoblinKingHandler extends AbstractHandler {
  constructor() {
    super();
  }

  /** @param {Goblin} goblin */
  handle(goblin) {
    if (goblin.game.hasGoblinKing() && !(goblin instanceof GoblinKing)) {
      goblin.attack = goblin.baseAttack + 1;
    }

    super.handle(goblin);
  }
}

class DefenseGoblinHandler extends AbstractHandler {
  constructor() {
    super();
  }

  /** @param {Goblin} goblin */
  handle(goblin) {
    goblin.defense = goblin.baseDefense + goblin.game.goblins.length - 1;
    super.handle(goblin);
  }
}

class Game {
  constructor() {
    const dgh = new DefenseGoblinHandler();
    const gkh = new GoblinKingHandler();
    dgh.setNext(gkh);

    this.handler = dgh;
    this.goblins = [];
  }

  addGoblin(goblin) {
    this.goblins.push(goblin);
    this.goblins.forEach(g => this.handler.handle(g));
  }

  hasGoblinKing() {
    return this.goblins.some(goblin => goblin instanceof GoblinKing);
  }
}

const game = new Game();
const goblin1 = new Goblin(game);
console.log(game.goblins);
const goblin2 = new Goblin(game);
const goblinKing = new GoblinKing(game);
console.log(game.goblins);

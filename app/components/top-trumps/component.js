import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  //Attrs
  hands: null,

  //State
  started: false,
  userCardRevealed: false,
  computerCardRevealed: false,
  computerAttributeChoice: null,
  userWins: null,
  computerWins: null,
  lastWinner: null,

  init() {
    this._super(...arguments);

    if (!this.get('hands')) {
      this.set('hands', [[], []]);
    }
    this.set('computerAttributeChoice', 'mass');
    this.set('userWins', 0);
    this.set('computerWins', 0);
    this.set('lastWinner', 'user');
  },

  turns: computed('hands', function() {
    let hands = this.get('hands');

    return hands[0].length -1;
  }),

  turnsText: computed('turns', function() {
    let turns = this.get('turns');

    if (turns === 1) {
      return "1 turn remaining";
    } else {
      return `${turns} turns remaining`;
    }
  }),

  userCard: computed('hands', function() {
    let hands = this.get('hands');

    return hands[0][0];
  }),

  computerCard: computed('hands', function() {
    let hands = this.get('hands');

    return hands[1][0];
  }),

  actions: {
    startGame() {
      let lastWinner = this.get('lastWinner');

      this.set('started', true);
      if (lastWinner === 'user') {
        this.set('userCardRevealed', true);
      } else if (lastWinner === 'computer') {
        this.set('computerCardRevealed', true);
      }
    },

    attributeSelected(selectedAttribute) {
      this.set('computerCardRevealed', true);
      this._chooseWinner(selectedAttribute);
    },

    revealUserCard() {
      this.set('userCardRevealed', true);
      this._chooseWinner(this.get('computerAttributeChoice'));
    },

    nextRound() {
      let hands = this.get('hands');
      let newHands = [];

      newHands[0] = hands[0].slice(1);
      newHands[1] = hands[1].slice(1);

      this.set('hands', newHands);

      this.set('userCardRevealed', false);
      this.set('computerCardRevealed', false);

      this.send('startGame');
    }
  },

  _chooseWinner(selectedAttribute) {
    let userCard = this.get('userCard');
    let computerCard = this.get('computerCard');
    let computerAttr = parseInt(computerCard[selectedAttribute]);
    let userAttr = parseInt(userCard[selectedAttribute]);
    let computerWins = this.get('computerWins');
    let userWins = this.get('userWins');

    this.set('computerCardRevealed', true);

    if (computerAttr >= userAttr) {
      this.set('computerWins', computerWins+1);
      this.set('lastWinner', 'computer');
    } else {
      this.set('userWins', userWins+1);
      this.set('lastWinner', 'user');
    }
  }
});

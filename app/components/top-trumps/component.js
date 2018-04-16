import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  //Attrs
  deck: null,

  //State
  started: false,

  init() {
    this._super(...arguments);
    this.set('players', 2);
  },

  shuffledDeck: computed('deck', function() {
    let deck = this.get('deck');

    return deck.map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]);
  }),

  hands: computed('shuffledDeck', function() {
    let players = this.get('players');
    let shuffledDeck = this.get('shuffledDeck');
    let hands = [];
    let splitOn = shuffledDeck.length / players;

    hands[0] = shuffledDeck.slice(0, splitOn);
    hands[1] = shuffledDeck.slice(splitOn);

    return hands;
  }),

  turns: computed('hands', function() {
    let hands = this.get('hands');

    return hands[0].length;
  }),

  turnsText: computed('turns', function() {
    let turns = this.get('turns');

    if (turns === 1) {
      return "1 turn remaining";
    } else {
      return `${turns} remaining`;
    }
  }),

  actions: {
    startGame() {
      this.set('started', true);
    }
  }
});

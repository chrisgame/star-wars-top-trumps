import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  //Attrs
  hands: null,

  //State
  started: false,

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

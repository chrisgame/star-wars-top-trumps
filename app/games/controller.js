import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';

export default Controller.extend({
  dealer: service(),

  deck: alias('model'),

  playersHands: computed('dealer', function() {
    let dealer = this.get('dealer');
    let deck = this.get('deck');

    return dealer.dealPlayersHands(deck);
  })
});

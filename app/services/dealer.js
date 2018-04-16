import Service from '@ember/service';

export default Service.extend({
  init() {
    this._super(...arguments);
    this.set('players', 2); //Only support 2 players for now
  },

  dealPlayersHands(deck) {
    let players = this.get('players');
    let shuffledDeck = this._shuffledDeck(deck);
    let hands = [];
    let splitOn = shuffledDeck.length / players;

    hands[0] = shuffledDeck.slice(0, splitOn);
    hands[1] = shuffledDeck.slice(splitOn);

    return hands;
  },

  _shuffledDeck(deck) {
    return deck.map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]);
  }
});

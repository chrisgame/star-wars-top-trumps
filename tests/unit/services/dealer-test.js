import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | dealer', function(hooks) {
  setupTest(hooks);

  let dealer;

  hooks.beforeEach(function() {
    dealer = this.owner.lookup('service:dealer');
  }),

  test('it returns a hand for each player', function(assert) {
    let deck = [
      {
        "name": "Luke Skywalker",
        "height": "172",
        "mass": "77"
      },
      {
        "name": "Captain Phasma",
        "height": "199",
        "mass": "70",
      }
    ];

    let hands = dealer.dealPlayersHands(deck);

    assert.equal(hands.length, 2, 'each player has a hand');
    assert.equal(hands[0].length, 1, "there is one card in player one's hand");
    assert.equal(hands[1].length, 1, "there is one card in plater two's hand");
  });

  test('the players hands do not match the original order of the deck', function(assert) {
    let deck = [
      {
        "name": "Luke Skywalker",
        "height": "172",
        "mass": "77"
      },
      {
        "name": "C3-PO",
        "height": "167",
        "mass": "75"
      },
      {
        "name": "R2-D2",
        "height": "96",
        "mass": "32"
      },
      {
        "name": "Darth Vader",
        "height": "202",
        "mass": "136"
      },
      {
        "name": "Obi-Wan Kenobi",
        "height": "182",
        "mass": "77"
      },
      {
        "name": "Captain Phasma",
        "height": "199",
        "mass": "70",
      }
    ];

    let hands = dealer.dealPlayersHands(deck);

    assert.notDeepEqual([...hands[0], ...hands[1]], deck);
  });
});


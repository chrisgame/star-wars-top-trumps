import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | top-trumps', function(hooks) {
  setupRenderingTest(hooks);

  module('user chooses attribute', function(hooks) {
    hooks.beforeEach(function() {
      this.handsForTwoPlayers = [
        [
          {
            "name": "Darth Vader",
            "height": "202",
            "mass": "136"
          }
        ],
        [
          {
            "name": "Luke Skywalker",
            "height": "172",
            "mass": "77"
          }
        ]
      ]
      this.set('hands', this.handsForTwoPlayers);
    }),

    test('when a game is started the deck is delt evenly between the players', async function(assert) {
      await render(hbs`{{top-trumps hands=hands}}`);

      assert.dom('#turns').doesNotExist();

      await click('#start');

      assert.dom('#turns').hasText('0 turns remaining');
    });

    test('when the deck is delt and there is no previous winner the user must choose the attribute to be used', async function(assert) {
      await render(hbs`{{top-trumps hands=hands}}`);

      assert.dom('#userCard').doesNotExist();
      assert.dom('#computerCard').doesNotExist();

      await click('#start');

      assert.dom('#userCard').exists();
      assert.dom('#computerCard').doesNotExist();
    });

    test('when an attribute has been selected by the user the computer plays their card and and the winner is chosen', async function(assert) {
      await render(hbs`{{top-trumps hands=hands}}`);

      assert.dom('#userCard').doesNotExist();
      assert.dom('#computerCard').doesNotExist();

      await click('#start');

      assert.dom('#userCard').exists();
      assert.dom('#computerCard').doesNotExist();

      await click('#userCard .mass');

      assert.dom('#userCard').exists();
      assert.dom('#computerCard').exists();

      assert.dom('#userWins').hasText('1');
      assert.dom('#computerWins').hasText('0');
    });

    test('when a winner is chosen the game continues if players have any cards remaining in their hand', async function(assert) {
      await render(hbs`{{top-trumps hands=hands}}`);

      await click('#start');
      await click('#userCard .mass');

      assert.dom('#turns').hasText('0 turns remaining');
      assert.dom('#gameOverText').hasText('Game Over');
    });
  });

  module('computer chooses attributes', function(hooks) {
    hooks.beforeEach(function() {
      let hands = [
        [
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
        ],
        [
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
        ]
      ];

      this.set('hands', hands);
    });

    test('when the deck is delt and there is a previous winner the previous winner must choose the attribute to be used', async function(assert) {
      await render(hbs`{{top-trumps hands=hands}}`);

      await click('#start');

      assert.dom('#nextRound').doesNotExist();

      await click('#userCard .mass');

      await click('#nextRound');

      assert.dom('#userCard').doesNotExist();
      assert.dom('#computerCard').exists();
    });

    test('when an attribute has been selected by the computer the user plays their next card and the winner is chosen', async function(assert) {
      await render(hbs`{{top-trumps hands=hands}}`);

      await click('#start');

      assert.dom('#nextRound').doesNotExist();

      await click('#userCard .mass');

      await click('#nextRound');

      assert.dom('#userCard').doesNotExist();
      assert.dom('#computerCard').exists();

      await click('#revealUserCard');
      assert.dom('#userCard').exists();
      assert.dom('#computerCard').exists();
      assert.dom('#userWins').hasText('0');
      assert.dom('#computerWins').hasText('2');
    });
  });
});

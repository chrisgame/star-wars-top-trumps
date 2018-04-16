import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | top-trumps', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.twoPlayerHands = [
      [
        {
          "name": "Luke Skywalker",
          "height": "172",
          "mass": "77"
        }
      ],
      [
        {
          "name": "Captain Phasma",
          "height": "199",
          "mass": "70",
        }
      ]
    ]
  }),

  test('when a game is started the deck is delt evenly between the players', async function(assert) {
    this.set('hands', this.twoPlayerHands);
    await render(hbs`{{top-trumps hands=hands}}`);

    assert.dom('#turns').doesNotExist();

    await click('#start');

    assert.dom('#turns').hasText('1 turn remaining');
  });
  skip('when the deck is delt and there is no previous winner the user must choose the attribute to be used', async function() {});
  skip('when the deck is delt and there is a previous winner the previous winner must choose the attribute to be used', async function() {});
  skip('when an attribute has been selected by the user the computer plays their card and and the winner is chosen', async function() {});
  skip('when an attribute has been selected by the computer the user plays thier next card and the winner is chosen', async function() {});
  skip('when both cards are drawn the winner is chosen', async function() {});
  skip('when a winner is chosen the game continues if players have any cards remaining in their hand', async function() {});
  skip('the game ends when players have used all their cards', async function() {});
});

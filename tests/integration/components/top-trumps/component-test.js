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
  }),

  test('when a game is started the deck is delt evenly between the players', async function(assert) {
    this.set('hands', this.twoPlayerHands);
    await render(hbs`{{top-trumps hands=hands}}`);

    assert.dom('#turns').doesNotExist();

    await click('#start');

    assert.dom('#turns').hasText('1 turn remaining');
  });

  test('when the deck is delt and there is no previous winner the user must choose the attribute to be used', async function(assert) {
    this.set('hands', this.twoPlayerHands);
    await render(hbs`{{top-trumps hands=hands}}`);

    assert.dom('#userCard').doesNotExist();
    assert.dom('#computerCard').doesNotExist();

    await click('#start');

    assert.dom('#userCard').exists();
    assert.dom('#computerCard').doesNotExist();
  });

  //skip('when the deck is delt and there is a previous winner the previous winner must choose the attribute to be used', async function() {});

  test('when an attribute has been selected by the user the computer plays their card and and the winner is chosen', async function(assert) {
    this.set('hands', this.twoPlayerHands);
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

  skip('when an attribute has been selected by the computer the user plays thier next card and the winner is chosen', async function() {});
  skip('when both cards are drawn the winner is chosen', async function() {});
  skip('when a winner is chosen the game continues if players have any cards remaining in their hand', async function() {});
  skip('the game ends when players have used all their cards', async function() {});
});

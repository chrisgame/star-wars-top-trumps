import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { startMirage } from 'star-wars-top-trumps/initializers/ember-cli-mirage';
import ENV from 'star-wars-top-trumps/config/environment';

module('Unit | Service | swapi', function(hooks) {
  setupTest(hooks);

  let swapi;

  hooks.beforeEach(function() {
    this.server = startMirage();
    this.server.logging = true;
    swapi = this.owner.lookup('service:swapi');
  });

  hooks.afterEach(function() {
    this.server.shutdown();
  });

  test('when source text is json objects separated by new lines', function(assert) {
    server.get(ENV.swapiURL, () => {
      return [
        {
          "name": "Darth Vader",
          "height": "202",
          "mass": "136"
        },
        {
          "name": "Luke Skywalker",
          "height": "172",
          "mass": "77"
        }
      ];
    });

    swapi.fetchAll()
      .then(resourceList => assert.equal(
        resourceList.length,
        2,
        'the list contains the expected number of entries'
      ))
  });

  let flashMessages;

  module('flash message is sent when list cannot be fetched', function(hooks) {
    hooks.beforeEach(function() {
      flashMessages = this.owner.lookup('service:flashMessages');
    });

    test('because of a network error', function(assert) {
      server.get(ENV.swapiURL, () => {}, 500);

      swapi.fetchAll()
        .then(resourceList => {
          assert.notOk(resourceList, 'no list is returned');
          assert.equal(flashMessages.queue.length, 1, 'a flash message has been added');
          assert.equal(
            flashMessages.queue[0].message,
            'The resource list could not be fetched because of a network error, please try again',
            'a flash message has been added about a network error'
          );
        });
    });

    test('because of a parsing error', function(assert) {
      server.get(ENV.swapiURL, () => {
        return '{';
      });

      swapi.fetchAll()
        .then(resourceList => {
          assert.notOk(resourceList, 'no list is returned');
          assert.equal(flashMessages.queue.length, 1, 'a flash message has been added');
          assert.equal(
            flashMessages.queue[0].message,
            'The resource list could not be parsed because of a formatting error:\n Unexpected end of JSON input',
            'a flash message has been added about a parsing error'
          );
        });
    });
  });
});


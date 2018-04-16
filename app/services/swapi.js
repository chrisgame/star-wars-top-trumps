import Service, { inject as service } from '@ember/service';
import fetch from 'fetch';
import ENV from 'star-wars-top-trumps/config/environment';

export default Service.extend({
  flashMessages: service(),

  fetchAll() {
    let flashMessages = this.get('flashMessages');

    return fetch(ENV.swapiURL)
      .then(response => {
        if (response.ok) {
          return response.text()
            .then(response => {
              try {
                return JSON.parse(response).results;
              }
              catch(error) {
                throw new Error(
                  `The resource list could not be parsed because of a formatting error:\n ${error.message}`
                );
              }
            });
        }
        throw new Error(
          'The resource list could not be fetched because of a network error, please try again'
        );
      })
      .catch(error => {
        flashMessages.alert(error.message);
      });
  }
});

import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  swapi: service(),

  model(params, transition) {
    return this.get('swapi').fetchAll()
      .then(resources => {
        if (!resources) {
          transition.abort();
          this.transitionTo('index');
        }
        return resources;
      });
  }
});

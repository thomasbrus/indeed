import Route from '@ember/routing/route';
import { task } from 'ember-concurrency';

export default class ApplicationRoute extends Route {
  search = task(function * (query, location) {
    let transition = this.transitionTo('search.index', { queryParams: { query, location } });

    if (transition.targetName) {
      return yield transition.promise;
    } else {
      return yield this.refresh();
    }
  }).restartable()
}

import Route from '@ember/routing/route';
import { task } from 'ember-concurrency';

export default class ApplicationRoute extends Route {
  search = task(function * (query, location) {
    this.transitionTo('search.index', { queryParams: { query, location } });
    return yield this.refresh();
  }).restartable()
}

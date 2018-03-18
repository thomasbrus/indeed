import Route from '@ember/routing/route';
import { action } from 'ember-decorators/object';

export default class IndexRoute extends Route {
  @action
  search(query, location) {
    this.transitionTo('search', { queryParams: { query, location } });
  }
}
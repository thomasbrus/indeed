import Route from '@ember/routing/route';
import { service } from 'ember-decorators/service';
import { action } from 'ember-decorators/object';

export default class SearchRoute extends Route {
  @service indeed

  queryParams = {
    query: { refreshModel: true },
    location: { refreshModel: true },
    page: { refreshModel: true }
  }

  model({ query, location, page }) {
    return this.get('indeed').search(query, location, { page });
  }

  @action
  search(query, location) {
    this.transitionTo('search', { queryParams: { query, location } });
  }
}

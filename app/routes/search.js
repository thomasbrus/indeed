import Route from '@ember/routing/route';
import { action } from 'ember-decorators/object';

export default class SearchRoute extends Route {
  queryParams = {
    query: { refreshModel: true },
    location: { refreshModel: true },
    page: { refreshModel: true }
  }

  model(params) {
    return params;
  }

  @action
  search(query, location) {
    return this.transitionTo('search.index', { queryParams: { query, location } });
  }

  @action
  refresh() {
    return super.refresh();
  }

  @action
  changePage(page) {
    this.transitionTo('search.index', { queryParams: { page } });
  }
}

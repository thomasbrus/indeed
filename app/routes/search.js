import Route from '@ember/routing/route';
import { action } from '@ember-decorators/object';

export default class SearchRoute extends Route {
  queryParams = {
    query: { refreshModel: false },
    location: { refreshModel: false },
    page: { refreshModel: false }
  }

  model(params) {
    return params;
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

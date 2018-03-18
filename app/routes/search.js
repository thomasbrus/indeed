import Route from '@ember/routing/route';
import { service } from 'ember-decorators/service';

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
}

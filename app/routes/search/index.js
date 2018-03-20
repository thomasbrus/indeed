import Route from '@ember/routing/route';
import { service } from 'ember-decorators/service';

export default class SearchIndexRoute extends Route {
  @service indeed

  model() {
    let { query, location, page } = this.modelFor('search');
    return this.get('indeed').search(query, location, { page });
  }
}

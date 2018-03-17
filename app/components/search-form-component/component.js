import Component from '@ember/component';
import { action } from 'ember-decorators/object';
import { service } from 'ember-decorators/service';
import { task } from 'ember-concurrency';

export default class SearchFormComponent extends Component {
  @service geolocation

  query = 'Software engineer'
  location = 'Enschede'

  useCurrentLocation = task(function * () {
    let position = yield this.get('geolocation').retrievePosition();
    let location = yield this.get('geolocation').lookupCity(position);
    this.set('location', location);
  }).drop()

  @action
  cancelUseCurrentLocation() {
    this.get('useCurrentLocation').cancelAll();
  }

  @action
  search(query, location) {
    this.transitionToRoute('search', { queryParams: { query, location } });
  }
}

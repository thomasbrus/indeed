import Component from '@ember/component';
import { action } from 'ember-decorators/object';
import { service } from 'ember-decorators/service';
import { task } from 'ember-concurrency';

export default class SearchFormComponent extends Component {
  @service geolocation

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
    alert(`Search for ${query} in ${location}`);
  }
}

import Component from '@ember/component';
import { action } from 'ember-decorators/object';
import { service } from 'ember-decorators/service';
import { task } from 'ember-concurrency';

export default class SearchFormComponent extends Component {
  @service geolocation

  query = 'Software engineer'
  location = 'Enschede'

  useCurrentLocation = task(function * () {
    let { latitude, longitude } = yield this.get('geolocation').retrievePosition();
    let { locality } = yield this.get('geolocation').reverseGeocode(latitude, longitude);
    this.set('location', locality);
  }).drop()

  @action
  cancelUseCurrentLocation() {
    this.get('useCurrentLocation').cancelAll();
  }

  @action
  search(query, location) {
    this.get('action')(query, location);
  }
}

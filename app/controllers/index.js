import Controller from '@ember/controller';
import { action } from 'ember-decorators/object';
import { service } from 'ember-decorators/service';
import { task } from 'ember-concurrency';

export default class IndexController extends Controller {
  @service geolocation

  useCurrentLocation = task(function * () {
    let position = yield this.get('geolocation').retrievePosition();
    let { locality } = yield this.get('geolocation').reverseGeocode(position);
    this.set('location', locality);
  })

  @action
  cancelUseCurrentLocation() {
    this.get('useCurrentLocation').cancelAll();
  }

  @action
  search(query, location) {
    alert(`Search for ${query} in ${location}`);
  }
}

import Controller from '@ember/controller';
import { action } from 'ember-decorators/object';
import { service } from 'ember-decorators/service';
import { task, timeout } from 'ember-concurrency';

export default class IndexController extends Controller {
  @service geolocation

  constructor() {
    super(...arguments);
  }

  useCurrentLocation = task(function * () {
    yield timeout(3000);
    let position = yield this.get('geolocation').retrievePosition();
    let location = yield this.get('geolocation').lookupCity(position);
    this.set('location', location);
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

import Service from '@ember/service';
import { service } from 'ember-decorators/service';

export default class IndeedService extends Service {
  @service ajax

  async search(query, location) {
    return { query, location };
    // ... this.get('ajax')
  }
}

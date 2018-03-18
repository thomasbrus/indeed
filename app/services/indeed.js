import Service from '@ember/service';
import { service } from 'ember-decorators/service';
import ENV from '../config/environment';

export default class IndeedService extends Service {
  @service ajax

  async search(q, l, { page = 1, perPage = 25 } = {}) {
    let publisher = ENV.INDEED_PUBLISHER_ID;
    let start = (page - 1) * perPage;
    let limit = perPage;

    return this.get('ajax').request('http://api.indeed.com/ads/apisearch', {
      data: { publisher, q, l, start, limit, co: 'nl', v: 2, format: 'json' }
    });
  }
}

import Service from '@ember/service';
import { service } from 'ember-decorators/service';
import ENV from '../config/environment';

export default class IndeedService extends Service {
  @service proxy

  async search(q, l, { page = 1, perPage = 10 } = {}) {
    let publisher = ENV.INDEED_PUBLISHER_ID;
    let start = (page - 1) * perPage;
    let limit = perPage;

    return this.get('proxy').request('https://api.indeed.com/ads/apisearch', {
      data: { publisher, q, l, start, limit, highlight: false, co: 'nl', v: 2, format: 'json' }
    });
  }
}

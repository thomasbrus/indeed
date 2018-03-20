import Service from '@ember/service';
import { service } from 'ember-decorators/service';

export default class ProxyService extends Service {
  @service ajax

  async request(url, options) {
    return await this.get('ajax').request(`https://cors-anywhere.herokuapp.com/${url}`, options)
  }
}

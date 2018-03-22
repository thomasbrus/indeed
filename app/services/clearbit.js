import Service from '@ember/service';
import { service } from '@ember-decorators/service';

export default class ClearbitService extends Service {
  @service ajax

  autocomplete(query) {
    const url = 'https://autocomplete.clearbit.com/v1/companies/suggest';
    return this.get('ajax').request(url, { data: { query } });
  }
}

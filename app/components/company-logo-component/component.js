import Component from '@ember/component';
import { service } from 'ember-decorators/service';
import { task } from 'ember-concurrency';

export default class CompanyLogoComponent extends Component {
  @service clearbit
  @service proxy

  static positionalParams = ['name']

  didInsertElement() {
    super.didInsertElement(...arguments);
    this.get('fetchLogo').perform();
  }

  fetchLogo = task(function * () {
    let results = yield this.get('clearbit').autocomplete(this.get('name'));
    let compare = (str1, str2) => str1.toLowerCase() === str2.toLowerCase();
    let company = results.find(c => compare(c.name, this.get('name'))) || results[0];

    if (!company || !company.logo) {
      return null;
    }

    yield this.get('proxy').request(company.logo, { method: 'HEAD' });
    return company.logo;
  })
}

import Component from '@ember/component';
import { action, computed } from '@ember-decorators/object';
import { reads, and} from '@ember-decorators/object/computed';
import { service } from '@ember-decorators/service';
import { task, waitForEvent } from 'ember-concurrency';

export default class CompanyLogoComponent extends Component {
  @service clearbit
  @service proxy

  static positionalParams = ['name']

  didInsertElement() {
    super.didInsertElement(...arguments);
    this.get('loadLogo').perform();
  }

  @reads('loadLogo.isRunning') spinnerVisible

  @reads('resolveLogo.lastSuccessful.value') logoSrc
  @and('resolveLogo.last.isSuccessful', 'loadLogo.isRunning') logoLoading
  @and('loadLogo.last.isSuccessful', 'logoSrc') logoLoaded

  @computed('loadLogo.{isRunning,last.isCanceled}', 'logoSrc')
  get placeholderVisible() {
    if (this.get('loadLogo.isRunning')) { return false; }
    return this.get('loadLogo.last.isCanceled') || !this.get('logoSrc');
  }

  resolveLogo = task(function * () {
    let results = yield this.get('clearbit').autocomplete(this.get('name'));
    let compare = (str1, str2) => str1.toLowerCase() === str2.toLowerCase();
    let company = results.find(c => compare(c.name, this.get('name'))) || results[0];

    if (!company || !company.logo) { return null; }

    return company.logo;
  }).restartable()

  loadLogo = task(function * () {
    let logo = yield this.get('resolveLogo').perform();
    if (logo) { yield waitForEvent(this, 'load'); }
  }).restartable()

  @action
  onLoad() {
    this.trigger('load');
  }
}

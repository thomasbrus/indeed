import Component from '@ember/component';
import { computed } from '@ember-decorators/object';

export default class PaginationComponent extends Component {
  @computed('pageCount')
  get pages() {
    return Array.from(Array(this.get('pageCount')).keys());
  }

  @computed('total', 'perPage')
  get pageCount() {
    return Math.ceil(this.get('total') / this.get('perPage'));
  }
}

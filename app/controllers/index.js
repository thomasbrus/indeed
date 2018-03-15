import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    search(query, location) {
      alert(`Search for ${query} in ${location}`);
    }
  }
});

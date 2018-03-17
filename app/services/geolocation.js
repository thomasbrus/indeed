import Service from '@ember/service';
import { service } from 'ember-decorators/service';

export default class GeolocationService extends Service {
  @service ajax

  retrievePosition() {
    return new Promise(function(resolve, reject) {
      window.navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  async reverseGeocode(position) {
    const url = 'https://maps.googleapis.com/maps/api/geocode/json';
    const key = 'AIzaSyA5H2SLd8J0raugrc3YE51QrBp0vY-wpwg';

    let { latitude, longitude } = position.coords;
    let data = { latlng: `${latitude},${longitude}`, key };

    let response = await this.get('ajax').request(url, { data });
    let { results: [{ address_components: addresses }, ] } = response;

    return addresses.reduce((map, { long_name, types: [type, ] }) => {
      map[type] = long_name; return map;
    }, {});
  }
}

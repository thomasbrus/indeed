import Service from '@ember/service';
import { service } from 'ember-decorators/service';
import ENV from '../config/environment';

export default class GeolocationService extends Service {
  @service ajax

  async retrieveCoordinates() {
    return new Promise(function(resolve, reject) {
      window.navigator.geolocation.getCurrentPosition(position => resolve(position.coords), reject);
    });
  }

  async reverseGeocode(latitude, longitude) {
    const url = 'https://maps.googleapis.com/maps/api/geocode/json';
    const key = ENV.GOOGLE_MAPS_API_KEY;

    let data = { latlng: `${latitude},${longitude}`, key };

    let response = await this.get('ajax').request(url, { data });
    let { results: [{ address_components: addresses }, ] } = response;

    return addresses.reduce((map, { long_name, types: [type, ] }) => {
      map[type] = long_name; return map;
    }, {});
  }
}

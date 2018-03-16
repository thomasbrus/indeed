import Service from '@ember/service';
import { service } from 'ember-decorators/service';

const API_KEY = 'AIzaSyA5H2SLd8J0raugrc3YE51QrBp0vY-wpwg';

export default class GeolocationService extends Service {
  @service ajax

  retrievePosition() {
    return new Promise(function(resolve, reject) {
      window.navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  lookupCity(position) {
    return this.reverseGeocode(position).then(response => {
      let locality = response.results.find(result => result.types[0] === "locality");
      return locality && locality.address_components[0].long_name;
    });
  }

  reverseGeocode(position) {
    let { latitude, longitude } = position.coords;
    let url = 'https://maps.googleapis.com/maps/api/geocode/json';
    let data = { latlng: `${latitude},${longitude}`, key: API_KEY };

    return this.get('ajax').request(url, { data });
  }
}

import { geocode } from 'opencage-api-client';
import * as haversine from 'haversine';

export interface LocationCoords {
  longitude: number;
  latitude: number;
}

export default class LocationUtils {
  private openCageApi: string;

  constructor() {
    this.openCageApi = process.env.OPENCAGE_API_KEY;
  }

  public async getLocationCoords(
    locationName: string,
  ): Promise<LocationCoords> {
    try {
      const response = await geocode({
        q: locationName,
        key: this.openCageApi,
      });

      if (response?.status?.code === 200 && response?.results?.length > 0) {
        const { lat, lng } = response.results[0].geometry;
        return { longitude: lng, latitude: lat };
      }
    } catch (error) {
      return error;
    }
  }

  public getDistance(org: LocationCoords, dest: LocationCoords) {
    if (!org || !dest) {
      return Error('origin or destination locations not provied');
    }

    return haversine(org, dest);
  }
}

// const locator = new LocationUtils();
// const lvivCoords = await locator.getLocationCoords('Lviv');
// const kyivCoords = await locator.getLocationCoords('Kyiv');
// console.log(locator.getDistance(lvivCoords, kyivCoords));

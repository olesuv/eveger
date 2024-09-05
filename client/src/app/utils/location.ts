import { geocode } from 'opencage-api-client';

export async function getCoordinates(
  locationAddress: string,
): Promise<[number, number] | void> {
  try {
    const response = await geocode({
      q: locationAddress,
      key: process.env.NEXT_PUBLIC_OPENCAGE_API_KEY,
    });
    if (response?.status?.code === 200 && response?.results?.length > 0) {
      const geocoded = response.results[0] as {
        geometry: { lat: number; lng: number };
        formatted: string;
      };
      return [geocoded.geometry.lat, geocoded.geometry.lng];
    }
  } catch (error) {
    throw error;
  }
}

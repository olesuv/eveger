import { geocode } from 'opencage-api-client';

export async function decodeLocation(
  location: string,
): Promise<{ lat: number; lng: number }> {
  const response = await geocode({
    q: location,
    key: process.env.NEXT_PUBLIC_OPENCAGE_API_KEY,
  });
  const result = response?.results[0]?.geometry;
  return { lat: result.lat, lng: result.lng };
}

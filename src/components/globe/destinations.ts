/**
 * Globe data. Adding a destination to the hero = adding one entry here
 * (per CLAUDE.md: "Adding a country to the globe = adding one {lat, lon}").
 */

export type GeoPoint = { name: string; lat: number; lon: number };

/** Origin — everything flies out of India. */
export const ORIGIN: GeoPoint = { name: "India", lat: 22.5, lon: 78.9 };

export const DESTINATIONS: GeoPoint[] = [
  { name: "Germany", lat: 51.1, lon: 10.4 },
  { name: "Canada", lat: 56.1, lon: -106.3 },
  { name: "United Kingdom", lat: 54.0, lon: -2.0 },
  { name: "Australia", lat: -25.3, lon: 133.8 },
  { name: "Ireland", lat: 53.4, lon: -8.2 },
  { name: "USA", lat: 39.8, lon: -98.6 },
  { name: "France", lat: 46.2, lon: 2.2 },
  { name: "Dubai", lat: 24.5, lon: 54.4 },
  { name: "Poland", lat: 52.0, lon: 19.1 },
];

// Google reviews exported from the prototype (design/project/reviews-data.js).
// Format: "Name\nText" blocks separated by "\n===\n".
import { RAW } from './reviews-raw.js';

export const REVIEWS: { name: string; text: string }[] = RAW.split('\n===\n').map((b: string) => {
  const i = b.indexOf('\n');
  return { name: b.slice(0, i).trim(), text: b.slice(i + 1) };
});

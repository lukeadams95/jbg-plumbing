import { REVIEWS } from '../data/reviews';

// All Google reviews, fetched by "Load more reviews" on the homepage and /reviews/.
export const GET = () => new Response(JSON.stringify(REVIEWS), { headers: { 'Content-Type': 'application/json' } });

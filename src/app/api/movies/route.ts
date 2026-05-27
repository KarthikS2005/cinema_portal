import { NextResponse } from 'next/server';

const MOVIES = [
  { id: 1, title: 'DUNE: PART TWO', rating: '98%', format: 'IMAX 70MM', genre: 'Sci-Fi / Adventure', region: 'Hollywood', summary: 'Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.', img: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800&auto=format&fit=crop' },
  { id: 2, title: 'OPPENHEIMER', rating: '93%', format: 'DOLBY CINEMA', genre: 'Historical Drama', region: 'Hollywood', summary: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.', img: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=800&auto=format&fit=crop' },
  { id: 3, title: 'INTERSTELLAR', rating: '96%', format: 'IMAX 3D', genre: 'Sci-Fi / Drama', region: 'Hollywood', summary: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.', img: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=800&auto=format&fit=crop' },
  { id: 4, title: 'BLADE RUNNER 2049', rating: '89%', format: '4DX', genre: 'Sci-Fi / Action', region: 'Hollywood', summary: 'Young Blade Runner K\'s discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard.', img: 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=800&auto=format&fit=crop' },
  { id: 5, title: 'THE BATMAN', rating: '85%', format: 'DOLBY CINEMA', genre: 'Action / Crime', region: 'Hollywood', summary: 'When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city\'s hidden corruption.', img: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?q=80&w=800&auto=format&fit=crop' },
  { id: 6, title: 'PATHAAN', rating: '82%', format: 'IMAX', genre: 'Action', region: 'Bollywood', summary: 'An Indian spy takes on the leader of a group of mercenaries who have nefarious plans to target his homeland.', img: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800&auto=format&fit=crop' },
  { id: 7, title: 'RRR', rating: '95%', format: '4DX', genre: 'Action / Drama', region: 'South Indian', summary: 'A fictitious story about two legendary revolutionaries and their journey away from home before they started fighting for their country in 1920s.', img: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=800&auto=format&fit=crop' },
  { id: 8, title: 'YOUR NAME', rating: '98%', format: 'Standard', genre: 'Anime / Romance', region: 'Anime', summary: 'Two teenagers share a profound, magical connection upon discovering they are swapping bodies.', img: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=800&auto=format&fit=crop' }
];

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  if (id) {
    const movie = MOVIES.find(m => m.id.toString() === id);
    if (!movie) return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
    return NextResponse.json(movie);
  }
  return NextResponse.json(MOVIES);
}

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const MOVIES = [
  { id: 'm1', name: 'DUNE: PART TWO' },
  { id: 'm2', name: 'OPPENHEIMER' },
  { id: 'm3', name: 'INTERSTELLAR' },
  { id: 'm4', name: 'BLADE RUNNER 2049' },
  { id: 'm5', name: 'THE BATMAN' }
];

const SEAT_CLASSES = ['standard', 'premium', 'luxury'];
const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

async function main() {
  console.log('Clearing existing tickets...');
  await prisma.ticket.deleteMany({});

  console.log('Seeding 200 demo tickets...');
  
  const tickets = [];
  for (let i = 0; i < 200; i++) {
    const movie = MOVIES[Math.floor(Math.random() * MOVIES.length)];
    const seatClass = SEAT_CLASSES[Math.floor(Math.random() * SEAT_CLASSES.length)];
    const row = ROWS[Math.floor(Math.random() * ROWS.length)];
    const col = Math.floor(Math.random() * 14) + 1;
    
    let price = 250;
    if (seatClass === 'premium') price = 450;
    if (seatClass === 'luxury') price = 800;

    const statusOptions = ['booked', 'scanned', 'cancelled'];
    const status = statusOptions[Math.floor(Math.random() * statusOptions.length)];

    tickets.push({
      movieId: movie.id,
      movieName: movie.name,
      seatId: `${row}${col}`,
      seatClass,
      price,
      status,
      // Random date within the last 30 days
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000))
    });
  }

  await prisma.ticket.createMany({
    data: tickets
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

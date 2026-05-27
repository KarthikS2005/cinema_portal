const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ─── Helpers ───────────────────────────────────────────────────────────────
const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randFloat = (min, max) => +(Math.random() * (max - min) + min).toFixed(2);

// ─── Data pools ────────────────────────────────────────────────────────────
const FIRST = ['Ravi','Priya','Amit','Sneha','Kiran','Deepak','Ananya','Suresh','Pooja','Rahul','Neeraj','Divya','Arjun','Kavitha','Vijay','Meena','Sanjay','Lakshmi','Arun','Geetha','Rohit','Nisha','Ajay','Sunita','Manoj','Rekha','Dinesh','Usha','Ramesh','Saritha','Nikhil','Pavithra','Akash','Jyothi','Vishal','Smitha','Kartik','Renuka','Bharath','Vandana'];
const LAST = ['Kumar','Sharma','Patel','Reddy','Nair','Pillai','Joshi','Iyer','Rao','Gupta','Singh','Kaur','Shah','Mehta','Bhat','Hegde','Shetty','Naik','Patil','Desai'];
const ROLES = ['Cleaner', 'Booking Operator', 'Projector Handler', 'Manager', 'Supervisor', 'Technical Staff', 'Security Guard', 'Cashier', 'Usher'];
const SHIFTS = ['Morning', 'Afternoon', 'Night'];
const CITIES = ['Bangalore', 'Hubli', 'Dharwad', 'Belagavi', 'Mangalore', 'Mysuru', 'Shimoga', 'Tumkur'];
const LOCATIONS = ['Metropolis Downtown', 'Galaxy Multiplex', 'Star City Plaza', 'Gotham Central', 'Silver Screen Hub', 'Prime Cinema Hall'];
const TYPES = ['hourly', 'monthly'];
const PAYMENT_METHODS = ['Bank Transfer', 'NPCI (UPI)', 'Credit Card', 'Cash'];
const PAYMENT_PURPOSES = ['Salary', 'Advance', 'Bonus', 'Reimbursement', 'Overtime'];
const ROOM_STATUSES = ['Available', 'Cleaning', 'Maintenance'];
const TASK_STATUSES = ['Pending', 'Completed'];
const MOVIE_TITLES = ['DUNE: PART TWO','OPPENHEIMER','INTERSTELLAR','PATHAAN','RRR','KGF CHAPTER 2','PUSHPA','BRAHMASTRA','VIKRAM','PONNIYIN SELVAN','KANTARA','BAHUBALI','ADIPURUSH','KALKI 2898 AD','DEVARA','THE BATMAN','AVATAR 2','TOP GUN','SPIDER-MAN NWH','DOCTOR STRANGE'];
const SEAT_CLASSES = ['standard', 'premium', 'luxury'];
const TICKET_STATUSES = ['booked', 'scanned', 'cancelled'];
const TICKET_TYPES = ['online', 'offline'];
const REGIONS = ['Hollywood', 'Bollywood', 'South Indian', 'Anime'];

const randomName = () => `${rand(FIRST)} ${rand(LAST)}`;
const randomDate = (daysBack = 90) => new Date(Date.now() - randInt(0, daysBack) * 86400000);
const randomPhone = () => `+91 ${randInt(7000000000, 9999999999)}`;

async function main() {
  console.log('🌱 Seeding 100 records per table...\n');

  // ─── 1. Employees (100) ────────────────────────────────────────────────
  console.log('Adding 100 Employees...');
  const employees = [];
  for (let i = 0; i < 100; i++) {
    const emp = await prisma.employee.create({
      data: {
        name: randomName(),
        role: rand(ROLES),
        location: rand(LOCATIONS),
        wage: rand(TYPES) === 'monthly' ? randFloat(8000, 50000) : randFloat(15, 150),
        type: rand(TYPES),
        shift: rand(SHIFTS),
        address: rand(CITIES),
        balance: randFloat(0, 10000),
      }
    });
    employees.push(emp);
  }
  console.log(`  ✓ ${employees.length} employees created`);

  // ─── 2. Payments (100) ─────────────────────────────────────────────────
  console.log('Adding 100 Payments...');
  for (let i = 0; i < 100; i++) {
    const emp = rand(employees);
    await prisma.payment.create({
      data: {
        amount: randFloat(500, 50000),
        method: rand(PAYMENT_METHODS),
        purpose: rand(PAYMENT_PURPOSES),
        referenceId: emp.id,
        createdAt: randomDate(180),
      }
    });
  }
  console.log('  ✓ 100 payments created');

  // ─── 3. Rooms (100) ────────────────────────────────────────────────────
  console.log('Adding 100 Rooms...');
  for (let i = 1; i <= 100; i++) {
    await prisma.room.create({
      data: {
        name: `Screen ${i}`,
        status: rand(ROOM_STATUSES),
        cleaningSchedule: rand(['Daily', 'Twice Daily', 'Weekly', null]),
      }
    });
  }
  console.log('  ✓ 100 rooms created');

  // ─── 4. Tasks (100) ────────────────────────────────────────────────────
  console.log('Adding 100 Tasks...');
  const taskDescriptions = [
    'Clean auditorium after show', 'Check projector calibration', 'Prepare snack counter', 'Verify ticket scanner', 'Inspect emergency exits',
    'Update seating chart', 'Test sound system', 'Briefing with security team', 'Replenish concession stock', 'Print daily schedule',
    'Sanitize restrooms', 'Check HVAC system', 'Review booking reports', 'Conduct staff attendance', 'Prepare weekly salary sheet'
  ];
  for (let i = 0; i < 100; i++) {
    await prisma.task.create({
      data: {
        description: rand(taskDescriptions),
        status: rand(TASK_STATUSES),
        employeeId: rand(employees).id,
        createdAt: randomDate(60),
      }
    });
  }
  console.log('  ✓ 100 tasks created');

  // ─── 5. Tickets (100) ──────────────────────────────────────────────────
  console.log('Adding 100 Tickets...');
  for (let i = 0; i < 100; i++) {
    const seatClass = rand(SEAT_CLASSES);
    const price = seatClass === 'luxury' ? randFloat(600, 1000) : seatClass === 'premium' ? randFloat(350, 600) : randFloat(150, 350);
    const movieId = String(randInt(1, 8));
    const movieName = rand(MOVIE_TITLES);
    await prisma.ticket.create({
      data: {
        movieId,
        movieName,
        seatId: `${String.fromCharCode(65 + randInt(0, 7))}${randInt(1, 14)}`,
        seatClass,
        price,
        status: rand(TICKET_STATUSES),
        customerName: randomName(),
        whatsapp: randomPhone(),
        ticketType: rand(TICKET_TYPES),
        createdAt: randomDate(30),
      }
    });
  }
  console.log('  ✓ 100 tickets created');

  // ─── 6. Movies (100) ───────────────────────────────────────────────────
  console.log('Adding 100 Movies...');
  const genres = ['Action', 'Drama', 'Sci-Fi', 'Romance', 'Thriller', 'Comedy', 'Horror', 'Adventure', 'Animation', 'Historical'];
  const formats = ['IMAX', '4DX', 'DOLBY CINEMA', 'Standard', 'IMAX 3D', 'IMAX 70MM'];
  const ratings = ['U', 'UA', 'A', 'PG-13', 'R'];
  for (let i = 0; i < 100; i++) {
    await prisma.movie.create({
      data: {
        title: `${rand(MOVIE_TITLES)} ${randInt(2, 5) > 3 ? 'PART 2' : ''}`.trim(),
        region: rand(REGIONS),
        genre: `${rand(genres)} / ${rand(genres)}`,
        format: rand(formats),
        rating: rand(ratings),
        summary: `An epic ${rand(genres).toLowerCase()} saga featuring stunning visuals and emotional performances.`,
        img: `https://images.unsplash.com/photo-${rand(['1536440136628-849c177e76a1','1440404653325-ab127d49abc1','1462331940025-496dfbfc7564','1509347528160-9a9e33742cdb'])}?q=80&w=800&auto=format&fit=crop`,
        createdAt: randomDate(365),
      }
    });
  }
  console.log('  ✓ 100 movies created');

  // ─── 7. Users (100) ────────────────────────────────────────────────────
  console.log('Adding 100 Users...');
  for (let i = 1; i <= 100; i++) {
    const first = rand(FIRST).toLowerCase();
    const num = randInt(10, 999);
    await prisma.user.create({
      data: {
        username: `${first}${num}`,
        password: `pass${randInt(1000, 9999)}`,
        role: rand(['user', 'user', 'user', 'hr', 'admin']),
        createdAt: randomDate(365),
      }
    }).catch(() => {}); // skip duplicate username
  }
  console.log('  ✓ up to 100 users created (duplicates skipped)');

  console.log('\n✅ Database seeding complete!');
}

main().catch(console.error).finally(() => prisma.$disconnect());

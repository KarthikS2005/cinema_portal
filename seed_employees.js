const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const MOCK_EMPLOYEES = [
  { name: 'Sarah Jenkins', role: 'General Manager', location: 'Metropolis Downtown', wage: 8500, type: 'monthly', shift: 'Morning', address: 'Bangalore' },
  { name: 'David Chen', role: 'Projectionist', location: 'Metropolis Downtown', wage: 28.50, type: 'hourly', shift: 'Morning', address: 'Bangalore' },
  { name: 'Maria Rodriguez', role: 'Box Office Lead', location: 'Gotham Central', wage: 22.00, type: 'hourly', shift: 'Afternoon', address: 'Hubli' },
  { name: 'James Wilson', role: 'Usher', location: 'Metropolis Downtown', wage: 18.00, type: 'hourly', shift: 'Afternoon', address: 'Mysuru' },
  { name: 'Emily Taylor', role: 'Concessions', location: 'Star City Plaza', wage: 17.50, type: 'hourly', shift: 'Night', address: 'Bangalore' }
];

async function seed() {
  for (const emp of MOCK_EMPLOYEES) {
    await prisma.employee.create({ data: emp });
  }
  console.log('Seeded employees');
}

seed().catch(console.error).finally(() => prisma.$disconnect());

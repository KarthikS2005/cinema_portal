import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function jsonToCsv(items: any[]) {
  if (items.length === 0) return "";
  const header = Object.keys(items[0]).join(",");
  const rows = items.map(item => 
    Object.values(item).map(value => `"${value}"`).join(",")
  );
  return [header, ...rows].join("\n");
}

export async function GET() {
  try {
    const employees = await prisma.employee.findMany();
    const payments = await prisma.payment.findMany();
    const rooms = await prisma.room.findMany();

    const csvData = `
--- EMPLOYEES ---
${jsonToCsv(employees)}

--- PAYMENTS ---
${jsonToCsv(payments)}

--- ROOMS ---
${jsonToCsv(rooms)}
    `;

    return new NextResponse(csvData, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="cinema_export.csv"',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to export' }, { status: 500 });
  }
}

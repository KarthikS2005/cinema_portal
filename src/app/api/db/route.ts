import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const tickets = await prisma.ticket.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
    const payments = await prisma.payment.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
    const employees = await prisma.employee.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    const totalCount = await prisma.ticket.count() + await prisma.payment.count() + await prisma.employee.count();

    return NextResponse.json({
      success: true,
      provider: 'SQLite',
      totalCount,
      tickets,
      payments,
      employees
    });
  } catch (error: any) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message,
        message: "Failed to connect to SQLite." 
      },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const tickets = await prisma.ticket.findMany({
      orderBy: { createdAt: 'desc' },
      take: 200, // Explicitly take up to 200 for the demo
    });

    const totalCount = await prisma.ticket.count();

    return NextResponse.json({
      success: true,
      provider: 'SQLite',
      totalCount,
      tickets
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

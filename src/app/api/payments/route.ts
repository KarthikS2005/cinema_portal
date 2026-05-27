import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const payment = await prisma.payment.create({
      data: {
        amount: parseFloat(data.amount),
        method: data.method,
        purpose: data.purpose,
        referenceId: data.referenceId,
      },
    });

    if (data.purpose === 'Salary' && data.referenceId) {
      await prisma.employee.update({
        where: { id: data.referenceId },
        data: { balance: { decrement: parseFloat(data.amount) } }
      });
    }

    return NextResponse.json(payment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process payment' }, { status: 500 });
  }
}

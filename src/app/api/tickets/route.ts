import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const {
      movieId,
      movieName,
      selectedSeats,
      customerName,
      whatsapp,
      ticketType,
      paymentMethod,
      totalAmount,
    } = data;

    if (!movieId || !movieName || !selectedSeats || !Array.isArray(selectedSeats) || selectedSeats.length === 0) {
      return NextResponse.json({ error: 'Invalid booking data' }, { status: 400 });
    }

    // Execute in a transaction to guarantee data integrity
    const result = await prisma.$transaction(async (tx) => {
      // 1. Create tickets
      const createdTickets = [];
      for (const seat of selectedSeats) {
        const ticket = await tx.ticket.create({
          data: {
            movieId: String(movieId),
            movieName,
            seatId: seat.id,
            seatClass: seat.class,
            price: parseFloat(seat.price),
            status: 'booked',
            customerName: customerName || 'Guest',
            whatsapp: whatsapp || '',
            ticketType: ticketType || 'online',
          },
        });
        createdTickets.push(ticket);
      }

      // 2. Create the payment record
      const payment = await tx.payment.create({
        data: {
          amount: parseFloat(totalAmount),
          method: paymentMethod || 'Credit Card',
          purpose: 'Booking',
          referenceId: createdTickets[0]?.id || null,
        },
      });

      return { tickets: createdTickets, payment };
    });

    return NextResponse.json({ success: true, ...result }, { status: 201 });
  } catch (error: any) {
    console.error('Failed to create booking:', error);
    return NextResponse.json({ error: 'Failed to process booking', details: error.message }, { status: 500 });
  }
}

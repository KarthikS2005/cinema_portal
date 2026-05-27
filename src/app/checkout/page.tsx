"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import styles from './page.module.css';

type SeatClass = 'standard' | 'premium' | 'luxury';

interface Seat {
  id: string;
  row: string;
  col: number;
  class: SeatClass;
  price: number;
  isBooked: boolean;
}

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const COLS = 14;

// Generate mock seating layout
const SEATS: Seat[] = ROWS.flatMap((row, rIndex) => {
  return Array.from({ length: COLS }).map((_, cIndex) => {
    const isBooked = Math.random() < 0.2; // 20% chance booked
    
    let seatClass: SeatClass = 'standard';
    let price = 250;
    
    // Premium seats in middle rows
    if (rIndex >= 3 && rIndex <= 5 && cIndex >= 3 && cIndex <= 10) {
      seatClass = 'premium';
      price = 450;
    }
    
    // Luxury back row
    if (rIndex === ROWS.length - 1) {
      seatClass = 'luxury';
      price = 800;
    }

    return {
      id: `${row}${cIndex + 1}`,
      row,
      col: cIndex + 1,
      class: seatClass,
      price,
      isBooked
    };
  });
});

export default function CheckoutPageWrapper() {
  return (
    <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center', color: 'white' }}>Loading Checkout...</div>}>
      <CheckoutPage />
    </Suspense>
  );
}

function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const movieId = searchParams?.get('movie');

  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [ticketType, setTicketType] = useState("online");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [movieDetails, setMovieDetails] = useState<any>(null);

  useEffect(() => {
    if (movieId) {
      fetch(`/api/movies?id=${movieId}`)
        .then(res => res.json())
        .then(data => {
          if (!data.error) setMovieDetails(data);
        })
        .catch(console.error);
    } else {
      // Default fallback
      fetch('/api/movies?id=1')
        .then(res => res.json())
        .then(data => {
          if (!data.error) setMovieDetails(data);
        });
    }
  }, [movieId]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const toggleSeat = (seat: Seat) => {
    if (seat.isBooked) return;
    
    if (selectedSeats.find(s => s.id === seat.id)) {
      setSelectedSeats(selectedSeats.filter(s => s.id !== seat.id));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const subtotal = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
  const fees = selectedSeats.length * 40;
  const total = subtotal + fees;

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Optionally we could save to DB here via API
      
      setIsProcessing(false);
      setShowSuccessModal(true);
    } catch (e) {
      console.error(e);
      setIsProcessing(false);
    }
  };

  if (showSuccessModal) {
    return (
      <div className={styles.checkoutContainer} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'var(--bg-base)' }}>
        <div style={{ background: 'var(--bg-card)', padding: '3rem', borderRadius: '12px', textAlign: 'center', maxWidth: '500px', width: '90%', border: '1px solid var(--border-light)' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
          <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: '1rem', color: 'var(--accent-emerald)' }}>Booking Successful!</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Thank you, {customerName || 'Guest'}. Your {selectedSeats.length} ticket(s) for {movieDetails?.title || 'the selected movie'} have been confirmed.
          </p>

          {ticketType === 'online' ? (
            <div>
              <div style={{ background: 'white', padding: '1rem', display: 'inline-block', borderRadius: '8px', marginBottom: '1.5rem' }}>
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=CinemaPortalTicket" alt="QR Code" width="150" height="150" />
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', marginBottom: '1rem' }}>
                A copy of this ticket has been sent to WhatsApp: {whatsapp || 'N/A'}
              </p>
              <button className="btn btn-primary" onClick={() => router.push('/')}>Download PDF Ticket</button>
            </div>
          ) : (
            <div>
              <div style={{ padding: '2rem', border: '2px dashed var(--border-light)', borderRadius: '8px', marginBottom: '1.5rem' }}>
                <h3 style={{ marginBottom: '0.5rem' }}>OFFLINE TICKET</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Please hand this receipt to the staff counter to print your physical ticket.</p>
              </div>
              <button className="btn btn-primary" onClick={() => router.push('/')}>Print for Staff</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.checkoutContainer}>
      <div className={styles.mainContent}>
        <div className={styles.screenArcContainer}>
           <div className={styles.screenArc}></div>
           <div className={styles.screenText}>IMAX Projection Area</div>
        </div>

        <div className={styles.seatGrid}>
          {ROWS.map(rowLabel => (
            <div key={rowLabel} className={styles.seatRow}>
              <div className={styles.rowLabel}>{rowLabel}</div>
              {SEATS.filter(s => s.row === rowLabel).map(seat => {
                const isSelected = selectedSeats.some(s => s.id === seat.id);
                let seatClass = styles.seatStandard;
                if (seat.class === 'premium') seatClass = styles.seatPremium;
                if (seat.class === 'luxury') seatClass = styles.seatLuxury;

                return (
                  <div 
                    key={seat.id} 
                    className={`${styles.seat} ${seatClass} ${seat.isBooked ? styles.seatBooked : ''} ${isSelected ? styles.seatSelected : ''}`}
                    onClick={() => toggleSeat(seat)}
                    title={`${seat.id} - ₹${seat.price.toFixed(2)}`}
                  >
                    <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                      <rect className={styles.seatRect} x="4" y="4" width="32" height="32" rx="6" />
                      <rect className={styles.seatRect} x="8" y="10" width="24" height="20" rx="4" opacity="0.5" />
                      {seat.isBooked && (
                        <line x1="8" y1="8" x2="32" y2="32" stroke="rgba(255, 51, 102, 0.8)" strokeWidth="3" />
                      )}
                    </svg>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.sidebar}>
        <div className={styles.countdownClock}>
          ⏱️ {formatTime(timeLeft)}
        </div>

        <div className={styles.sidebarHeader}>
          <h2 className={styles.movieTitle}>{movieDetails?.title || 'Loading...'}</h2>
          <div className={styles.movieDetail}>
            <span>Today, 8:45 PM</span> • <span>{movieDetails?.format || 'Standard'}</span>
          </div>
          <div className={styles.movieDetail} style={{ marginTop: '0.25rem' }}>
            <span>Metropolis Downtown Multiplex</span>
          </div>
        </div>

        <div className={styles.ticketSummary}>
          {selectedSeats.length === 0 ? (
            <div style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '2rem' }}>
              Select seats on the map to continue.
            </div>
          ) : (
            selectedSeats.map(seat => (
              <div key={seat.id} className={`${styles.ticketItem} animate-fade-in`}>
                <div>
                  <div className={styles.ticketCoord}>Seat {seat.id}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'capitalize' }}>
                    {seat.class} Tier
                  </div>
                </div>
                <div className={styles.ticketPrice}>₹{seat.price.toFixed(2)}</div>
              </div>
            ))
          )}
        </div>

        <div className={styles.priceBreakdown}>
          <div className={styles.priceRow}>
            <span>Tickets ({selectedSeats.length})</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className={styles.priceRow}>
            <span>Processing Fees</span>
            <span>₹{fees.toFixed(2)}</span>
          </div>
          <div className={styles.priceTotal}>
            <span>Total</span>
            <span style={{ color: 'var(--accent-amber)' }}>₹{total.toFixed(2)}</span>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Customer Details</h3>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Name</label>
              <input type="text" value={customerName} onChange={e => setCustomerName(e.target.value)} placeholder="e.g. John Doe" style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-dark)', color: 'white', border: '1px solid var(--border-light)' }} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>WhatsApp Number</label>
              <input type="text" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} placeholder="e.g. +91 9876543210" style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-dark)', color: 'white', border: '1px solid var(--border-light)' }} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Ticket Type</label>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                  <input type="radio" value="online" checked={ticketType === 'online'} onChange={() => setTicketType('online')} /> Online Ticket
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                  <input type="radio" value="offline" checked={ticketType === 'offline'} onChange={() => setTicketType('offline')} /> Offline Print
                </label>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Payment Method</label>
            <select 
              value={paymentMethod} 
              onChange={(e) => setPaymentMethod(e.target.value)} 
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-dark)', color: 'white', border: '1px solid var(--border-light)' }}
            >
              <option value="Credit Card" style={{ color: 'black' }}>Credit Card</option>
              <option value="NPCI (UPI)" style={{ color: 'black' }}>NPCI (UPI)</option>
              <option value="Bank Transfer" style={{ color: 'black' }}>Bank Transfer</option>
              <option value="Cash" style={{ color: 'black' }}>Cash</option>
            </select>
          </div>

          <button 
            className={`btn btn-primary ${styles.checkoutBtn}`} 
            disabled={selectedSeats.length === 0 || isProcessing}
            onClick={handleCheckout}
          >
            {isProcessing ? 'Processing...' : 'Confirm & Pay'}
          </button>
          
          <Link href="/" className="btn btn-secondary" style={{ width: '100%', marginTop: '0.5rem' }}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}

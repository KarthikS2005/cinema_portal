"use client";

import React from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function TicketPage() {
  return (
    <div className={styles.ticketContainer}>
      <div className="animate-slide-up" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className={styles.successHeader}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1rem' }}>
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <h2 style={{ fontFamily: 'var(--font-display)' }}>Payment Successful</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Your digital pass is ready.</p>
        </div>

        <div className={styles.ticketCard}>
          <div className={styles.ticketTop}>
            <h1 className={styles.movieTitle}>DUNE: PART TWO</h1>
            
            <div className={styles.ticketDetails}>
              <div className={styles.detailGroup}>
                <span className={styles.detailLabel}>Date</span>
                <span className={styles.detailValue}>OCT 24, 2026</span>
              </div>
              <div className={styles.detailGroup}>
                <span className={styles.detailLabel}>Time</span>
                <span className={styles.detailValue}>8:45 PM</span>
              </div>
              <div className={styles.detailGroup}>
                <span className={styles.detailLabel}>Auditorium</span>
                <span className={styles.detailValue}>IMAX 04</span>
              </div>
              <div className={styles.detailGroup}>
                <span className={styles.detailLabel}>Seats</span>
                <span className={styles.detailValue}>G7, G8</span>
              </div>
            </div>
          </div>

          <div className={styles.perforation}>
            <div className={styles.notchLeft}></div>
            <div className={styles.perforationLine}></div>
            <div className={styles.notchRight}></div>
          </div>

          <div className={styles.ticketBottom}>
            <div className={styles.qrContainer}>
              {/* QR Code Graphic using an SVG path */}
              <svg viewBox="0 0 100 100" width="100%" height="100%">
                 <rect width="100" height="100" fill="#fff" />
                 <path d="M10,10 h20 v20 h-20 z M40,10 h50 v10 h-50 z M15,15 h10 v10 h-10 z M10,40 h20 v20 h-20 z M40,40 h20 v10 h-20 z M70,40 h20 v20 h-20 z M10,70 h20 v20 h-20 z M40,70 h10 v20 h-10 z M60,70 h30 v10 h-30 z M80,80 h10 v10 h-10 z M60,20 h20 v10 h-20 z M30,30 h10 v10 h-10 z M60,50 h10 v10 h-10 z M20,60 h10 v10 h-10 z M50,80 h10 v10 h-10 z" fill="#000" />
                 <rect x="70" y="10" width="20" height="20" fill="#000" />
                 <rect x="75" y="15" width="10" height="10" fill="#fff" />
                 <rect x="77" y="17" width="6" height="6" fill="#000" />
              </svg>
              <div className={styles.scanningIndicator}></div>
            </div>

            <div className={styles.walletActions}>
              <button className={`${styles.walletBtn} ${styles.btnApple}`}>
                <span>Add to Apple Wallet</span>
              </button>
              <button className={`${styles.walletBtn} ${styles.btnGoogle}`}>
                <span>Add to Google Wallet</span>
              </button>
              <button className={`${styles.walletBtn} ${styles.btnDownload}`}>
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation handled by Global Navbar */}
      </div>
    </div>
  );
}

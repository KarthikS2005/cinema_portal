"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

type ScanState = 'scanning' | 'valid' | 'invalid';

export default function MobileScanner() {
  const [scanState, setScanState] = useState<ScanState>('scanning');

  const handleMockScan = (result: 'valid' | 'invalid') => {
    setScanState(result);
  };

  const resetScanner = () => {
    setScanState('scanning');
  };

  return (
    <div className={styles.scannerLayout}>
      {scanState === 'scanning' && (
        <>
          <div className={styles.header}>
            <Link href="/" className={styles.backBtn}>Exit Scanner</Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-emerald)', boxShadow: '0 0 5px var(--accent-emerald)' }}></div>
              <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Active</span>
            </div>
          </div>

          <div className={styles.viewfinder}>
            {/* Mock camera feed background using a generic image or dark pattern */}
            <div className={styles.cameraBg} style={{ background: 'radial-gradient(circle, #222 0%, #000 100%)' }}></div>
            
            <div className={styles.targetBorder}>
              <div className={`${styles.targetCorner} ${styles.topLeft}`}></div>
              <div className={`${styles.targetCorner} ${styles.topRight}`}></div>
              <div className={`${styles.targetCorner} ${styles.bottomLeft}`}></div>
              <div className={`${styles.targetCorner} ${styles.bottomRight}`}></div>
              <div className={styles.scanLine}></div>
            </div>

            <div className={styles.instruction}>
              <span className={styles.instructionText}>Align QR code within frame</span>
            </div>
          </div>

          {/* Dev controls for demo purposes */}
          <div className={styles.mockControls}>
            <button className={styles.mockBtn} onClick={() => handleMockScan('valid')}>Test Valid</button>
            <button className={styles.mockBtn} onClick={() => handleMockScan('invalid')}>Test Invalid</button>
          </div>
        </>
      )}

      {scanState === 'valid' && (
        <div className={`${styles.validationOverlay} ${styles.overlayValid} animate-fade-in`}>
          <div className={styles.validationIcon}>✓</div>
          <h1 className={styles.validationTitle}>Verified</h1>
          
          <div className={styles.validationDetails}>
            <div className={styles.seatNumbers}>G7, G8</div>
            <div className={styles.auditorium}>IMAX 04</div>
            <div style={{ marginTop: '1rem', fontSize: '0.9rem', opacity: 0.8 }}>DUNE: PART TWO</div>
          </div>

          <button className={styles.actionBtn} onClick={resetScanner}>
            Scan Next Pass
          </button>
        </div>
      )}

      {scanState === 'invalid' && (
        <div className={`${styles.validationOverlay} ${styles.overlayInvalid} animate-fade-in`}>
          <div className={styles.validationIcon}>!</div>
          <h1 className={styles.validationTitle}>Entry Denied</h1>
          
          <div className={styles.validationDetails}>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Pass Already Scanned</div>
            <div className={styles.timestamp}>Scanned: 10/24/2026 18:42:15</div>
            <div style={{ marginTop: '1rem', fontSize: '0.9rem', opacity: 0.8 }}>Terminal ID: T-04-A</div>
          </div>

          <button className={styles.actionBtn} onClick={resetScanner}>
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}

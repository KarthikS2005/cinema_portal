"use client";

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function SettingsPage() {
  const [dbStatus, setDbStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const consoleEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchDb() {
      try {
        const res = await fetch('/api/db');
        const data = await res.json();
        
        if (data.success) {
          setDbStatus(data);
        } else {
          setError(data.message || data.error);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch database status.');
      } finally {
        setLoading(false);
      }
    }

    fetchDb();
  }, []);

  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [dbStatus, error, loading]);

  return (
    <div className={styles.settingsContainer}>
      <div className={styles.header}>
        <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)' }}>DBMS Console</h1>
        <p style={{ color: 'var(--text-secondary)' }}>System Settings and Database Overview</p>
      </div>

      <div className={styles.dbInfoCard}>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Database Engine</span>
          <span className={styles.infoValue}>SQLite (Prisma)</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Total Records</span>
          <span className={styles.infoValue}>{dbStatus?.totalCount ?? 'N/A'}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Connection Status</span>
          <span className={styles.infoValue} style={{ color: error ? '#ff5f56' : '#27c93f' }}>
            {error ? 'Disconnected' : loading ? 'Connecting...' : 'Connected'}
          </span>
        </div>
      </div>

      <div className={styles.consoleContainer}>
        <div className={styles.consoleHeader}>
          <div className={styles.consoleDots}>
            <div className={`${styles.dot} ${styles.dotRed}`}></div>
            <div className={`${styles.dot} ${styles.dotYellow}`}></div>
            <div className={`${styles.dot} ${styles.dotGreen}`}></div>
          </div>
          cinema-portal-db-console ~ bash
        </div>
        <div className={styles.consoleBody}>
          <div className={styles.command}>$ prisma db status</div>
          {loading && <div className={styles.output}>Connecting to database...</div>}
          
          {error && (
            <div className={`${styles.output} ${styles.error}`}>
              {error}
              {"\n\n"}Please configure DATABASE_URL in .env and run:{"\n"}
              npx prisma db seed
            </div>
          )}

          {dbStatus && (
            <>
              <div className={`${styles.output} ${styles.success}`}>
                Successfully connected to SQLite.
                {"\n"}Found {dbStatus.totalCount} total records across tables.
              </div>
              
              <div className={styles.command}>$ sqlite3 dev.db "SELECT * FROM Payment ORDER BY createdAt DESC LIMIT 5;"</div>
              <div className={styles.output}>
                {JSON.stringify(dbStatus.payments, null, 2)}
              </div>

              <div className={styles.command}>$ sqlite3 dev.db "SELECT * FROM Employee LIMIT 5;"</div>
              <div className={styles.output}>
                {JSON.stringify(dbStatus.employees, null, 2)}
              </div>

              <div className={styles.command}>$ sqlite3 dev.db "SELECT * FROM Ticket LIMIT 5;"</div>
              <div className={styles.output}>
                {JSON.stringify(dbStatus.tickets, null, 2)}
              </div>
            </>
          )}
          <div ref={consoleEndRef} />
        </div>
      </div>

      {/* Navigation handled by Global Navbar */}
    </div>
  );
}

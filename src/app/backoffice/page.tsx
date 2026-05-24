"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function BackofficeDashboard() {
  const [editorOpen, setEditorOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [rooms, setRooms] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/rooms')
      .then(res => res.json())
      .then(data => {
        if (data && Array.isArray(data)) setRooms(data);
      })
      .catch(console.error);
  }, []);

  // Mock revenue data for the bar graph
  const revenueData = [45, 60, 35, 80, 90, 110, 100, 120, 85, 75, 130, 150];

  return (
    <div className={styles.adminLayout}>
      {/* Sidebar Navigation */}
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <span className={styles.brandIcon}>❖</span>
          <span>ENTERPRISE</span>
        </div>
        
        <nav className={styles.navMenu}>
          <div className={`${styles.navItem} ${activeTab === 'dashboard' ? styles.active : ''}`} onClick={() => setActiveTab('dashboard')}>
            📊 Dashboard
          </div>
          <div className={`${styles.navItem} ${activeTab === 'branches' ? styles.active : ''}`} onClick={() => setEditorOpen(true)}>
            🏢 Branch Tools
          </div>
          <div className={`${styles.navItem} ${activeTab === 'programming' ? styles.active : ''}`}>
            🎬 Programming
          </div>
        </nav>

        <div className={styles.userProfile}>
          <div className={styles.avatar}>AM</div>
          <div>
            <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Admin Manager</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>Global Access</div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.pageTitle}>Command Center</h1>
          <select className={styles.dateRange}>
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>
        </div>

        <div className={styles.dashboardGrid}>
          {/* Revenue Graph Widget */}
          <div className={`${styles.widget} ${styles.graphContainer} animate-slide-up`}>
            <div className={styles.widgetHeader}>
              <h3 className={styles.widgetTitle}>Daily Box Office Revenue</h3>
              <span className={styles.trend} style={{ color: 'var(--accent-emerald)' }}>+14.2%</span>
            </div>
            <div className={styles.graphArea}>
              {revenueData.map((height, i) => (
                <div key={i} className={styles.bar} style={{ height: `${(height / 150) * 100}%` }}></div>
              ))}
            </div>
          </div>

          {/* Seat Utilization Radial Widget */}
          <div className={`${styles.widget} animate-slide-up`} style={{ animationDelay: '0.1s' }}>
            <div className={styles.widgetHeader}>
              <h3 className={styles.widgetTitle}>Seat Utilization</h3>
            </div>
            <div className={styles.radialContainer}>
              <div className={styles.radialCircle}>
                <span className={styles.radialText}>75%</span>
              </div>
              <div style={{ marginTop: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Across all auditoriums
              </div>
            </div>
          </div>

          {/* Secondary Stats */}
          <div className={`${styles.widget} animate-slide-up`} style={{ animationDelay: '0.2s' }}>
            <div className={styles.widgetHeader}>
              <h3 className={styles.widgetTitle}>Active Sessions</h3>
            </div>
            <div className={styles.widgetValue}>1,248</div>
            <div className={`${styles.trend} ${styles.trendUp}`}>+8% vs last hour</div>
          </div>

          <div className={`${styles.widget} animate-slide-up`} style={{ animationDelay: '0.3s' }}>
            <div className={styles.widgetHeader}>
              <h3 className={styles.widgetTitle}>Concessions</h3>
            </div>
            <div className={styles.widgetValue}>₹42.5k</div>
            <div className={`${styles.trend} ${styles.trendUp}`}>+12% vs yesterday</div>
          </div>

          <div className={`${styles.widget} animate-slide-up`} style={{ animationDelay: '0.4s' }}>
            <div className={styles.widgetHeader}>
              <h3 className={styles.widgetTitle}>System Health</h3>
            </div>
            <div className={styles.widgetValue} style={{ color: 'var(--accent-cyan)' }}>99.9%</div>
            <div className={styles.trend} style={{ color: 'var(--text-secondary)' }}>All branches operational</div>
          </div>

          {/* Rooms Widget */}
          <div className={`${styles.widget} animate-slide-up`} style={{ animationDelay: '0.5s', gridColumn: '1 / -1' }}>
            <div className={styles.widgetHeader}>
              <h3 className={styles.widgetTitle}>Room & Task Management</h3>
              <button className="btn btn-secondary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem' }} onClick={() => setEditorOpen(true)}>Manage Rooms</button>
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
              {rooms.length === 0 ? (
                <div style={{ color: 'var(--text-secondary)' }}>No rooms registered.</div>
              ) : (
                rooms.map(room => (
                  <div key={room.id} style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-light)', minWidth: '200px' }}>
                    <div style={{ fontWeight: 'bold' }}>{room.name}</div>
                    <div style={{ fontSize: '0.85rem', color: room.status === 'Available' ? 'var(--accent-emerald)' : 'var(--accent-amber)' }}>{room.status}</div>
                    <div style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: 'var(--text-secondary)' }}>Next Cleaning: {room.cleaningSchedule || 'Not set'}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Slide-out Editor Sheet */}
      <div className={`${styles.editorSheet} ${editorOpen ? styles.open : ''}`}>
        <div className={styles.sheetHeader}>
          <h2>Manage Resources</h2>
          <button className={styles.closeBtn} onClick={() => setEditorOpen(false)}>×</button>
        </div>
        <div className={styles.sheetContent}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Add New Room Name</label>
            <input type="text" className={styles.formInput} placeholder="e.g. Auditorium 4" id="newRoomName" />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Status</label>
            <select className={styles.formInput} id="newRoomStatus">
              <option value="Available">Available</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
          <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setEditorOpen(false)}>Cancel</button>
          <button className="btn btn-primary" style={{ flex: 1 }} onClick={async () => {
            const name = (document.getElementById('newRoomName') as HTMLInputElement).value;
            const status = (document.getElementById('newRoomStatus') as HTMLSelectElement).value;
            if (!name) return;
            
            await fetch('/api/rooms', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ name, status, cleaningSchedule: 'Today, 10:00 PM' })
            });
            window.location.reload();
          }}>Add Room</button>
        </div>
        
        <hr style={{ borderColor: 'var(--border-light)', margin: '2rem 0' }} />
        
        <div className={styles.sheetContent}>
          <h3>Export Data</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Download a full CSV export of all database records.
          </p>
          <a href="/api/export" className="btn btn-secondary" style={{ width: '100%', textAlign: 'center', display: 'block' }}>
            Download CSV Export
          </a>
        </div>
      </div>
    </div>
  );
}

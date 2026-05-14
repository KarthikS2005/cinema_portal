"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function BackofficeDashboard() {
  const [editorOpen, setEditorOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

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
          <Link href="/hr" className={styles.navItem}>
            👥 HR & Staff
          </Link>
          <Link href="/" className={styles.navItem}>
            🌐 Public Portal
          </Link>
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
            <div className={styles.widgetValue}>$42.5k</div>
            <div className={`${styles.trend} ${styles.trendUp}`}>+12% vs yesterday</div>
          </div>

          <div className={`${styles.widget} animate-slide-up`} style={{ animationDelay: '0.4s' }}>
            <div className={styles.widgetHeader}>
              <h3 className={styles.widgetTitle}>System Health</h3>
            </div>
            <div className={styles.widgetValue} style={{ color: 'var(--accent-cyan)' }}>99.9%</div>
            <div className={styles.trend} style={{ color: 'var(--text-secondary)' }}>All branches operational</div>
          </div>
        </div>
      </main>

      {/* Slide-out Editor Sheet */}
      <div className={`${styles.editorSheet} ${editorOpen ? styles.open : ''}`}>
        <div className={styles.sheetHeader}>
          <h2>Edit Branch Details</h2>
          <button className={styles.closeBtn} onClick={() => setEditorOpen(false)}>×</button>
        </div>
        <div className={styles.sheetContent}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Branch Name</label>
            <input type="text" className={styles.formInput} defaultValue="Metropolis Downtown Multiplex" />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Status</label>
            <select className={styles.formInput}>
              <option>Operational</option>
              <option>Maintenance</option>
              <option>Closed</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Manager Override PIN</label>
            <input type="password" className={styles.formInput} defaultValue="********" />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
          <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setEditorOpen(false)}>Cancel</button>
          <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => setEditorOpen(false)}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}

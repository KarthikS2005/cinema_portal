"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

const MOCK_EMPLOYEES = [
  { id: 1, name: 'Sarah Jenkins', role: 'General Manager', location: 'Metropolis Downtown', wage: '$8,500/mo', type: 'monthly' },
  { id: 2, name: 'David Chen', role: 'Projectionist', location: 'Metropolis Downtown', wage: '$28.50/hr', type: 'hourly' },
  { id: 3, name: 'Maria Rodriguez', role: 'Box Office Lead', location: 'Gotham Central', wage: '$22.00/hr', type: 'hourly' },
  { id: 4, name: 'James Wilson', role: 'Usher', location: 'Metropolis Downtown', wage: '$18.00/hr', type: 'hourly' },
  { id: 5, name: 'Emily Taylor', role: 'Concessions', location: 'Star City Plaza', wage: '$17.50/hr', type: 'hourly' }
];

const MOCK_SHIFTS = [
  { id: 1, date: 'Oct 24, 2026', time: '08:00 AM - 04:30 PM', duration: '8.5h' },
  { id: 2, date: 'Oct 23, 2026', time: '09:00 AM - 05:00 PM', duration: '8.0h' },
  { id: 3, date: 'Oct 22, 2026', time: '08:00 AM - 04:00 PM', duration: '8.0h' },
  { id: 4, date: 'Oct 20, 2026', time: '10:00 AM - 07:00 PM', duration: '9.0h (1h OT)' },
];

export default function HRDashboard() {
  const [activeEmp, setActiveEmp] = useState(MOCK_EMPLOYEES[1]);

  return (
    <div className={styles.hrLayout}>
      <header className={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '1.5rem', color: 'var(--accent-cyan)' }}>👥</span>
          <h1 style={{ fontFamily: 'var(--font-display)' }}>HR Command</h1>
        </div>
        <div className={styles.navLinks}>
          <button className="btn btn-primary">Add Employee</button>
        </div>
      </header>

      <div className={styles.content}>
        {/* Left Sidebar: Employee Directory */}
        <div className={styles.directory}>
          <div className={styles.directoryHeader}>
            <h2 style={{ fontSize: '1.2rem' }}>Staff Roster</h2>
            <input type="text" placeholder="Search by name or role..." className={styles.searchBar} />
          </div>
          <div>
            {MOCK_EMPLOYEES.map(emp => (
              <div 
                key={emp.id} 
                className={`${styles.employeeCard} ${activeEmp.id === emp.id ? styles.active : ''}`}
                onClick={() => setActiveEmp(emp)}
              >
                <div className={styles.avatar}>
                  {emp.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className={styles.empName}>{emp.name}</div>
                  <div className={styles.empRole}>{emp.role} • {emp.wage}</div>
                  <div className={styles.empLocation}>{emp.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Area: Split Tabular View */}
        <div className={styles.detailsView}>
          {/* Timecard Tracker */}
          <div className={`${styles.panel} animate-slide-up`}>
            <div className={styles.panelHeader}>
              <h2 className={styles.panelTitle}>Active Timecard</h2>
              <span style={{ color: 'var(--text-secondary)' }}>Current Pay Period</span>
            </div>
            <div className={styles.panelBody}>
              <div className={styles.timecard}>
                {MOCK_SHIFTS.map(shift => (
                  <div key={shift.id} className={styles.shiftCard}>
                    <div>
                      <div className={styles.shiftDate}>{shift.date}</div>
                      <div className={styles.shiftTime}>{shift.time}</div>
                    </div>
                    <div className={styles.shiftDuration}>{shift.duration}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Payroll Sheet */}
          <div className={`${styles.panel} animate-slide-up`} style={{ animationDelay: '0.1s' }}>
            <div className={styles.panelHeader}>
              <h2 className={styles.panelTitle}>Digital Payroll Sheet</h2>
              <button className="btn btn-secondary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem' }}>Edit</button>
            </div>
            <div className={styles.panelBody}>
              <div className={styles.payrollForm}>
                <div className={styles.wageRow}>
                  <div className={styles.wageLabel}>Base Wage (33.5 hrs)</div>
                  <input type="text" className={styles.wageInput} defaultValue="$954.75" />
                </div>
                <div className={styles.wageRow}>
                  <div className={styles.wageLabel}>Overtime (1.0 hrs @ 1.5x)</div>
                  <input type="text" className={styles.wageInput} defaultValue="$42.75" />
                </div>
                <div className={styles.wageRow} style={{ borderColor: 'transparent', paddingBottom: '0.5rem' }}>
                  <div className={styles.wageLabel}>Gross Pay</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>$997.50</div>
                </div>
                
                <div style={{ height: '1px', background: 'var(--border-light)', margin: '0.5rem 0' }}></div>
                
                <div className={styles.wageRow}>
                  <div className={styles.wageLabel}>Tax Deductions (Federal)</div>
                  <input type="text" className={styles.wageInput} defaultValue="-$112.50" style={{ color: 'var(--accent-crimson)' }} />
                </div>
                <div className={styles.wageRow}>
                  <div className={styles.wageLabel}>Tax Deductions (State)</div>
                  <input type="text" className={styles.wageInput} defaultValue="-$48.20" style={{ color: 'var(--accent-crimson)' }} />
                </div>

                <div className={styles.totalRow}>
                  <span>Net Pay Auth</span>
                  <span>$836.80</span>
                </div>

                <div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '1rem' }}>Payment Authorization Key</div>
                  <div className={styles.authKey}>AUTH-8X9Y-2026-XQ</div>
                </div>

                <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Authorize Payment</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

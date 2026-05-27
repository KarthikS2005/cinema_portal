"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

const MOCK_EMPLOYEES = [
  { id: 1, name: 'Sarah Jenkins', role: 'General Manager', location: 'Metropolis Downtown', wage: '₹8,500/mo', type: 'monthly' },
  { id: 2, name: 'David Chen', role: 'Projectionist', location: 'Metropolis Downtown', wage: '₹28.50/hr', type: 'hourly' },
  { id: 3, name: 'Maria Rodriguez', role: 'Box Office Lead', location: 'Gotham Central', wage: '₹22.00/hr', type: 'hourly' },
  { id: 4, name: 'James Wilson', role: 'Usher', location: 'Metropolis Downtown', wage: '₹18.00/hr', type: 'hourly' },
  { id: 5, name: 'Emily Taylor', role: 'Concessions', location: 'Star City Plaza', wage: '₹17.50/hr', type: 'hourly' }
];

const MOCK_SHIFTS = [
  { id: 1, date: 'Oct 24, 2026', time: '08:00 AM - 04:30 PM', duration: '8.5h' },
  { id: 2, date: 'Oct 23, 2026', time: '09:00 AM - 05:00 PM', duration: '8.0h' },
  { id: 3, date: 'Oct 22, 2026', time: '08:00 AM - 04:00 PM', duration: '8.0h' },
  { id: 4, date: 'Oct 20, 2026', time: '10:00 AM - 07:00 PM', duration: '9.0h (1h OT)' },
];

export default function HRDashboard() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [activeEmp, setActiveEmp] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState("Bank Transfer");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editorMode, setEditorMode] = useState<'add' | 'edit'>('add');
  const [formData, setFormData] = useState({ id: '', name: '', role: 'Cleaner', location: 'Metropolis Downtown', wage: '', type: 'hourly', shift: 'Morning', address: 'Bangalore' });

  const ROLES = ['Cleaner', 'Booking Operator', 'Projector Handler', 'Manager', 'Supervisor', 'Technical Staff'];
  const SHIFTS = ['Morning', 'Afternoon', 'Night'];
  const CITIES = ['Bangalore', 'Hubli', 'Dharwad', 'Belagavi', 'Mangalore', 'Mysuru'];

  // Fetch employees from DB
  useEffect(() => {
    fetch('/api/employees')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setEmployees(data);
          setActiveEmp(data[0]);
        }
      })
      .catch(console.error);
  }, []);

  const handleDeleteEmployee = async (id: any) => {
    try {
      await fetch(`/api/employees/${id}`, { method: 'DELETE' });
      const updated = employees.filter(e => e.id !== id);
      setEmployees(updated);
      if (activeEmp?.id === id) setActiveEmp(updated[0] || null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveEmployee = async () => {
    try {
      const url = editorMode === 'add' ? '/api/employees' : `/api/employees/${formData.id}`;
      const method = editorMode === 'add' ? 'POST' : 'PUT';
      const payload = { ...formData };
      if (editorMode === 'add') {
        // @ts-ignore
        delete payload.id;
      }

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const saved = await res.json();
      if (editorMode === 'add') {
        setEmployees([...employees, saved]);
      } else {
        setEmployees(employees.map(e => e.id === saved.id ? saved : e));
        if (activeEmp?.id === saved.id) setActiveEmp(saved);
      }
      setIsEditorOpen(false);
    } catch (e) {
      console.error(e);
    }
  };

  const openEditor = (mode: 'add' | 'edit', emp?: any) => {
    setEditorMode(mode);
    if (mode === 'edit' && emp) {
      setFormData({ ...emp, wage: emp.wage?.toString() || '' });
    } else {
      setFormData({ id: '', name: '', role: 'Cleaner', location: 'Metropolis Downtown', wage: '', type: 'hourly', shift: 'Morning', address: 'Bangalore' });
    }
    setIsEditorOpen(true);
  };

  const handleAuthorizePayment = async () => {
    setIsProcessing(true);
    try {
      await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 836.80, method: paymentMethod, purpose: 'Salary', referenceId: activeEmp?.id?.toString() })
      });
      // Deduct balance locally for instant UI update
      if (activeEmp) {
        const updatedActive = { ...activeEmp, balance: (activeEmp.balance || 0) - 836.80 };
        setActiveEmp(updatedActive);
        setEmployees(employees.map(e => e.id === updatedActive.id ? updatedActive : e));
      }
      alert('Payment Authorized Successfully!');
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className={styles.hrLayout}>
      <header className={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '1.5rem', color: 'var(--accent-cyan)' }}>👥</span>
          <h1 style={{ fontFamily: 'var(--font-display)' }}>HR Command</h1>
        </div>
        <div className={styles.navLinks}>
          <button className="btn btn-primary" onClick={() => openEditor('add')}>Add Employee</button>
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
            {employees.length === 0 ? (
              <div style={{ padding: '3rem 2rem', textAlign: 'center', background: 'var(--bg-card)', borderRadius: '12px', border: '1px dashed var(--border-light)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🧑‍💼</div>
                <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>No Employees Found</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Get started by adding your first team member.</p>
                <button 
                  style={{ background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-blue))', color: 'black', fontWeight: 'bold', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', cursor: 'pointer', transition: 'transform 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  onClick={() => openEditor('add')}
                >
                  + Add Employee
                </button>
              </div>
            ) : (
              employees.map((emp: any) => (
                <div 
                  key={emp.id} 
                  className={`${styles.employeeCard} ${activeEmp?.id === emp.id ? styles.active : ''}`}
                  onClick={() => setActiveEmp(emp)}
                >
                  <div className={styles.avatar}>
                    {emp.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className={styles.empName}>{emp.name}</div>
                    <div className={styles.empRole}>{emp.role} • {typeof emp.wage === 'number' ? `₹${emp.wage}/hr` : emp.wage}</div>
                    <div className={styles.empLocation}>{emp.location} | {emp.shift} | {emp.address || 'N/A'}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button 
                      style={{ background: 'transparent', border: 'none', color: 'var(--accent-cyan)', cursor: 'pointer', fontSize: '1rem' }}
                      onClick={(e) => { e.stopPropagation(); openEditor('edit', emp); }}
                    >
                      ✎
                    </button>
                    <button 
                      style={{ background: 'transparent', border: 'none', color: 'var(--accent-crimson)', cursor: 'pointer', fontSize: '1rem' }}
                      onClick={(e) => { e.stopPropagation(); handleDeleteEmployee(emp.id); }}
                    >
                      ✖
                    </button>
                  </div>
                </div>
              ))
            )}
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
              <span style={{ fontSize: '0.85rem', color: 'var(--accent-amber)' }}>Balance: ₹{activeEmp?.balance?.toFixed(2) || '0.00'}</span>
            </div>
            <div className={styles.panelBody}>
              <div className={styles.payrollForm}>
                <div className={styles.wageRow}>
                  <div className={styles.wageLabel}>Base Wage (33.5 hrs)</div>
                  <input type="text" className={styles.wageInput} defaultValue="₹954.75" />
                </div>
                <div className={styles.wageRow}>
                  <div className={styles.wageLabel}>Overtime (1.0 hrs @ 1.5x)</div>
                  <input type="text" className={styles.wageInput} defaultValue="₹42.75" />
                </div>
                <div className={styles.wageRow} style={{ borderColor: 'transparent', paddingBottom: '0.5rem' }}>
                  <div className={styles.wageLabel}>Gross Pay</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>₹997.50</div>
                </div>
                
                <div style={{ height: '1px', background: 'var(--border-light)', margin: '0.5rem 0' }}></div>
                
                <div className={styles.wageRow}>
                  <div className={styles.wageLabel}>Tax Deductions (Federal)</div>
                  <input type="text" className={styles.wageInput} defaultValue="-₹112.50" style={{ color: 'var(--accent-crimson)' }} />
                </div>
                <div className={styles.wageRow}>
                  <div className={styles.wageLabel}>Tax Deductions (State)</div>
                  <input type="text" className={styles.wageInput} defaultValue="-₹48.20" style={{ color: 'var(--accent-crimson)' }} />
                </div>

                <div className={styles.totalRow}>
                  <span>Net Pay Auth</span>
                  <span>₹836.80</span>
                </div>

                <div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '1rem' }}>Payment Method</div>
                  <select 
                    value={paymentMethod} 
                    onChange={(e) => setPaymentMethod(e.target.value)} 
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-dark)', color: 'white', border: '1px solid var(--border-light)', marginTop: '0.25rem' }}
                  >
                    <option value="Bank Transfer" style={{ color: 'black' }}>Bank Transfer</option>
                    <option value="NPCI (UPI)" style={{ color: 'black' }}>NPCI (UPI)</option>
                    <option value="Credit Card" style={{ color: 'black' }}>Credit Card</option>
                    <option value="Cash" style={{ color: 'black' }}>Cash</option>
                  </select>
                </div>

                <button 
                  className="btn btn-primary" 
                  style={{ width: '100%', marginTop: '1rem' }}
                  onClick={handleAuthorizePayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Authorize Payment'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide-out Employee Editor Sheet */}
      {isEditorOpen && (
        <div className={`${styles.editorSheet} ${styles.open}`}>
          <div className={styles.sheetHeader}>
            <h2>{editorMode === 'add' ? 'Add Employee' : 'Edit Employee'}</h2>
            <button className={styles.closeBtn} onClick={() => setIsEditorOpen(false)}>×</button>
          </div>
          <div className={styles.sheetContent}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Name</label>
              <input type="text" className={styles.formInput} style={{ background: 'var(--bg-dark)', color: 'white' }} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Employee Name" />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Daily Job Role</label>
              <select className={styles.formInput} style={{ background: 'var(--bg-dark)', color: 'white' }} value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                {ROLES.map(r => <option key={r} value={r} style={{ color: 'black' }}>{r}</option>)}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Shift</label>
              <select className={styles.formInput} style={{ background: 'var(--bg-dark)', color: 'white' }} value={formData.shift} onChange={e => setFormData({...formData, shift: e.target.value})}>
                {SHIFTS.map(s => <option key={s} value={s} style={{ color: 'black' }}>{s}</option>)}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Address (City)</label>
              <select className={styles.formInput} style={{ background: 'var(--bg-dark)', color: 'white' }} value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})}>
                {CITIES.map(c => <option key={c} value={c} style={{ color: 'black' }}>{c}</option>)}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Base Wage (₹/hr)</label>
              <input type="number" className={styles.formInput} style={{ background: 'var(--bg-dark)', color: 'white' }} value={formData.wage} onChange={e => setFormData({...formData, wage: e.target.value})} placeholder="e.g. 50" />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto', padding: '2rem' }}>
            <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setIsEditorOpen(false)}>Cancel</button>
            <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleSaveEmployee}>Save Employee</button>
          </div>
        </div>
      )}
    </div>
  );
}

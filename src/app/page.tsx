"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './page.module.css';



export default function CustomerPortal() {
  const [location, setLocation] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/movies')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setMovies(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    // Simulate geolocation detection
    setTimeout(() => {
      setLocation("Metropolis Downtown Multiplex");
    }, 1500);
  }, []);

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) || movie.genre.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion ? movie.region === selectedRegion : true;
    const matchesGenre = selectedGenre ? movie.genre.toLowerCase().includes(selectedGenre.toLowerCase()) : true;
    return matchesSearch && matchesRegion && matchesGenre;
  });

  return (
    <main className={styles.hero}>
      {/* Geolocation Banner */}
      <div className={`${styles.geolocationBanner} glass-panel animate-slide-up`}>
        <span className={styles.bannerIcon}>📍</span>
        <div className={styles.bannerText}>
          {location ? (
             <span>Your closest theater: <strong>{location}</strong></span>
          ) : (
             <span>Detecting your nearest multiplex branch...</span>
          )}
        </div>
        {!location && (
          <div className={styles.bannerActions}>
            <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>Allow</button>
            <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>Decline</button>
          </div>
        )}
      </div>

      {/* Hero Content */}
      <div style={{ textAlign: 'center', marginTop: '10vh' }} className="animate-fade-in">
        <h1 style={{ fontSize: '4rem', marginBottom: '1rem', textShadow: 'var(--shadow-neon)' }}>CINEMATIC IMMERSION</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          Discover the ultimate viewing experience. Next-generation formats, premium seating, and distraction-free booking.
        </p>
      </div>

      {/* Search Interface */}
      <div className={`${styles.searchInterface} animate-slide-up`} style={{ animationDelay: '0.2s', position: 'relative', zIndex: 10 }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '300px' }}>
          <input 
            type="text" 
            placeholder="Search movies..." 
            className={styles.searchInput} 
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            onFocus={() => setShowSuggestions(true)}
            style={{ width: '100%' }}
          />
          {showSuggestions && searchQuery && (
            <div style={{ position: 'absolute', top: '100%', left: 0, width: '100%', background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '8px', marginTop: '0.5rem', maxHeight: '300px', overflowY: 'auto', zIndex: 100, boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
              {filteredMovies.length > 0 ? (
                filteredMovies.map(m => (
                  <div key={m.id} onClick={() => setSearchQuery(m.title)} style={{ padding: '0.75rem 1rem', cursor: 'pointer', borderBottom: '1px solid var(--border-light)' }}>
                    <div style={{ fontWeight: 600 }}>{m.title}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{m.genre} • {m.format}</div>
                  </div>
                ))
              ) : (
                <div style={{ padding: '0.75rem 1rem', color: 'var(--text-secondary)' }}>No results found</div>
              )}
            </div>
          )}
        </div>
        <select className={styles.selectInput} value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}>
          <option value="">Any Region</option>
          <option value="Bollywood">Bollywood</option>
          <option value="Hollywood">Hollywood</option>
          <option value="South Indian">South Indian</option>
          <option value="Anime">Anime</option>
        </select>
        <select className={styles.selectInput} value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
          <option value="">Any Genre</option>
          <option value="Action">Action</option>
          <option value="Comedy">Comedy</option>
          <option value="Drama">Drama</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Romance">Romance</option>
        </select>
      </div>

      {/* Carousel Section */}
      <div className={`${styles.carouselSection} animate-fade-in`} style={{ animationDelay: '0.4s' }}>
        <div className={styles.carouselContainer}>
          {filteredMovies.map((movie) => (
            <div key={movie.id} className={styles.movieCard}>
              <img src={movie.img} alt={movie.title} className={styles.posterImage} />
              <div className={styles.cardOverlay}>
                <h3 className={styles.movieTitle}>{movie.title}</h3>
                <div className={styles.movieMeta}>
                  <span className={`${styles.badge} ${styles.badgeRating}`}>{movie.rating}</span>
                  <span className={`${styles.badge} ${styles.badgeImax}`}>{movie.format}</span>
                </div>
                <p className={styles.microSummary}>{movie.summary}</p>
                <div className={styles.cardActions}>
                  <Link href={`/checkout?movie=${movie.id}`} className="btn btn-primary" style={{ width: '100%', marginBottom: '0.5rem' }}>
                    Book Tickets
                  </Link>
                  <button className="btn btn-secondary" style={{ width: '100%' }}>
                    Watch Trailer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation handled by Global Navbar */}
    </main>
  );
}

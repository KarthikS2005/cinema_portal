"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

const MOCK_MOVIES = [
  { id: 1, title: 'DUNE: PART TWO', rating: '98%', format: 'IMAX 70MM', genre: 'Sci-Fi / Adventure', summary: 'Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.', img: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800&auto=format&fit=crop' },
  { id: 2, title: 'OPPENHEIMER', rating: '93%', format: 'DOLBY CINEMA', genre: 'Historical Drama', summary: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.', img: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=800&auto=format&fit=crop' },
  { id: 3, title: 'INTERSTELLAR', rating: '96%', format: 'IMAX 3D', genre: 'Sci-Fi / Drama', summary: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.', img: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=800&auto=format&fit=crop' },
  { id: 4, title: 'BLADE RUNNER 2049', rating: '89%', format: '4DX', genre: 'Sci-Fi / Action', summary: 'Young Blade Runner K\'s discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard.', img: 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=800&auto=format&fit=crop' },
  { id: 5, title: 'THE BATMAN', rating: '85%', format: 'DOLBY CINEMA', genre: 'Action / Crime', summary: 'When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city\'s hidden corruption.', img: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?q=80&w=800&auto=format&fit=crop' }
];

export default function CustomerPortal() {
  const [location, setLocation] = useState<string | null>(null);

  useEffect(() => {
    // Simulate geolocation detection
    setTimeout(() => {
      setLocation("Metropolis Downtown Multiplex");
    }, 1500);
  }, []);

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
      <div className={`${styles.searchInterface} animate-slide-up`} style={{ animationDelay: '0.2s' }}>
        <input type="text" placeholder="Search movies, genres, or directors..." className={styles.searchInput} />
        <select className={styles.selectInput}>
          <option value="">Any Format</option>
          <option value="imax">IMAX 70MM</option>
          <option value="dolby">Dolby Cinema</option>
          <option value="4dx">4DX Interactive</option>
        </select>
        <select className={styles.selectInput}>
          <option value="">Any Location</option>
          <option value="metropolis">Metropolis Downtown</option>
          <option value="gotham">Gotham Central</option>
        </select>
      </div>

      {/* Carousel Section */}
      <div className={`${styles.carouselSection} animate-fade-in`} style={{ animationDelay: '0.4s' }}>
        <div className={styles.carouselContainer}>
          {MOCK_MOVIES.map((movie) => (
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

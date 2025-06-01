'use client';
import React from 'react';
import './HeroBanner.css';

export default function HeroBanner() {
  return (
    <div className="hero-banner">
      <h1 className="hero-title">Iris Infinity Studio</h1>
      <p className="hero-subtext">
        Star maps, soul prints, and iris photography.
      </p>

      <div className="hero-buttons">
        <a href="/booking" className="hero-button">
          Book Your Session
        </a><span> &nbsp;&nbsp;&nbsp;  </span>
        <a href="/about" className="hero-button secondary">
          Find Out More
        </a>
      </div>
    </div>
  );
}

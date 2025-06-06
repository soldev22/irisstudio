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
<div className="d-flex flex-column flex-md-row justify-content-center gap-3 mt-4">
  <a href="/book" className="btn btn-primary btn-lg px-4">
    Book Your Session
  </a>
  <a href="/products" className="btn btn-primary btn-lg px-4">
    Our Products
  </a>
 <a href="/products/gift-voucher" className="btn btn-primary btn-lg px-4">
  🎁 Buy for a Friend
</a>
</div>

    </div>
    
  );
  
}

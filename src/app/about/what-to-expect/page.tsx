'use client';

import React from 'react';
import Link from 'next/link';

export default function WhatToExpect() {
  return (
    <div className="container py-5 text-white">
      <h1 className="mb-4 iridescent-text">What to Expect at Iris Infinity Studio</h1>

      <section className="mb-5">
        <h3>Your Experience Starts Here</h3>
        <p>Welcome to Iris Infinity Studio — where your eyes become art. Here’s everything you need to know before your session.</p>
      </section>

      <section className="mb-5">
        <h3>Location & Arrival</h3>
        <p><strong>Studio Address:</strong><br />The Crown Hub, 11 Main Street, Thornton, Fife, KY1 4AF</p>
        <ul>
          <li>Please arrive 5–10 minutes early to relax and settle in.</li>
          <li>Parking is available, or we’re a short walk from local transport links.</li>
        </ul>
      </section>

      <section className="mb-5">
        <h3>The Photoshoot</h3>
        <ul>
          <li>Quick intro to the process</li>
          <li>Iris image capture using our specialised macro lens</li>
          <li>Optional headshot if you’re purchasing a combo product</li>
          <li>Choosing background effects (nebula, star map, etc.)</li>
        </ul>
        <p>If you’re coming as a <strong>couple</strong>, we’ll show you the stunning <strong>infinity weave</strong> option.</p>
      </section>

      <section className="mb-5">
        <h3>What to Wear</h3>
        <p>Simple and neutral clothing works best for headshots. Avoid bright logos or neon colours — we want your eyes to be the star of the show.</p>
      </section>

      <section className="mb-5">
        <h3>Bring Your People</h3>
        <p>We welcome individuals, couples, families, or friends — up to <strong>6 people per session</strong>. Just let us know in advance how many are coming.</p>
      </section>

      <section className="mb-5">
        <h3>After the Shoot</h3>
        <ul>
          <li>Choose image style, size, and optional enhancements</li>
          <li>Print sizes from 400x400 to 1000x1000</li>
          <li>Nebula or star map backgrounds</li>
          <li>Digital copies available instantly</li>
        </ul>
        <p>Prints are created with our Canon 6100 Pro and typically ready within <strong>3–5 days</strong>.</p>
      </section>

      <section>
        <h3>Questions?</h3>
        <p> <Link href="/contact">Contact us</Link> directly. We’re always happy to help.</p>
      </section>
    </div>
  );
}
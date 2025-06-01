'use client';
import Image from 'next/image';

export default function AboutContent() {
  return (
    <main className="container text-white pt-5" style={{ paddingTop: '100px' }}>
      <h1 className="iridescent-text mb-4">About Us</h1>

      <p>
        <span className="float-start me-3 mb-2">
          <Image
            src="/images/team.png"
            alt="The Iris Infinity Studio team"
            width={200}
            height={150}
            loading="lazy"
            className="rounded shadow img-fluid"
          />
        </span>
        Welcome to <strong>Iris Infinity Studio</strong>, where your eye becomes art. We’re a small team based in the UK,
        dedicated to capturing the unique beauty of each individual’s iris through precision photography and artistic presentation.
      </p>

      <p>
        Our studio combines science and creativity — high-resolution iris photography, careful lighting, and optional enhancements
        like nebula backgrounds or starmaps to create timeless pieces of personal art. Whether visiting solo or as a couple,
        we’ll help you create something genuinely meaningful.
      </p>

      <p>
        We use professional studio gear and a Canon 6100 Pro printer to produce vibrant, gallery-quality prints in a range
        of formats. Every piece is handled with care from capture to delivery.
      </p>

      <hr className="border-secondary my-5" />

      <div className="row gy-4">
        <div className="col-md-6">
          <h5 className="iridescent-text">The Studio</h5>
          <p>
            Our comfortable, purpose-built space is designed to put you at ease. With professional lighting, a head stabiliser rig,
            and a calm atmosphere, we’ll help you relax so we can capture your iris in perfect clarity.
          </p>
        </div>
        <div className="col-md-6">
          <h5 className="iridescent-text">What We Believe</h5>
          <p>
            We believe every iris tells a story. Our aim is to reveal the natural patterns, colours and emotion in your eye —
            and present it as more than just a photograph. It’s your personal star map.
          </p>
        </div>
      </div>
    </main>
  );
}

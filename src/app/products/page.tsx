'use client';

import Image from 'next/image';
import router from 'next/router';
import { useRouter } from 'next/navigation'; // add this at the top of your component
import { useState } from 'react';

export default function ProductsContent() {
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);
  const router = useRouter(); // inside your ProductsContent function


  const products = [
    {
      title: 'Base Product',
      image: 'base.png',
      price: '£45',
      desc: 'Digital image with A5 headshot and A6 iris. Couples can choose an interwoven "infinity" layout.',
    },
    {
      title: '400 x 400 Print',
      image: '400x400.png',
      price: '£60',
      desc: 'Small-format print. Optional nebula background and custom star map.',
    },
    {
      title: '600 x 600 Print',
      image: '600x600.png',
      price: '£80',
      desc: 'Mid-size print for framing. Add your starmap or background effects.',
    },
    {
      title: '800 x 800 Print',
      image: '800x800.png',
      price: '£100',
      desc: 'Large square print — stunning as a centrepiece. Fully customisable.',
    },
    {
      title: '1000 x 1000 Print',
      image: 'infinityirisis.png',
      price: '£120',
      desc: 'Gallery-sized art with nebula overlays and personal star alignment.',
    },
    {
      title: 'Iris Pendants',
      image: 'pendants.png',
      price: '£75',
      desc: 'Your iris transformed into a wearable keepsake. Available in silver or gold-tone settings with optional engraving.',
    },
  ];

  const handleCheckout = async (product: { title: string; price: string }, index: number) => {
    setLoadingIndex(index);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: product.title, price: product.price }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error('Checkout API failed:', text);
        alert(`Checkout failed: ${text}`);
        return;
      }

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Stripe session URL not returned.');
        console.error('Invalid response:', data);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      alert('Failed to start checkout.');
    } finally {
      setLoadingIndex(null);
    }
  };

  return (
    <main className="container text-white pt-5" style={{ paddingTop: '100px' }}>
      <h1 className="iridescent-text mb-4">Our Products</h1>

      <p className="mb-4">
        All iris artworks start with a stunning high-resolution capture of your eye. You can then customise your piece with
        backgrounds, cosmic overlays, and a range of print sizes to suit your space or gift idea.
      </p>

      <div className="row gy-4">
        {products.map((product, i) => (
          <div key={i} className="col-12 col-sm-6 col-lg-4">
            <div className="card bg-dark text-white border-secondary h-100 shadow d-flex flex-column">
              <div className="ratio ratio-4x3">
                <Image
                  src={`/images/products/${product.image}`}
                  alt={product.title}
                  fill
                  className="card-img-top rounded-top object-fit-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h6 className="card-title iridescent-text">{product.title}</h6>
                  <p className="card-text">{product.desc}</p>
                </div>
                <div className="mt-3 d-flex justify-content-between align-items-end">
                  <span className="fw-bold text-white">{product.price}</span>
                 <button
  className="btn btn-outline-light btn-sm"
  onClick={() => {
    const cleanPrice = product.price.replace('£', '');
    router.push(`/checkout?product=${encodeURIComponent(product.title)}&price=${cleanPrice}`);
  }}
>
  Buy Now
</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

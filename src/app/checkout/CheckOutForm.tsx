'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function CheckoutForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postcode, setPostcode] = useState('');
  const [country, setCountry] = useState('United Kingdom');
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const product = searchParams.get('product');
  const price = searchParams.get('price');

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

const payload = {
  name,
  email,
  phone,
  address,
  city,
  postcode,
  country,
  product,
  price, // <-- ✅ Add this line
};

    try {
      // Save order details in DB
      const saveRes = await fetch('/api/precheckout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!saveRes.ok) {
        const msg = await saveRes.text();
        throw new Error(msg || 'Failed to save order details');
      }

      // Stripe line_items construction
const checkoutRes = await fetch('/api/stripe/checkout', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email,
    name,
    phone,
    address,
    city,
    postcode,
    country,
    price,
    title: product,
  }),
});


      if (!checkoutRes.ok) {
        const msg = await checkoutRes.text();
        throw new Error(msg || 'Stripe checkout failed');
      }

      const { url } = await checkoutRes.json();
      if (url) {
        window.location.href = url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (err: any) {
      alert('Checkout failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 pt-5 text-white">
      <h1>We’re Almost There</h1>
      <p>Your eye. Our lens. The infinite preserved forever.</p>
      <form onSubmit={handleCheckout} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input className="form-control" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone number (optional)</label>
          <input className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Street Address</label>
          <input className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">City / Town</label>
          <input className="form-control" value={city} onChange={(e) => setCity(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Postcode</label>
          <input className="form-control" value={postcode} onChange={(e) => setPostcode(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Country</label>
          <input className="form-control" value={country} onChange={(e) => setCountry(e.target.value)} required />
        </div>
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Proceed to Checkout'}
        </button>
      </form>
    </div>
  );
}

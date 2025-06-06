'use client';

import { useEffect, useState } from 'react';

export default function CheckoutForm() {
  const [product, setProduct] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postcode, setPostcode] = useState('');
  const [country, setCountry] = useState('United Kingdom');

  useEffect(() => {
  try {
    const stored = localStorage.getItem('checkoutProduct');
    if (stored) {
      const parsed = JSON.parse(stored);

      if (parsed?.title && parsed?.price) {
        // ✅ Ensure price is a number
        const cleanPrice = typeof parsed.price === 'number'
          ? parsed.price
          : parseFloat(String(parsed.price).replace(/[^\d.]/g, ''));

        if (isNaN(cleanPrice)) {
          setError('Invalid product price.');
        } else {
          setProduct({ ...parsed, price: cleanPrice });
        }
      } else {
        setError('Invalid product selected.');
      }
    } else {
      setError('No product selected.');
    }
  } catch (err) {
    console.error('Failed to parse localStorage product:', err);
    setError('Failed to load product.');
  }
}, []);


  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!product) {
      setError('Invalid product selected.');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name,
        email,
        phone,
        address,
        city,
        postcode,
        country,
        title: product.title,
        price: product.price, // ✅ should already be a number
      };

      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data?.error || 'Checkout failed');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="text-center text-danger mt-5">
        <p>{error}</p>
        <a href="/products" className="btn btn-outline-light mt-3">Back to Products</a>
      </div>
    );
  }

  if (!product) return <div className="text-white text-center mt-5">Loading product...</div>;

  return (
    <div className="d-flex justify-content-center mt-5 mb-5">
      <form onSubmit={handleCheckout} className="w-100" style={{ maxWidth: '500px' }}>
        <h4 className="iridescent-text mb-4 text-center">{product.title}</h4>
        <p className="fw-bold text-center mb-4">
          Price: £{product.price.toFixed(2)}
        </p>

        <div className="mb-3">
          <label className="form-label">Name</label>
          <input className="form-control" value={name} onChange={e => setName(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input className="form-control" value={phone} onChange={e => setPhone(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <input className="form-control" value={address} onChange={e => setAddress(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">City</label>
          <input className="form-control" value={city} onChange={e => setCity(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Postcode</label>
          <input className="form-control" value={postcode} onChange={e => setPostcode(e.target.value)} required />
        </div>

        <div className="mb-4">
          <label className="form-label">Country</label>
          <input className="form-control" value={country} onChange={e => setCountry(e.target.value)} required />
        </div>

        <button type="submit" className="btn btn-success w-100" disabled={loading}>
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
    </div>
  );
}

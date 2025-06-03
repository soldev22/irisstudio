'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const product = searchParams.get('product') || 'Iris Infinity Artwork';
  const price = searchParams.get('price') || '45';

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postcode, setPostcode] = useState('');
  const [country, setCountry] = useState('United Kingdom');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheckout = async () => {
    setLoading(true);
    setError('');
    try {
      // Save precheckout details
      const saveRes = await fetch('/api/precheckout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: product,
          price,
          email,
          phone,
          name,
          address,
          city,
          postcode,
          country,
        }),
      });

      if (!saveRes.ok) {
        const msg = await saveRes.text();
        throw new Error(msg || 'Failed to save data');
      }

      // Proceed to Stripe
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: product,
          price,
          email,
          phone,
          name,
          address,
          city,
          postcode,
          country,
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No URL returned from checkout');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container text-white py-5">
      <div className="text-center mb-4">
        <h1 className="iridescent-text display-5">We’re Almost There</h1>
        <p className="lead">Your eye. Our lens. The infinite preserved forever.</p>
      </div>

      <div className="bg-dark p-4 rounded shadow-sm border border-secondary">
        <h4 className="iridescent-text">{product}</h4>
        <p className="mb-2">Price: <strong>£{price}</strong></p>
        <p className="text-muted">Before we whisk you off to secure checkout, let’s collect your details for confirmation and shipping.</p>

        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone number <small className="text-muted">(optional)</small></label>
          <input type="tel" className="form-control" value={phone} onChange={e => setPhone(e.target.value)} />
        </div>

        <hr className="text-secondary" />

        <h5 className="iridescent-text">Shipping Address</h5>

        <div className="mb-3">
          <label className="form-label">Street Address</label>
          <input type="text" className="form-control" value={address} onChange={e => setAddress(e.target.value)} required />
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">City / Town</label>
            <input type="text" className="form-control" value={city} onChange={e => setCity(e.target.value)} required />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Postcode</label>
            <input type="text" className="form-control" value={postcode} onChange={e => setPostcode(e.target.value)} required />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Country</label>
          <input type="text" className="form-control" value={country} onChange={e => setCountry(e.target.value)} />
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <button
          className="btn btn-light btn-lg w-100 mt-3"
          disabled={loading || !email || !name || !address || !city || !postcode}
          onClick={handleCheckout}
        >
          {loading ? 'Redirecting…' : 'Proceed to Checkout'}
        </button>
      </div>

      <div className="mt-5 text-center text-muted">
        <p className="fst-italic">"Together, we’re making art from the stardust in your eyes."</p>
      </div>
    </main>
  );
}

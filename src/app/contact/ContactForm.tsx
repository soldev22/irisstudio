'use client';
import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setStatus('Message sent!');
      setFormData({ name: '', email: '', message: '' });
    } else {
      setStatus('Something went wrong.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4" autoComplete="off">
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Your Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-control"
          value={formData.name}
          onChange={handleChange}
          autoComplete="off"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Your Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-control"
          value={formData.email}
          onChange={handleChange}
          autoComplete="off"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="message" className="form-label">Your Message</label>
        <textarea
          id="message"
          name="message"
          className="form-control"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          autoComplete="off"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Send Message</button>
      {status && <div className="mt-3">{status}</div>}
    </form>
  );
}

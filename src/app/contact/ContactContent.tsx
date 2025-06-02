'use client';
import dynamic from 'next/dynamic';

const ContactForm = dynamic(() => import('@/app/contact/ContactForm'), { ssr: false });

export default function ContactContent() {
  return (
    <div className="container py-5">
      <h1 className="display-5 iridescent-text">Contact Us</h1>
      <p className="lead text-white">
        Have a question or want to book an experience? Send us a message using the form below.
      </p>
      <ContactForm />
    </div>
  );
}

// File: src/app/checkout/page.tsx
import React, { Suspense } from 'react';
import CheckoutForm from './CheckOutForm';

export default function CheckoutPage() {
  return (
    <Suspense fallback={<p className="text-white p-5">Loading checkout...</p>}>
      <CheckoutForm />
    </Suspense>
  );
}

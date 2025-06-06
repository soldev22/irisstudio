'use client';

import { useEffect, useState } from 'react';
import BookingForm from './BookingForm';

export default function ClientBookingFormWrapper() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return <BookingForm />;
}

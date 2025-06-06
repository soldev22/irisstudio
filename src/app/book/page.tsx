// This is a SERVER COMPONENT
import ClientBookingFormWrapper from '@/components/ClientBookingFormWrapper';

export default function BookSessionPage() {
  return (
    <section className="container py-5">
      <h1 className="text-white mb-4">Book Your Iris Session</h1>
      <ClientBookingFormWrapper />
    </section>
  );
}

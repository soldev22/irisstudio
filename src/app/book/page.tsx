// This is a SERVER COMPONENT
import ClientBookingFormWrapper from '@/components/ClientBookingFormWrapper';

export default function BookSessionPage() {
  return (
    <section className="container py-5">
      <h1 className="text-white mb-4">Book Your Iris Session</h1><span style={{ fontSize: '1.5rem' }}>The Crown Hub <br></br>11 Main Street Thornton<br></br> Fife KY1 4AF</span><br></br>
<span style={{ fontSize: '1.2rem', fontWeight: 600 }}>07739 870670</span><br></br><br></br>


      <ClientBookingFormWrapper />
    </section>
  );
}

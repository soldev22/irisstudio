'use client';

export default function ContactContent() {
  return (
    <main className="container text-white pt-5" style={{ paddingTop: '100px' }}>
      <h1 className="iridescent-text mb-4">Contact Us</h1>

      <p className="mb-5">
        We'd love to hear from you — whether you have a question about booking, want to commission a custom piece,
        or just want to say hello.
      </p>

      <div className="row gy-5">
        {/* DIGITAL FORM */}
        <div className="col-md-6">
          <h5 className="iridescent-text mb-3">Send Us a Message</h5>
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control bg-dark text-white border-secondary" id="name" placeholder="Your name" />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control bg-dark text-white border-secondary" id="email" placeholder="you@example.com" />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea className="form-control bg-dark text-white border-secondary" id="message" rows={5} placeholder="Type your message here..." />
            </div>
            <button type="submit" className="btn btn-outline-light">Send Message</button>
          </form>
        </div>

        {/* ANALOGUE INFO */}
        <div className="col-md-6">
          <h5 className="iridescent-text mb-3">Visit or Call Us</h5>
          <p>
            <strong>Studio Address:</strong><br />
            The Crown Hub<br />
            Main Street<br />
            Thornton, ky1 4AF<br />
            Fife
          </p>

          <p>
            <strong>Phone:</strong><br />
            <a href="tel:07739870670" className="text-white text-decoration-underline">07739870670</a>
          </p>

          <p>
            <strong>Email:</strong><br />
            <a href="mailto:mike@solutionsdeveloped.co.uk" className="text-white text-decoration-underline">mike@solutionsdeveloped.co.uk</a>
          </p>

          <div className="ratio ratio-16x9 mt-4 rounded overflow-hidden border border-secondary">
            <iframe
              src="https://www.google.com/maps?q=Kirkcaldy+KY1+4AF&output=embed"
              loading="lazy"
              style={{ border: 0 }}
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </main>
  );
}

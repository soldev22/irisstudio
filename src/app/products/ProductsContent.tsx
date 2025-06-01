'use client';

export default function ProductsContent() {
  return (
    <main className="container text-white pt-5" style={{ paddingTop: '100px' }}>
      <h1 className="iridescent-text mb-4">Our Products</h1>

      <p className="mb-4">
        All iris artworks start with a stunning high-resolution capture of your eye. You can then customise your piece with
        backgrounds, cosmic overlays, and a range of print sizes to suit your space or gift idea.
      </p>

      <div className="row gy-4">
        {/* Base Product */}
        <div className="col-md-6 col-lg-4">
          <div className="card bg-dark text-white border-secondary h-100 shadow">
            <div className="card-body">
              <h5 className="card-title iridescent-text">Base Product</h5>
              <p className="card-text">
                A digital image with an A5 headshot and A6 iris image. Couples can choose an interwoven "infinity" iris layout.
              </p>
            </div>
          </div>
        </div>

        {/* 400x400 Print */}
        <div className="col-md-6 col-lg-4">
          <div className="card bg-dark text-white border-secondary h-100 shadow">
            <div className="card-body">
              <h5 className="card-title iridescent-text">400 x 400 Print</h5>
              <p className="card-text">
                Small-format iris print. Optional extras: nebula background, custom star map overlay.
              </p>
            </div>
          </div>
        </div>

        {/* 600x600 Print */}
        <div className="col-md-6 col-lg-4">
          <div className="card bg-dark text-white border-secondary h-100 shadow">
            <div className="card-body">
              <h5 className="card-title iridescent-text">600 x 600 Print</h5>
              <p className="card-text">
                Medium square print — perfect for framing. Fully customisable with date-based cosmic elements.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Sizes (feel free to add more) */}
        <div className="col-md-6 col-lg-4">
          <div className="card bg-dark text-white border-secondary h-100 shadow">
            <div className="card-body">
              <h5 className="card-title iridescent-text">800 x 800</h5>
              <p className="card-text">Large statement piece with options for star field overlays and metallic finishes.</p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4">
          <div className="card bg-dark text-white border-secondary h-100 shadow">
            <div className="card-body">
              <h5 className="card-title iridescent-text">1000 x 1000</h5>
              <p className="card-text">Gallery-size centrepiece. Fully enhanced image with custom star map and nebula effects.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

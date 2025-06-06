'use client';

import Image from 'next/image';
import { allProducts } from '@/lib/products';
import Link from 'next/link';

export default function ProductsContent() {
  return (
    <main className="container text-white pt-5" style={{ paddingTop: '100px' }}>
      <h1 className="iridescent-text mb-4">Our Products</h1>

      <p className="mb-4">
        All iris artworks start with a stunning high-resolution capture of your eye. You can then customise your piece with
        backgrounds, cosmic overlays, and a range of print sizes to suit your space or gift idea.
      </p>

      <div className="row gy-4">
        {allProducts.map((product) => (
          <div className="col-md-6 col-lg-4" key={product.slug}>
            <div className="card bg-dark text-white border-secondary h-100 shadow">
              {product.image && (
                <Image
                  src={`/images/product/${product.image}`}
                  width={600}
                  height={400}
                  className="card-img-top"
                  alt={product.title}
                  style={{ objectFit: 'cover', height: '200px' }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title iridescent-text">{product.title}</h5>
                <p className="card-text">{product.desc}</p>
                <Link href={`/checkout?product=${product.slug}&price=${product.price}`} className="btn btn-outline-light mt-3 w-100">
                  Buy Now / Voucher
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

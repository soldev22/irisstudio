'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { allProducts } from '@/lib/products';

export default function ProductsPage() {
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);
  const router = useRouter();

  return (
    <main className="container text-white pt-5" style={{ paddingTop: '100px' }}>
      <h1 className="iridescent-text mb-4">Our Products</h1>

      <p className="mb-4">
        All iris artworks start with a stunning high-resolution capture of your eye. You can then customise your piece with
        backgrounds, cosmic overlays, and a range of print sizes to suit your space or gift idea.
      </p>

      <div className="row gy-4">
        {allProducts.map((product, i) => (
          <div key={i} className="col-12 col-sm-6 col-lg-4">
            <div className="card bg-dark text-white border-secondary h-100 shadow d-flex flex-column">
              <div className="ratio ratio-4x3">
                <Image
                  src={`/images/products/${product.image}`}
                  alt={product.title}
                  fill
                  className="card-img-top rounded-top object-fit-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h6 className="card-title iridescent-text">{product.title}</h6>
                  <p className="card-text">{product.desc}</p>
                </div>
                <div className="mt-3 d-flex justify-content-between align-items-end">
                  <span className="fw-bold text-white">£{product.price}</span>
                  <button
                    className="btn btn-outline-light btn-sm"
                    onClick={() => router.push(`/products/${product.slug}`)}
                  >
                    Find Out More
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

import Image from 'next/image';
import { notFound } from 'next/navigation';
import { allProducts } from '@/lib/products';
import BuyNowButton from '@/components/BuyNowButton';

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const product = allProducts.find(p => p.slug === slug);
  if (!product) notFound();

  return (
    <main className="container text-white pt-5" style={{ paddingTop: '100px' }}>
      <div className="row">
        <div className="col-md-6">
          <div className="ratio ratio-4x3 position-relative">
            <Image
              src={`/images/products/${product.image}`}
              alt={product.title}
              fill
              className="rounded object-fit-cover"
              sizes="100vw"
            />
          </div>
        </div>
        <div className="col-md-6">
          <h1 className="iridescent-text">{product.title}</h1>
          <p className="lead">{product.desc}</p>
          <p className="fs-4 fw-bold">Price: £{product.price}</p>
          <BuyNowButton product={product} />
        </div>
      </div>
    </main>
  );
}

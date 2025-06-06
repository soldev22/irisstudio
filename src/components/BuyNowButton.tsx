'use client';

import { useRouter } from 'next/navigation';

export default function BuyNowButton({ product }: { product: any }) {
  const router = useRouter();

  const handleClick = () => {
    localStorage.setItem('checkoutProduct', JSON.stringify(product));
    router.push('/checkout');
  };

  return (
    <button className="btn btn-primary" onClick={handleClick}>
      Buy Now
    </button>
  );
}

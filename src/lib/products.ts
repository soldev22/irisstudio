// src/lib/products.ts

export type Product = {
  slug: string;
  title: string;
  image: string;
  price: number;
  desc: string;
};

export const allProducts: Product[] = [
  {
    slug: 'base-product',
    title: 'Base Product',
    image: 'base.png',
    price: 45,
    desc: 'A stunning digital portrait of your iris, paired with a professional A5 headshot. Perfect for individuals or couples — choose an interwoven “infinity” iris layout for a symbolic connection." layout.',
  },
  {
    slug: '400x400-print',
    title: '400 x 400 Print',
    image: '400x400.png',
    price: 60,
    desc: 'A compact cosmic showcase. This 400 x 400 print captures the brilliance of your iris with optional nebula effects or a star map background from a meaningful date.',
  },
  {
    slug: '600x600-print',
    title: '600 x 600 Print',
    image: '600x600.png',
    price: 80,
    desc: 'Perfectly sized for standout display. Your iris takes centre stage in this 600 x 600 framed-ready format — personalise it with celestial backdrops or star alignment.',
  },
  {
    slug: '800x800-print',
    title: '800 x 800 Print',
    image: '800x800.png',
    price: 100,
    desc: 'A bold visual statement. This 800 x 800 print is ideal as a centrepiece — blend your iris with nebula textures, stardust, or custom colours to make it truly yours',
  },
  {
    slug: '1000x1000-print',
    title: '1000 x 1000 Print',
    image: 'infinityirisis.png',
    price: 120,
    desc: 'Gallery-grade and jaw-dropping. This oversized 1000 x 1000 format turns your iris into an immersive cosmic artwork — choose from nebula overlays or star maps locked to your chosen date.',
  },
  {
    slug: 'iris-pendants',
    title: 'Iris Pendants',
    image: 'pendants.png',
    price: 75,
    desc: 'A wearable soul print. Your iris transformed into a handcrafted pendant — available in silver or gold finishes with optional engraving to make it unmistakably yours.',
  },
  {
  slug: 'gift-voucher',
  title: 'Iris Infinity Gift Voucher',
  image: 'voucher.png',
  price: 45,
  desc: 'Looking for a truly unforgettable gift? An Iris Infinity Studio voucher (with a unique, one-time-use code) gives your loved one the chance to capture the unique beauty of their eye — transformed into cosmic art. Perfect for birthdays, anniversaries, or “just because” moments. Let them choose their date and style, and we’ll handle the magic..',
}

];

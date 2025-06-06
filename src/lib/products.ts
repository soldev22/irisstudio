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
    price: '45',
    desc: 'Digital image with A5 headshot and A6 iris. Couples can choose an interwoven "infinity" layout.',
  },
  {
    slug: '400x400-print',
    title: '400 x 400 Print',
    image: '400x400.png',
    price: '60',
    desc: 'Small-format print. Optional nebula background and custom star map.',
  },
  {
    slug: '600x600-print',
    title: '600 x 600 Print',
    image: '600x600.png',
    price: '80',
    desc: 'Mid-size print for framing. Add your starmap or background effects.',
  },
  {
    slug: '800x800-print',
    title: '800 x 800 Print',
    image: '800x800.png',
    price: '100',
    desc: 'Large square print — stunning as a centrepiece. Fully customisable.',
  },
  {
    slug: '1000x1000-print',
    title: '1000 x 1000 Print',
    image: 'infinityirisis.png',
    price: '120',
    desc: 'Gallery-sized art with nebula overlays and personal star alignment.',
  },
  {
    slug: 'iris-pendants',
    title: 'Iris Pendants',
    image: 'pendants.png',
    price: '75',
    desc: 'Your iris transformed into a wearable keepsake. Available in silver or gold-tone settings with optional engraving.',
  },
];

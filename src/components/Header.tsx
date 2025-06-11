'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';



export default function Header() {
  const pathname = usePathname();

  useEffect(() => {
    // Ensure navbar toggler works (only necessary if Bootstrap JS isn't loading)
    import('bootstrap/dist/js/bootstrap.bundle.min');
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/book', label: 'Book a Session' },
    { href: '/products', label: 'Products' },
    { href: '/contact', label: 'Contact' },
    { href:  '/about/what-to-expect', label: 'What to Expect'}
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black fixed-top border-bottom border-secondary px-4">
      <div className="container-fluid">
        <Link className="navbar-brand iridescent-text" href="/">
          Iris Infinity Studio
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {navLinks.map((link) => (
              <li className="nav-item" key={link.href}>
                <Link
                  className={`nav-link text-white ${pathname === link.href ? 'active fw-bold iridescent-text' : ''}`}
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

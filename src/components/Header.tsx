'use client';

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black border-bottom iridescent-border mb-4">
      <div className="container-fluid">
        <a className="navbar-brand iridescent-text" href="/">Iris Infinity Studio</a>
        <ul className="navbar-nav ms-auto">
          <li className="nav-item"><a className="nav-link" href="/booking">Booking</a></li>
          <li className="nav-item"><a className="nav-link" href="/products">Products</a></li>
          <li className="nav-item"><a className="nav-link" href="/login">Login</a></li>
        </ul>
      </div>
    </nav>
  );
}

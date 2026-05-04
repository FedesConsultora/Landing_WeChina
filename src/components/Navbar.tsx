import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import logo from '../assets/img/logo.png';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const close = () => setIsOpen(false);

  return (
    <header className="main-header">
      <div className="container">

        {/* Column 1: Logo */}
        <Link to="/" className="main-header__logo" onClick={close}>
          <img src={logo} alt="WeChina" />
        </Link>

        {/* Column 2: Nav — centered on desktop, dropdown on mobile */}
        <nav className={`main-header__nav${isOpen ? ' is-open' : ''}`}>
          <NavLink to="/" end onClick={close}>Inicio</NavLink>
          <NavLink to="/nosotros" onClick={close}>Nosotros</NavLink>
          <NavLink to="/servicios" onClick={close}>Servicios</NavLink>
          <NavLink to="/rubros" onClick={close}>Rubros</NavLink>
          <NavLink to="/clientes" onClick={close}>Clientes</NavLink>
        </nav>

        {/* Column 3: CTA on desktop / Hamburger on mobile */}
        <div className="main-header__actions">
          {/* CTA — hidden on mobile via CSS */}
          <a href="https://wa.me/541130897009" target="_blank" rel="noopener noreferrer" className="main-header__cta-btn" onClick={close}>
            Hablá con un experto
          </a>

          {/* Hamburger — hidden on desktop via CSS */}
          <button
            className="main-header__toggle"
            onClick={() => setIsOpen(prev => !prev)}
            aria-label="Abrir menú"
          >
            <span className={`hamburger${isOpen ? ' is-active' : ''}`} />
          </button>
        </div>

      </div>
    </header>
  );
};

export default Navbar;

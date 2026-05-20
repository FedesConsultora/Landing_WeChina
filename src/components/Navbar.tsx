import React, { useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import logo from '../assets/img/logo.png';
import logo2 from '../assets/img/logo-2.png';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  onOpenCareers: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenCareers }) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isHidden, setIsHidden] = React.useState(false);
  const lastScrollY = useRef(0);
  const close = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const diff = currentY - lastScrollY.current;

      // Hide when scrolling down fast (more than 8px) and not near top
      if (diff > 8 && currentY > 120) {
        setIsHidden(true);
        setIsOpen(false); // Close mobile menu if open
      }
      // Show when scrolling up
      if (diff < -8) {
        setIsHidden(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`main-header${isHidden ? ' main-header--hidden' : ''}${isOpen ? ' main-header--open' : ''}`}>
      <div className="container">

        {/* Column 1: Logo */}
        <Link to="/" className="main-header__logo" onClick={close}>
          <img src={logo} alt="WeChina" />
        </Link>

        {/* Column 2: Nav — centered on desktop, dropdown on mobile */}
        <nav className={`main-header__nav${isOpen ? ' is-open' : ''}`}>
          <div className="main-header__nav-links">
            <NavLink to="/" end onClick={close}>
              <img src={logo2} alt="" className="nav-icon" />
              {t.nav.home}
            </NavLink>
            <NavLink to="/nosotros" onClick={close}>
              <img src={logo2} alt="" className="nav-icon" />
              {t.nav.about}
            </NavLink>
            <NavLink to="/servicios" onClick={close}>
              <img src={logo2} alt="" className="nav-icon" />
              {t.nav.services}
            </NavLink>
            <NavLink to="/rubros" onClick={close}>
              <img src={logo2} alt="" className="nav-icon" />
              {t.nav.sectors}
            </NavLink>
          </div>

          {/* Mobile CTA Container */}
          <div className="main-header__mobile-ctas">
            <button 
              className="main-header__mobile-join-btn" 
              onClick={() => { close(); onOpenCareers(); }}
            >
              {t.nav.join}
            </button>
            <a 
              href="https://wa.me/541130897009?text=%C2%A1Hola!%20Quisiera%20m%C3%A1s%20informaci%C3%B3n" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="main-header__mobile-cta-btn"
              onClick={close}
            >
              {t.nav.cta}
            </a>
          </div>
        </nav>

        {/* Column 3: Lang + CTA on desktop / Hamburger on mobile */}
        <div className="main-header__actions">
          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* "Unite a Wechina" Desktop Button */}
          <button 
            className="main-header__join-btn" 
            onClick={() => { close(); onOpenCareers(); }}
          >
            {t.nav.join}
          </button>

          {/* CTA — hidden on mobile via CSS */}
          <a href="https://wa.me/541130897009?text=%C2%A1Hola!%20Quisiera%20m%C3%A1s%20informaci%C3%B3n" target="_blank" rel="noopener noreferrer" className="main-header__cta-btn" onClick={close}>
            {t.nav.cta}
          </a>

          {/* Hamburger — hidden on desktop via CSS */}
          <button
            className="main-header__toggle"
            onClick={() => setIsOpen(prev => !prev)}
            aria-label={t.nav.menuLabel}
          >
            {isOpen ? (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="2" y1="2" x2="20" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <line x1="20" y1="2" x2="2" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="2" y1="5" x2="20" y2="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <line x1="2" y1="11" x2="20" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <line x1="2" y1="17" x2="20" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};

export default Navbar;

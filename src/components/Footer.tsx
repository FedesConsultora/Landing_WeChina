import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/logo-2.png';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      {/* Main footer area */}
      <div className="footer__main">
        <div className="container">
          <div className="footer__grid">
            {/* Left: Logo + social */}
            <div className="footer__brand">
              <img src={logo} alt="WeChina" className="footer__logo" />
              <div className="footer__socials">
                {/* Instagram icon */}
                <a href="#" aria-label="Instagram" className="footer__social-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="2" width="20" height="20" rx="5" stroke="white" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="5" stroke="white" strokeWidth="2"/>
                    <circle cx="17.5" cy="6.5" r="1" fill="white"/>
                  </svg>
                </a>
                {/* Facebook icon */}
                <a href="#" aria-label="Facebook" className="footer__social-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Center: Map */}
            <div className="footer__map">
              <iframe
                title="WeChina Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3285.5!2d-58.4577!3d-34.5847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDM1JzA1LjAiUyA1OMKwMjcnMjcuNyJX!5e0!3m2!1ses!2sar!4v1620000000000!5m2!1ses!2sar"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Right: Contact info */}
            <div className="footer__contact">
              <h4 className="footer__contact-title">CONTACTANOS</h4>
              <div className="footer__contact-info">
                <p>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.73 12.5a19.79 19.79 0 01-3.07-8.67A2 2 0 013.66 2H6.7a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L7.91 9.91a16 16 0 006.29 6.29l1.27-1.04a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="white" strokeWidth="2"/></svg>
                  +54 11 3089 7009
                </p>
                <p>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="white" strokeWidth="2"/><polyline points="22,6 12,13 2,6" stroke="white" strokeWidth="2"/></svg>
                  oficina@wechina.com.ar
                </p>
                <p>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="white" strokeWidth="2"/><circle cx="12" cy="10" r="3" stroke="white" strokeWidth="2"/></svg>
                  Av. Triunvirato 2766, 7B, Buenos Aires
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar: darker red */}
      <div className="footer__bottom">
        <div className="container">
          <div className="footer__bottom-grid">
            <span className="footer__copy">© {new Date().getFullYear()} WeChina</span>
            <nav className="footer__links">
              <Link to="/servicios">Agentes de compras</Link>
              <Link to="/servicios">Búsqueda de proveedores</Link>
              <Link to="/servicios">Control de calidad</Link>
              <Link to="/servicios">Validación de fabricantes</Link>
              <Link to="/servicios">Fletes marítimos</Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

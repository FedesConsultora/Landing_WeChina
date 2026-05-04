import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/logo-1.png';
import igIcon from '../assets/img/ig-logo.png';
import fbIcon from '../assets/img/fb-logo.png';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      {/* Main footer area */}
      <div className="footer__main">
        <div className="container">
          <div className="footer__grid">
            {/* Left: Logo + social */}
            <div className="footer__brand">
              <div className="footer__logo-container">
                <img src={logo} alt="WeChina" className="footer__logo" />
              </div>
              <div className="footer__socials">
                {/* Instagram icon */}
                <a href="https://www.instagram.com/wechina.ar/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer__social-link">
                  <img src={igIcon} alt="Instagram" />
                </a>
                {/* Facebook icon */}
                <a href="https://www.facebook.com/wechina.ar/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="footer__social-link">
                  <img src={fbIcon} alt="Facebook" />
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
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="white" strokeWidth="2" /><circle cx="12" cy="10" r="3" stroke="white" strokeWidth="2" /></svg>
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=Av.+Triunvirato+2766%2C+7B%2C+Buenos+Aires" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Av. Triunvirato 2766, 7B, Buenos Aires
                  </a>
                </p>
                <p>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.73 12.5a19.79 19.79 0 01-3.07-8.67A2 2 0 013.66 2H6.7a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L7.91 9.91a16 16 0 006.29 6.29l1.27-1.04a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="white" strokeWidth="2" /></svg>
                  <a href="https://wa.me/541130897009" target="_blank" rel="noopener noreferrer">+54 11 3089 7009</a>
                </p>
                <p className="footer__contact-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="white" strokeWidth="2" /><polyline points="22,6 12,13 2,6" stroke="white" strokeWidth="2" /></svg>
                  <a href="mailto:oficina@wechina.com.ar?subject=Consulta%20desde%20la%20web" className="footer__email-link">
                    oficina@wechina.com.ar
                  </a>
                </p>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services section in footer */}
      <div className="footer__services-section">
        <div className="container">
          <div className="footer__services-grid">
            <div className="footer__services-title-col">
              <h4 className="footer__services-heading">SERVICIOS</h4>
              <Link to="/servicios" className="footer__services-more">
                Conocé más <span>↗</span>
              </Link>
            </div>

            <div className="footer__services-divider" />

            <div className="footer__services-links-grid">
              <div className="footer__services-col">
                <Link to="/servicios?service=agentes-de-compras">Agentes de compras</Link>
                <Link to="/servicios?service=busqueda-de-proveedores">Búsqueda de proveedores</Link>
                <Link to="/servicios?service=control-de-calidad">Control de calidad</Link>
              </div>
              <div className="footer__services-col">
                <Link to="/servicios?service=fletes-maritimos-y-aereos">Fletes marítimos y aéreos</Link>
                <Link to="/servicios?service=validacion-de-fabricantes-online">Validación de fabricantes online</Link>
                <Link to="/servicios?service=manejo-de-muestras">Manejo de muestras</Link>
              </div>
              <div className="footer__services-col">
                <Link to="/servicios?service=almacenaje-y-consolidacion-de-cargas">Almacenaje y consolidación de cargas</Link>
                <Link to="/servicios?service=viajes-de-negocios-a-china">Viajes de negocios a China</Link>
                <Link to="/servicios?service=creacion-de-marcas-propias">Creación de marcas propias</Link>
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
            <div className="footer__bottom-links">
              <p>Desarrollado por {' '}
                <a href="https://fedes.ai/" target="_blank">Fedes Consultora</a>
              </p>

            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

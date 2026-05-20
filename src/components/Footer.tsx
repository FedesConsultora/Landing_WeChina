import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/logo-1.png';
import igIcon from '../assets/img/ig-logo.png';
import fbIcon from '../assets/img/fb-logo.png';
import lkIcon from '../assets/img/lk-logo.png';

import { useLanguage } from '../context/LanguageContext';

const serviceIds = [
  'agentes-de-compras',
  'busqueda-de-proveedores',
  'control-de-calidad',
  'fletes-maritimos-y-aereos',
  'validacion-de-fabricantes-online',
  'manejo-de-muestras',
  'almacenaje-y-consolidacion-de-cargas',
  'viajes-de-negocios-a-china',
  'creacion-de-marcas-propias',
];

const Footer: React.FC = () => {
  const { t } = useLanguage();

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
                <a href="https://www.instagram.com/wechina.ar/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer__social-link">
                  <img src={igIcon} alt="Instagram" />
                </a>
                <a href="https://www.facebook.com/wechina.ar/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="footer__social-link">
                  <img src={fbIcon} alt="Facebook" />
                </a>
                <a href="https://www.linkedin.com/company/wechina-ar/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="footer__social-link">
                  <img src={lkIcon} alt="LinkedIn" />
                </a>
              </div>
            </div>

            {/* Argentina Office — map with overlay info */}
            <div className="footer__office">
              <div className="footer__map">
                <iframe
                  title="WeChina Argentina"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3285.5!2d-58.4577!3d-34.5847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDM1JzA1LjAiUyA1OMKwMjcnMjcuNyJX!5e0!3m2!1ses!2sar!4v1620000000000!5m2!1ses!2sar"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="footer__office-overlay">
                <h4 className="footer__office-title">ARGENTINA</h4>
                <p>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" /></svg>
                  Av. Triunvirato 2766, 7 B, Buenos Aires, Argentina
                </p>
                <p>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.73 12.5a19.79 19.79 0 01-3.07-8.67A2 2 0 013.66 2H6.7a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L7.91 9.91a16 16 0 006.29 6.29l1.27-1.04a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="2" /></svg>
                  +54 11 3089 7009
                </p>
                <p>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" /><polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" /></svg>
                  oficina@wechina.com.ar
                </p>
              </div>
            </div>

            {/* China Office — map with overlay info */}
            <div className="footer__office">
              <div className="footer__map">
                <iframe 
                  title="WeChina China"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3523.0704801385727!2d120.65334999999999!3d27.991740000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x344f638f999d344d%3A0x332e36d7250cbb2!2s17-A%20Kuan%20Dai%20Lu%2C%20Lu%20Cheng%20Qu%2C%20Wen%20Zhou%20Shi%2C%20Zhe%20Jiang%20Sheng%2C%20China%2C%20325029!5e0!3m2!1ses-419!2sar!4v1778606396627!5m2!1ses-419!2sar" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="footer__office-overlay">
                <h4 className="footer__office-title">CHINA</h4>
                <p>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" /></svg>
                  Wenzhou Xiangping IMP&amp;EXP CO, LTD. 3th floor, No 17A Kuandai Road, Lucheng District, Wenzhou City, Zhejiang Province, China.
                </p>
                <p>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.73 12.5a19.79 19.79 0 01-3.07-8.67A2 2 0 013.66 2H6.7a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L7.91 9.91a16 16 0 006.29 6.29l1.27-1.04a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="2" /></svg>
                  +86 1386865 6686 | +86 577 8876 0886 (FAX)
                </p>
                <p>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" /><polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" /></svg>
                  oficina@wechina.com.ar
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
              <h4 className="footer__services-heading">{t.footer.servicesTitle}</h4>
              <Link to="/servicios" className="footer__services-more">
                {t.footer.servicesMore} <span>↗</span>
              </Link>
            </div>

            <div className="footer__services-divider" />

            <div className="footer__services-links-grid">
              <div className="footer__services-col">
                {[0, 1, 2].map((i) => (
                  <Link key={i} to={`/servicios?service=${serviceIds[i]}`}>{t.footer.serviceLinks[i]}</Link>
                ))}
              </div>
              <div className="footer__services-col">
                {[3, 4, 5].map((i) => (
                  <Link key={i} to={`/servicios?service=${serviceIds[i]}`}>{t.footer.serviceLinks[i]}</Link>
                ))}
              </div>
              <div className="footer__services-col">
                {[6, 7, 8].map((i) => (
                  <Link key={i} to={`/servicios?service=${serviceIds[i]}`}>{t.footer.serviceLinks[i]}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="container">
          <div className="footer__bottom-grid">
            <span className="footer__copy">© {new Date().getFullYear()} WeChina</span>
            <div className="footer__bottom-links">
              <p>{t.footer.developedBy} {' '}
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

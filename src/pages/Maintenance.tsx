import React from 'react';
import logo from '../assets/img/logo.png';
import igIcon from '../assets/img/ig-logo.png';
import fbIcon from '../assets/img/fb-logo.png';
import maintenanceVideo from '../assets/img/nosotros/HERO-aboutus_1.mp4';

const Maintenance: React.FC = () => {
  return (
    <div className="maintenance">
      <div className="maintenance__container">
        <div className="maintenance__content">
          <div className="maintenance__logo">
            <img src={logo} alt="WeChina Logo" />
          </div>

          <h1 className="maintenance__title">
            Estamos construyendo <br />
            <span className="maintenance__highlight">algo increíble</span>
          </h1>

          <p className="maintenance__description">
            Nuestro sitio web se encuentra actualmente en mantenimiento para ofrecerte una mejor experiencia.
            Mientras tanto, dejanos un mensaje y te contactaremos a la brevedad.
          </p>

          <div className="maintenance__actions">
            <a href="mailto:info@wechina.com" className="maintenance__btn">
              Contactanos
            </a>
            <a
              href="https://wa.me/541130897009?text=%C2%A1Hola!%20Quisiera%20m%C3%A1s%20informaci%C3%B3n"
              className="maintenance__btn maintenance__btn--secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hablá con un experto
            </a>
          </div>

          <div className="maintenance__social">
            <a href="#" className="maintenance__social-link">
              <img src={fbIcon} alt="Facebook" />
            </a>
            <a href="#" className="maintenance__social-link">
              <img src={igIcon} alt="Instagram" />
            </a>
          </div>
        </div>

        <div className="maintenance__image">
          <div className="maintenance__video-container">
            <video
              src={maintenanceVideo}
              autoPlay
              muted
              loop
              playsInline
              className="maintenance__video"
            />
          </div>
        </div>
      </div>

      <div className="maintenance__footer">
        <p>© {new Date().getFullYear()} WeChina. Todos los derechos reservados.</p>
      </div>
    </div>
  );
};

export default Maintenance;

import React from 'react';
import { motion } from 'framer-motion';
import heroFallback from '../../assets/img/hero/divider.webp';
import heroVideo from '../../assets/img/hero/HERO-home_1.mp4';

const Hero: React.FC = () => {
  return (
    <section className="hero">
      {/* Desktop: video, Mobile: image via CSS class */}
      <div className="hero__media">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="hero__video"
          poster={heroFallback}
        >
          <source src={heroVideo} type="video/webm" />
        </video>
        <div className="hero__mobile-bg" style={{ backgroundImage: `url(${heroFallback})` }} />
      </div>
      <div className="hero__overlay" />

      <div className="container">
        <motion.div
          className="hero__content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          <h1>
            Eliminá el miedo a importar,<br />
            <span className="hero__highlight">con nosotros tu carga no <br /> queda varada</span>
          </h1>
          <div className='hero__subtitle'>
            <h3>Expertos allá, socios acá. 20 años eliminando los riesgos de tu inversión en Asia.</h3>
          </div>
        </motion.div>
      </div>

      <div className="hero__stats">
        <div className="container-grid">
          <div className="stats-grid">
            {[
              { value: '+20 AÑOS', label: 'trabajando para vos.' },
              { value: '+1000 CONTENEDORES', label: 'entregados satisfactoriamente.' },
              { value: '2 SEDES PROPIAS', label: 'en Argentina y China.' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="stat-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.15, duration: 0.6 }}
              >
                <span className="stat-item__value">{stat.value}</span>
                <span className="stat-item__label">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

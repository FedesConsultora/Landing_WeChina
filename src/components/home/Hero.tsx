import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import heroVideo from '../../assets/img/hero/HERO-home_1.mp4';
import { useLanguage } from '../../context/LanguageContext';

const Counter: React.FC<{ value: string }> = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  
  // Extract number and text
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10);
  const prefix = value.startsWith('+') ? '+' : '';
  const suffix = value.replace(/[+0-9]/g, '');

  useEffect(() => {
    if (isInView) {
      // Custom durations based on context
      let duration = 2;
      if (numericValue <= 10) duration = 1;
      if (numericValue > 500) duration = 2.5;

      const controls = animate(0, numericValue, {
        duration: duration,
        ease: "easeOut",
        onUpdate(value) {
          setDisplayValue(Math.floor(value));
        }
      });
      return () => controls.stop();
    } else {
      setDisplayValue(0); // Reset when out of view
    }
  }, [isInView, numericValue]);

  return (
    <span ref={ref} className="stat-item__value">
      {prefix}{displayValue}{suffix}
    </span>
  );
};

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="hero">

      {/* TEXT — rendered first in the DOM so it appears on top in mobile */}
      <div className="container">
        <motion.div
          className="hero__content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' as any }}
        >
          <h1>
            {t.hero.title}<br />
            <span className="hero__highlight">{t.hero.highlight}</span>
          </h1>
          <div className='hero__subtitle'>
            <h3>{t.hero.subtitle}</h3>
          </div>
        </motion.div>
      </div>

      {/* VIDEO — appears below text on mobile, absolute background on desktop */}
      <div className="hero__media">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="hero__video"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      </div>

      {/* Overlay (desktop only, handled via CSS) */}
      <div className="hero__overlay" />

      {/* STATS BAR */}
      <div className="hero__stats">
        <div className="container-grid">
          <div className="stats-grid">
            {t.hero.stats.map((stat, i) => (
              <motion.div
                key={i}
                className="stat-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <Counter value={stat.value} />
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

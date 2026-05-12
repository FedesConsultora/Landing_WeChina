import React from 'react';
import { motion, type Transition } from 'framer-motion';
import argentinaMap from '../../assets/img/hero/arg-map.png';
import chinaMap from '../../assets/img/hero/china-map.webp';
import { useLanguage } from '../../context/LanguageContext';

const transition = (delay = 0): Transition => ({
  duration: 0.7,
  delay,
  ease: 'easeOut',
});

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, delay, ease: 'easeOut' as const },
});

const Highlights: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="highlights">
      <div className='img-container'>
        <img src={argentinaMap} alt="argentina-map" />
        <div className="office-dot argentina-dot" />
      </div>
      <div className='highlights__china-map'>
        <img src={chinaMap} alt="china-map" />
        <div className="office-dot china-dot" />
      </div>

      <div className="container">
        <motion.div className="highlights__layout"  {...fadeUp(0)}>
          <motion.div className="highlights__main">
            <h2>{t.highlights.heading}</h2>
            <p className="highlights__text">{t.highlights.text}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Highlights;

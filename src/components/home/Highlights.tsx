import React from 'react';
import { motion, type Transition } from 'framer-motion';
import argentinaMap from '../../assets/img/hero/arg-map.png';

const transition = (delay = 0): Transition => ({
  duration: 0.7,
  delay,
  ease: 'easeOut',
});

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, delay, ease: 'easeOut' },
});

const Highlights: React.FC = () => {
  return (
    <section className="highlights">
      <div className='img-container'>
        <img src={argentinaMap} alt="argentina-map" />
      </div>
      <div className="container">
        <motion.div className="highlights__layout"  {...fadeUp(0)}>
          <motion.div className="highlights__main">
            <h2>
              EL 90% DE LOS PROBLEMAS
              DE IMPORTACIÓN <br />OCURREN POR
              FALTA DE PRESENCIA FÍSICA            </h2>

            <p className="highlights__text">Nosotros estamos ahí.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Highlights;

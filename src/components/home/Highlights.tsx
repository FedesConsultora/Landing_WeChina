import React from 'react';
import { motion, type Transition } from 'framer-motion';

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
      <div className="container">
        <div className="highlights__layout"  {...fadeUp(0)}>
          <motion.div className="highlights__main">
            <h2>
              EL 90% DE LOS PROBLEMAS
              DE IMPORTACIÓN <br />OCURREN POR
              FALTA DE PRESENCIA FÍSICA            </h2>

            <p className="highlights__text">Nosotros estamos ahí.</p>
          </motion.div>


        </div>
      </div>
    </section>
  );
};

export default Highlights;

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
  transition: transition(delay),
});

const Highlights: React.FC = () => {
  return (
    <section className="highlights">
      <div className="container">
        <div className="highlights__layout">
          <motion.div className="highlights__main">
            <h2>
              EL <span className="highlights__percent">90%</span> DE LOS PROBLEMAS
              DE IMPORTACIÓN OCURREN POR{' '}
              <span className="highlights__emphasis">FALTA DE PRESENCIA FÍSICA</span>
            </h2>
          </motion.div>

          {/* <motion.div className="highlights__sub" {...fadeUp(0.2)}>
            <p>
              Convertimos la incertidumbre de importar en un sistema de pasos
              controlados. Desde la validación legal de la fábrica hasta la
              inspección final antes del despacho.
            </p>
          </motion.div> */}
        </div>
      </div>
    </section>
  );
};

export default Highlights;

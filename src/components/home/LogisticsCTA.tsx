import React from 'react';
import { motion } from 'framer-motion';
import divider from '../../assets/img/hero/divider.webp';

const LogisticsCTA: React.FC = () => {
  return (
    <section className="logistics-cta">
      <div
        className="logistics-cta__bg"
        style={{ backgroundImage: `url(${divider})` }}
      />
      <div className="logistics-cta__overlay" />
      <div className="container">
        <motion.div
          className="logistics-cta__content"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2>
            Tus expertos en<br />
            <span className="logistics-cta__highlight">logística</span>
          </h2>
          <a href="/contacto" className="logistics-cta__btn">
            Hablá con un experto
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default LogisticsCTA;

import React from 'react';
import { motion } from 'framer-motion';
import barcoVideo from '../../assets/img/barco.mov';

const LogisticsCTA: React.FC = () => {
  return (
    <section className="logistics-cta">
      <div className="logistics-cta__bg">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="logistics-cta__video"
        >
          <source src={`${barcoVideo}#t=7`} type="video/quicktime" />
          <source src={`${barcoVideo}#t=7`} type="video/mp4" />
        </video>
      </div>
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
            <span className="logistics-cta__highlight">otro continente</span>
          </h2>
          <a href="https://wa.me/541130897009" target="_blank" rel="noopener noreferrer" className="logistics-cta__btn">
            Hablá con un experto
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default LogisticsCTA;

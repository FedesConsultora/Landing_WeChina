import React from 'react';
import { motion } from 'framer-motion';

import rubro1 from '../../assets/img/rubros/rubro-1.webp';
import rubro2 from '../../assets/img/rubros/rubro-2.webp';
import rubro3 from '../../assets/img/rubros/rubro-3.webp';
import rubro4 from '../../assets/img/rubros/rubro-4.webp';

const sectors = [
  { img: rubro1, label: 'Repuestos de autos' },
  { img: rubro2, label: 'Seguridad industrial' },
  { img: rubro3, label: 'Tus expertos en logística' },
  { img: rubro4, label: 'Moda' },
];

const SectorBridge: React.FC = () => {
  return (
    <section className="sector-bridge">
      <div className="container">
        <div className="sector-bridge__header">
          <motion.div
            className="sector-bridge__header-left"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <p className="sector-bridge__eyebrow">Tu puente directo a fabricantes</p>
            <h2 className="sector-bridge__title">LÍDERES DE CADA SECTOR</h2>
          </motion.div>
          <motion.p
            className="sector-bridge__desc"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            No somos generalistas. Contamos con equipos especializados en calzado
            e indumentaria, y una unidad exclusiva para el mercado de óptica en
            Indonesia.
          </motion.p>
        </div>

        <div className="sector-bridge__grid">
          {sectors.map((sector, i) => (
            <motion.div
              key={i}
              className="sector-card"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div
                className="sector-card__bg"
                style={{ backgroundImage: `url(${sector.img})` }}
              />
              <div className="sector-card__icon-wrap">
                {/* Placeholder icon — white circle */}
                <div className="sector-card__icon" />
              </div>
              <div className="sector-card__overlay">
                <span className="sector-card__label">{sector.label}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="sector-bridge__cta"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a href="/rubros" className="sector-bridge__link">
            Ver todos los rubros →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default SectorBridge;

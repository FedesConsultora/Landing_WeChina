import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

import rubro1 from '../../assets/img/rubros/logos/rubro-1.webp';
import rubro2 from '../../assets/img/rubros/logos/rubro-2.webp';
import rubro3 from '../../assets/img/rubros/logos/rubro-3.webp';
import rubro4 from '../../assets/img/rubros/logos/rubro-4.webp';

import iconCar from '../../assets/img/rubros/logos/car.png';
import iconSafety from '../../assets/img/rubros/logos/Safety Hat.png';
import iconBoots from '../../assets/img/rubros/logos/Winter Boots.png';
import iconDress from '../../assets/img/rubros/logos/Little Black Dress.png';

const sectors = [
  { img: rubro1, icon: iconCar, label: 'Repuestos de autos' },
  { img: rubro2, icon: iconSafety, label: 'Seguridad industrial' },
  { img: rubro4, icon: iconBoots, label: 'Calzado' },
  { img: rubro3, icon: iconDress, label: 'Moda' },
];

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};

const SectorBridge: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % sectors.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + sectors.length) % sectors.length);
  }, []);

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(nextSlide, 4000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, nextSlide]);

  const handleInteraction = () => {
    setIsAutoPlaying(false);
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };

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
            <h2 className="sector-bridge__title">TU PUENTE DIRECTO A FABRICANTES <br /> LÍDERES DE CADA SECTOR</h2>
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

        {/* MOBILE SLIDER */}
        <div className="sector-bridge__slider">
          <button
            className="sector-bridge__nav sector-bridge__nav--prev"
            onClick={() => { handleInteraction(); prevSlide(); }}
            aria-label="Previous slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          </button>

          <div className="sector-bridge__slider-track">
            <AnimatePresence initial={false} custom={direction}>
              <Link to="/rubros" style={{ position: 'absolute', display: 'block', width: '100%', height: '100%' }}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(_e, { offset, velocity }) => {
                    handleInteraction();
                    const swipe = offset.x;
                    if (swipe < -50 || velocity.x < -500) {
                      nextSlide();
                    } else if (swipe > 50 || velocity.x > 500) {
                      prevSlide();
                    }
                  }}
                  className="sector-card"
                >
                  <div
                    className="sector-card__bg"
                    style={{ backgroundImage: `url(${sectors[currentIndex].img})` }}
                  />
                  <div className="sector-card__icon-wrap">
                    <div className="sector-card__icon">
                      <img src={sectors[currentIndex].icon} alt={sectors[currentIndex].label} className="sector-card__icon-img" />
                    </div>
                  </div>
                  <div className="sector-card__overlay">
                    <span className="sector-card__label">{sectors[currentIndex].label}</span>
                  </div>
                </motion.div>
              </Link>
            </AnimatePresence>
          </div>

          <button
            className="sector-bridge__nav sector-bridge__nav--next"
            onClick={() => { handleInteraction(); nextSlide(); }}
            aria-label="Next slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        </div>

        {/* DESKTOP GRID (Hidden on mobile via CSS) */}
        <div className="sector-bridge__grid">
          {sectors.map((sector, i) => (
            <Link to="/rubros" key={i} style={{ textDecoration: 'none' }}>
              <motion.div
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
                  <div className="sector-card__icon">
                    <img src={sector.icon} alt={sector.label} className="sector-card__icon-img" />
                  </div>
                </div>
                <div className="sector-card__overlay">
                  <span className="sector-card__label">{sector.label}</span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        <motion.div
          className="sector-bridge__cta"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link to="/rubros" className="sector-bridge__link">
            Ver todos los rubros
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default SectorBridge;

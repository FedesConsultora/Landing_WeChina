import React, { useState, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

// Import images
import img1 from '../assets/img/rubros/rubros (1).webp';
import img2 from '../assets/img/rubros/rubros (2).webp';
import img3 from '../assets/img/rubros/rubros (3).webp';
import img4 from '../assets/img/rubros/rubros (4).webp';
import img5 from '../assets/img/rubros/rubros (5).webp';
import img9 from '../assets/img/rubros/rubros (9).webp';
import img10 from '../assets/img/rubros/rubros (10).webp';
import img11 from '../assets/img/rubros/rubros (11).webp';
import img12 from '../assets/img/rubros/rubros (12).webp';
import img13 from '../assets/img/rubros/rubros (13).webp';
import img14 from '../assets/img/rubros/rubros (14).webp';
import img15 from '../assets/img/rubros/rubros (15).webp';
import img16 from '../assets/img/rubros/rubros (16).webp';
import img17 from '../assets/img/rubros/rubros (17).webp';
import img18 from '../assets/img/rubros/rubros (18).webp';

const sectors = [
  { id: 1, label: 'Calzados', img: img1 },
  { id: 2, label: 'Moda', img: img2 },
  { id: 3, label: 'Seguridad', img: img3 },
  { id: 4, label: 'Maquinaria', img: img4 },
  { id: 5, label: 'Repuestos de auto', img: img5 },
  { id: 6, label: 'Equipos y productos para supermercado', img: img9 },
  { id: 7, label: 'Materiales de construcción', img: img10 },
  { id: 8, label: 'Ferretería', img: img11 },
  { id: 9, label: 'Iluminación', img: img9 },
  { id: 10, label: 'Repuestos y accesorios para motos', img: img10 },
  { id: 11, label: 'Metalúrgica', img: img11 },
  { id: 12, label: 'Joyería', img: img12 },
  { id: 13, label: 'Marroquinería', img: img13 },
  { id: 14, label: 'Cotillón', img: img14 },
  { id: 15, label: 'Peluquería', img: img15 },
  { id: 16, label: 'Textil', img: img16 },
  { id: 17, label: 'Farmacias', img: img17 },
  { id: 18, label: 'Merchandising', img: img18 },
];

// Triplicate the list for seamless looping
const loopSectors = [...sectors, ...sectors, ...sectors];

const Rubros: React.FC = () => {
  const [activeId, setActiveId] = useState(sectors[0].id);
  const activeSector = sectors.find(s => s.id === activeId) || sectors[0];
  
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Calculate total height of ONE set of items
    const totalHeight = (track.scrollHeight / 3);

    animationRef.current = gsap.timeline({
      repeat: -1,
      defaults: { ease: 'none' }
    }).to(track, {
      y: -totalHeight,
      duration: 30, // Adjust speed as needed
    });

    return () => {
      animationRef.current?.kill();
    };
  }, []);

  const handleMouseEnter = () => animationRef.current?.pause();
  const handleMouseLeave = () => animationRef.current?.play();

  // Auto-cycle the preview image
  React.useEffect(() => {
    const interval = setInterval(() => {
      // Only cycle if NOT hovering (using a simple check or just always cycle)
      // To keep it simple and respect the GSAP pause, we can check if animation is playing
      if (animationRef.current && !animationRef.current.paused()) {
        setActiveId((prevId) => {
          const currentIndex = sectors.findIndex(s => s.id === prevId);
          const nextIndex = (currentIndex + 1) % sectors.length;
          return sectors[nextIndex].id;
        });
      }
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rubros-page">
      <section className="rubros-hero">
        <div className="container">
          <div className="rubros-layout">

            <div className="rubros-text">
              <motion.h1
                className="rubros-title"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <br />
                <span className="text-red">Conocemos la matriz</span> técnica <br />
                de tu negocio.
              </motion.h1>
              <motion.p
                className="rubros-desc"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                No somos operadores generalistas. Dominamos la cadena de suministros de industrias específicas, garantizando que el producto que llega a tu depósito sea exactamente el que tu mercado exige.
              </motion.p>
            </div>

            <div className="rubros-carousel">
              <div 
                ref={trackRef}
                className="rubros-carousel__track"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {loopSectors.map((sector, index) => (
                  <div
                    key={`${sector.id}-${index}`}
                    className={`rubro-card ${activeId === sector.id ? 'is-active' : ''}`}
                    onClick={() => setActiveId(sector.id)}
                  >
                    <div className="rubro-card__img">
                      <img src={sector.img} alt={sector.label} draggable="false" />
                    </div>
                    <span className="rubro-card__label">{sector.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rubros-preview">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeId}
                  className="preview-frame"
                  initial={{ opacity: 0, scale: 0.98, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 1.02, x: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <img src={activeSector.img} alt={activeSector.label} />
                  <div className="preview-label">
                    <h3>{activeSector.label}</h3>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Rubros;

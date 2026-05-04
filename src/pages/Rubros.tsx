import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

// Import images
import img1 from '../assets/img/rubros/rubros (1).webp';
import img2 from '../assets/img/rubros/rubros (2).webp';
import img3 from '../assets/img/rubros/rubros (3).webp';
import img4 from '../assets/img/rubros/rubros (4).webp';
import img5 from '../assets/img/rubros/rubros (5).webp';
import img6 from '../assets/img/rubros/rubros (6).webp';
import img7 from '../assets/img/rubros/rubros (7).webp';
import img8 from '../assets/img/rubros/rubros (8).webp';
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
  { id: 1, label: 'Calzados', img: img7 },
  { id: 2, label: 'Moda', img: img18 },
  { id: 3, label: 'Seguridad', img: img17 },
  { id: 4, label: 'Maquinaria', img: img1 },
  { id: 5, label: 'Repuestos de auto', img: img2 },
  { id: 6, label: 'Equipos y productos para supermercado', img: img3 },
  { id: 7, label: 'Materiales de construcción', img: img4 },
  { id: 8, label: 'Ferretería', img: img5 },
  { id: 9, label: 'Iluminación', img: img8 },
  { id: 10, label: 'Repuestos y accesorios para motos', img: img6 },
  { id: 11, label: 'Metalúrgica', img: img9 },
  { id: 12, label: 'Joyería', img: img10 },
  { id: 13, label: 'Marroquinería', img: img11 },
  { id: 14, label: 'Cotillón', img: img12 },
  { id: 15, label: 'Peluquería', img: img13 },
  { id: 16, label: 'Textil', img: img14 },
  { id: 17, label: 'Farmacias', img: img15 },
  { id: 18, label: 'Merchandising', img: img16 },
];

// Triplicate the list for seamless looping
const loopSectors = [...sectors, ...sectors, ...sectors];

const Rubros: React.FC = () => {
  const [activeId, setActiveId] = useState(sectors[0].id);
  const activeSector = sectors.find(s => s.id === activeId) || sectors[0];

  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Timeline | null>(null);
  // Drag state
  const isDragging = useRef(false);
  const dragStart = useRef(0);
  const dragAxis = useRef<'x' | 'y'>('x');
  const currentOffset = useRef(0);
  const isDesktop = () => window.innerWidth >= 1024;

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const buildAnimation = () => {
      animationRef.current?.kill();
      currentOffset.current = 0;

      if (isDesktop()) {
        dragAxis.current = 'y';
        const totalHeight = track.scrollHeight / 3;
        gsap.set(track, { y: 0 });
        animationRef.current = gsap.timeline({ repeat: -1, defaults: { ease: 'none' } })
          .to(track, { y: -totalHeight, duration: 45 }); // slower
      } else {
        dragAxis.current = 'x';
        const totalWidth = track.scrollWidth / 3;
        gsap.set(track, { x: 0 });
        animationRef.current = gsap.timeline({ repeat: -1, defaults: { ease: 'none' } })
          .to(track, { x: -totalWidth, duration: 40 }); // slower
      }
    };

    buildAnimation();

    const handleResize = () => buildAnimation();
    window.addEventListener('resize', handleResize);

    return () => {
      animationRef.current?.kill();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const resumeTimeoutRef = useRef<number | null>(null);

  const handlePointerEnter = () => {
    if (resumeTimeoutRef.current) window.clearTimeout(resumeTimeoutRef.current);
    animationRef.current?.pause();
  };

  const handlePointerLeave = () => {
    if (!isDragging.current) {
      // Wait a bit before resuming on leave too, or resume immediately? 
      // User said "que espere un poco para volver a moverse"
      if (resumeTimeoutRef.current) window.clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = window.setTimeout(() => {
        animationRef.current?.play();
      }, 2000);
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (resumeTimeoutRef.current) window.clearTimeout(resumeTimeoutRef.current);
    isDragging.current = true;
    dragStart.current = dragAxis.current === 'x' ? e.clientX : e.clientY;
    
    animationRef.current?.pause();
    
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const track = trackRef.current;
    if (!track) return;

    const delta = dragAxis.current === 'x'
      ? e.clientX - dragStart.current
      : e.clientY - dragStart.current;

    const newOffset = currentOffset.current + delta;
    gsap.set(track, dragAxis.current === 'x' ? { x: newOffset } : { y: newOffset });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    
    const track = trackRef.current;
    if (!track) return;

    const delta = dragAxis.current === 'x'
      ? e.clientX - dragStart.current
      : e.clientY - dragStart.current;

    currentOffset.current += delta;

    // Sync GSAP timeline
    const anim = animationRef.current;
    if (anim) {
      const prop = dragAxis.current;
      const currentPos = parseFloat(gsap.getProperty(track, prop) as string);
      const totalSize = prop === 'x'
        ? track.scrollWidth / 3
        : track.scrollHeight / 3;

      let normalized = currentPos % -totalSize;
      if (normalized > 0) normalized -= totalSize;

      gsap.set(track, prop === 'x' ? { x: normalized } : { y: normalized });
      currentOffset.current = normalized;

      const progress = Math.abs(normalized / totalSize);
      anim.progress(progress);
      
      // WAIT before playing
      if (resumeTimeoutRef.current) window.clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = window.setTimeout(() => {
        anim.play();
      }, 2000);
    }
  };

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Auto-cycle the preview image
  useEffect(() => {
    const interval = setInterval(() => {
      if (animationRef.current && !animationRef.current.paused() && !isLightboxOpen) {
        setActiveId((prevId) => {
          const currentIndex = sectors.findIndex(s => s.id === prevId);
          const nextIndex = (currentIndex + 1) % sectors.length;
          return sectors[nextIndex].id;
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isLightboxOpen]);

  return (
    <div className="rubros-page">
      <section className="rubros-hero">
        <div className="container">
          <div className="rubros-layout">
            {/* Text – always first */}
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

            {/* Carousel */}
            <div className="rubros-carousel">
              <div
                ref={trackRef}
                className="rubros-carousel__track"
                onMouseEnter={handlePointerEnter}
                onMouseLeave={handlePointerLeave}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
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

            {/* Preview */}
            <div className="rubros-preview" onClick={() => setIsLightboxOpen(true)}>
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
                    <span className="expand-hint">Click para ampliar</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div 
            className="rubros-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLightboxOpen(false)}
          >
            <motion.div 
              className="lightbox-content"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-lightbox" onClick={() => setIsLightboxOpen(false)} aria-label="Cerrar">×</button>
              <img src={activeSector.img} alt={activeSector.label} />
              <div className="lightbox-caption">
                <h2>{activeSector.label}</h2>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Rubros;

import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { useLanguage } from '../context/LanguageContext';

// Import images
import img1 from '../assets/img/rubros/rubros (1).webp';
import img3 from '../assets/img/rubros/rubros (3).webp';
import img4 from '../assets/img/rubros/rubros (4).webp';
import img14 from '../assets/img/rubros/rubros (14).webp';
import img17 from '../assets/img/rubros/rubros (17).webp';
import imgCalzado from '../assets/img/rubros/rubros -calzado.png';
import imgCarton from '../assets/img/rubros/rubros -carton (1).png';
import imgPapel from '../assets/img/rubros/rubros -papel.png';

const sectorImages = [imgCalzado, img14, imgPapel, imgCarton, img4, img17, img3, img1];

const Rubros: React.FC = () => {
  const { t } = useLanguage();

  const sectors = t.rubrosPage.sectors.map((label, i) => ({
    id: i + 1,
    label,
    img: sectorImages[i],
  }));

  // Triplicate the list for seamless looping
  const loopSectors = [...sectors, ...sectors, ...sectors];

  const [activeId, setActiveId] = useState(sectors[0].id);
  const activeSector = sectors.find(s => s.id === activeId) || sectors[0];

  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Timeline | null>(null);
  // Drag state
  const isDragging = useRef(false);
  const dragStart = useRef(0);
  const dragAxis = useRef<'x' | 'y'>('x');
  const currentOffset = useRef(0);
  const dragDistance = useRef(0);
  const dragTarget = useRef<HTMLElement | null>(null);
  const isHovering = useRef(false);
  const isDesktop = () => window.innerWidth >= 1024;

  useLayoutEffect(() => {
    document.title = t.pageTitles.sectors;
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
          .to(track, { y: -totalHeight, duration: 22 });
      } else {
        dragAxis.current = 'x';
        const totalWidth = track.scrollWidth / 3;
        gsap.set(track, { x: 0 });
        animationRef.current = gsap.timeline({ repeat: -1, defaults: { ease: 'none' } })
          .to(track, { x: -totalWidth, duration: 18 });
      }
    };

    buildAnimation();

    const handleResize = () => buildAnimation();
    window.addEventListener('resize', handleResize);

    return () => {
      animationRef.current?.kill();
      window.removeEventListener('resize', handleResize);
    };
  }, [t]);

  const resumeTimeoutRef = useRef<number | null>(null);

  const handlePointerEnter = () => {
    isHovering.current = true;
    if (resumeTimeoutRef.current) window.clearTimeout(resumeTimeoutRef.current);
    animationRef.current?.pause();
  };

  const handlePointerLeave = () => {
    isHovering.current = false;
    if (!isDragging.current) {
      if (resumeTimeoutRef.current) window.clearTimeout(resumeTimeoutRef.current);
      animationRef.current?.play();
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (resumeTimeoutRef.current) window.clearTimeout(resumeTimeoutRef.current);
    isDragging.current = true;
    dragStart.current = dragAxis.current === 'x' ? e.clientX : e.clientY;
    dragDistance.current = 0;
    dragTarget.current = e.target as HTMLElement;

    if (animationRef.current) {
      gsap.set(animationRef.current, { timeScale: 0 });
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const track = trackRef.current;
    if (!track) return;

    const delta = dragAxis.current === 'x'
      ? e.clientX - dragStart.current
      : e.clientY - dragStart.current;

    dragDistance.current = Math.abs(delta);
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

    if (dragDistance.current < 10) {
      const element = document.elementFromPoint(e.clientX, e.clientY);
      const card = element?.closest('.rubro-card');
      const sectorId = card?.getAttribute('data-sector-id');
      if (sectorId) {
        setActiveId(Number(sectorId));
      }
    }

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

      if (resumeTimeoutRef.current) window.clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = window.setTimeout(() => {
        if (!isHovering.current) {
          anim.play();
        }
      }, 2000);
    }
  };

  // Auto-cycle the preview image
  useEffect(() => {
    const interval = setInterval(() => {
      const anim = animationRef.current;
      const isActuallyMoving = anim && anim.timeScale() > 0 && !anim.paused();

      if (isActuallyMoving) {
        setActiveId((prevId) => {
          const currentIndex = sectors.findIndex(s => s.id === prevId);
          const nextIndex = (currentIndex + 1) % sectors.length;
          return sectors[nextIndex].id;
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [sectors]);

  return (
    <div className="rubros-page">
      <section className="rubros-hero">
        <div className="container">
          <div className="rubros-layout">
            {/* Text */}
            <div className="rubros-text">
              <motion.h1
                className="rubros-title"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <br />
                <span className="text-red">{t.rubrosPage.titleRed}</span> {t.rubrosPage.titleRest}
              </motion.h1>
              <motion.p
                className="rubros-desc"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {t.rubrosPage.desc}
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
                  <motion.div
                    key={`${sector.id}-${index}`}
                    data-sector-id={sector.id}
                    className={`rubro-card ${activeId === sector.id ? 'is-active' : ''}`}
                    whileTap={{ scale: 0.95 }}
                    onTap={() => setActiveId(sector.id)}
                  >
                    <div className="rubro-card__img">
                      <img src={sector.img} alt={sector.label} draggable="false" />
                    </div>
                    <span className="rubro-card__label">{sector.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Preview */}
            <div className="rubros-preview">
              <AnimatePresence>
                <motion.div
                  key={activeId}
                  className="preview-frame"
                  initial={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                  transition={{
                    duration: 0.4,
                    ease: "easeOut"
                  }}
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

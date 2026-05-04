import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Placeholder images from existing assets (to be replaced later)
import img1 from '../assets/img/servicios/service-1.webp';
import img2 from '../assets/img/servicios/service-2.webp';
import img3 from '../assets/img/servicios/service-3.webp';
import img4 from '../assets/img/servicios/service-4.webp';

gsap.registerPlugin(ScrollTrigger);

// 12 cards across 3 rows of 4 — each row moves in opposite direction
const cards = [
  { id: 1, img: img1, label: 'Inspección en Fábrica' },
  { id: 2, img: img2, label: 'Control de Calidad' },
  { id: 3, img: img3, label: 'Agentes de Compras' },
  { id: 4, img: img4, label: 'Logística Marítima' },
  { id: 5, img: img1, label: 'Gestión de Proveedores' },
  { id: 6, img: img2, label: 'Auditoría ISO' },
  { id: 7, img: img3, label: 'Consolidación de Cargas' },
  { id: 8, img: img4, label: 'Comercio Exterior' },
  { id: 9, img: img1, label: 'Marcas Propias' },
  { id: 10, img: img2, label: 'Feria de Cantón' },
  { id: 11, img: img3, label: 'Inspección Pre-Embarque' },
  { id: 12, img: img4, label: 'Contratos de Compra' },
];

const row1 = cards.slice(0, 4);
const row2 = cards.slice(4, 8);
const row3 = cards.slice(8, 12);

const Clients: React.FC = () => {
  const [imagesLoaded, setImagesLoaded] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const totalImages = cards.length;

  const sectionRef = useRef<HTMLElement>(null);
  const rowRef1 = useRef<HTMLDivElement>(null);
  const rowRef2 = useRef<HTMLDivElement>(null);
  const rowRef3 = useRef<HTMLDivElement>(null);

  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  useEffect(() => {
    if (imagesLoaded === totalImages) {
      setIsLoading(false);
    }
  }, [imagesLoaded, totalImages]);

  useEffect(() => {
    if (isLoading) return;

    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      const tl1 = gsap.fromTo(rowRef1.current, { x: 60 }, {
        x: -60, ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.2 },
      });
      const tl2 = gsap.fromTo(rowRef2.current, { x: -60 }, {
        x: 60, ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.2 },
      });
      const tl3 = gsap.fromTo(rowRef3.current, { x: 60 }, {
        x: -60, ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.2 },
      });

      return () => {
        tl1.scrollTrigger?.kill();
        tl2.scrollTrigger?.kill();
        tl3.scrollTrigger?.kill();
      };
    });

    return () => mm.revert();
  }, [isLoading]);

  const renderRow = (
    rowCards: typeof row1,
    ref: React.RefObject<HTMLDivElement | null>,
    extraClass = ''
  ) => (
    <div className={`clients-cards__row ${extraClass}`} ref={ref}>
      {rowCards.map((card) => (
        <div className="clients-card" key={card.id}>
          <img
            src={card.img}
            alt={card.label}
            onLoad={handleImageLoad}
          />
          <span className="clients-card__label">{card.label}</span>
        </div>
      ))}
    </div>
  );

  return (
    <section className="clients-section" ref={sectionRef} id="clientes">
      <div className="clients-section__inner">
        {/* ── Left: text ── */}
        <div className="clients-section__text">
          <h1 className="clients-section__heading">
            <span className="text-red">Respaldo real</span>{' '}
            para proyectos de largo plazo.
          </h1>
          <p className="clients-section__body">
            No solo gestionamos contenedores; diseñamos sistemas de comercio
            exterior para empresas que buscan escalabilidad y previsibilidad.
            La confianza de nuestros clientes se basa en nuestra capacidad de
            ser su oficina técnica en origen.
          </p>
          <a href="https://wa.me/541130897009" target="_blank" rel="noopener noreferrer" className="btn btn-primary clients-section__cta">
            Hablá con un experto
          </a>
        </div>

        {/* ── Right: animated cards (or loader) ── */}
        <div className={`clients-cards ${isLoading ? 'is-loading' : ''}`}>
          {isLoading && (
            <div className="clients-loader">
              <div className="spinner"></div>

            </div>
          )}

          {/* We render cards anyway but hide them with CSS until loaded, so images can trigger onLoad */}
          <div className="clients-cards__container" style={{ visibility: isLoading ? 'hidden' : 'visible', opacity: isLoading ? 0 : 1, transition: 'opacity 0.5s ease' }}>
            {renderRow(row1, rowRef1)}
            {renderRow(row2, rowRef2, 'clients-cards__row--offset')}
            {renderRow(row3, rowRef3)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;

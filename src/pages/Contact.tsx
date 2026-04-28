import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Placeholder images from existing assets (to be replaced later)
import img1 from '../assets/img/servicios/service-1.webp';
import img2 from '../assets/img/servicios/service-2.webp';
import img3 from '../assets/img/servicios/service-3.webp';
import img4 from '../assets/img/servicios/service-4.webp';

gsap.registerPlugin(ScrollTrigger);

// 9 cards across 3 rows — each row moves in opposite direction
const cards = [
  { id: 1,  img: img1, label: 'Inspección en Fábrica' },
  { id: 2,  img: img2, label: 'Control de Calidad' },
  { id: 3,  img: img3, label: 'Agentes de Compras' },
  { id: 4,  img: img4, label: 'Logística Marítima' },
  { id: 5,  img: img1, label: 'Gestión de Proveedores' },
  { id: 6,  img: img2, label: 'Auditoría ISO' },
  { id: 7,  img: img3, label: 'Consolidación de Cargas' },
  { id: 8,  img: img4, label: 'Comercio Exterior' },
  { id: 9,  img: img1, label: 'Marcas Propias' },
];

const row1 = cards.slice(0, 3);
const row2 = cards.slice(3, 6);
const row3 = cards.slice(6, 9);

const Contact: React.FC = () => {
  const sectionRef   = useRef<HTMLElement>(null);
  const rowRef1      = useRef<HTMLDivElement>(null);
  const rowRef2      = useRef<HTMLDivElement>(null);
  const rowRef3      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      // Row 1 & 3: scroll down → move left  |  scroll up → move right
      // Row 2:     opposite direction
      const tl1 = gsap.fromTo(
        rowRef1.current,
        { x: 60 },
        {
          x: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end:   'bottom top',
            scrub: 1.2,
          },
        }
      );

      const tl2 = gsap.fromTo(
        rowRef2.current,
        { x: -60 },
        {
          x: 60,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end:   'bottom top',
            scrub: 1.2,
          },
        }
      );

      const tl3 = gsap.fromTo(
        rowRef3.current,
        { x: 60 },
        {
          x: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end:   'bottom top',
            scrub: 1.2,
          },
        }
      );

      return () => {
        tl1.scrollTrigger?.kill();
        tl2.scrollTrigger?.kill();
        tl3.scrollTrigger?.kill();
      };
    });

    return () => mm.revert();
  }, []);

  const renderRow = (
    rowCards: typeof row1,
    ref: React.RefObject<HTMLDivElement>,
    extraClass = ''
  ) => (
    <div className={`contact-cards__row ${extraClass}`} ref={ref}>
      {rowCards.map((card) => (
        <div className="contact-card" key={card.id}>
          <img src={card.img} alt={card.label} />
          <span className="contact-card__label">{card.label}</span>
        </div>
      ))}
    </div>
  );

  return (
    <section className="contact-section" ref={sectionRef} id="contacto">
      <div className="contact-section__inner">
        {/* ── Left: text ── */}
        <div className="contact-section__text">
          <h1 className="contact-section__heading">
            <span className="text-red">Respaldo real</span>{' '}
            para proyectos de largo plazo.
          </h1>
          <p className="contact-section__body">
            No solo gestionamos contenedores; diseñamos sistemas de comercio
            exterior para empresas que buscan escalabilidad y previsibilidad.
            La confianza de nuestros clientes se basa en nuestra capacidad de
            ser su oficina técnica en origen.
          </p>

          <a href="mailto:oficina@wechina.com.ar" className="btn btn-primary contact-section__cta">
            Hablá con un experto
          </a>
        </div>

        {/* ── Right: animated cards ── */}
        <div className="contact-cards">
          {renderRow(row1, rowRef1)}
          {renderRow(row2, rowRef2, 'contact-cards__row--offset')}
          {renderRow(row3, rowRef3)}
        </div>
      </div>
    </section>
  );
};

export default Contact;

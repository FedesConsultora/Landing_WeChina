import React, { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

// Real client images (to be placed in src/assets/img/clientes/ by the user)
import client1 from '../assets/img/clientes/client-1.webp';
import client2 from '../assets/img/clientes/client-2.webp';
import client3 from '../assets/img/clientes/client-3.webp';
import client4 from '../assets/img/clientes/client-4.webp';
import client5 from '../assets/img/clientes/client-5.webp';
import client6 from '../assets/img/clientes/client-6.webp';
import client7 from '../assets/img/clientes/client-7.webp';
import client8 from '../assets/img/clientes/client-8.webp';
import client9 from '../assets/img/clientes/client-9.webp';
import client10 from '../assets/img/clientes/client-10.webp';
import client11 from '../assets/img/clientes/client-11.webp';
import client12 from '../assets/img/clientes/client-12.webp';
import client13 from '../assets/img/clientes/client-13.webp';
import client14 from '../assets/img/clientes/client-14.webp';
import client15 from '../assets/img/clientes/client-15.webp';
import client16 from '../assets/img/clientes/client-16.webp';
import client17 from '../assets/img/clientes/client-17.webp';
import client18 from '../assets/img/clientes/client-18.webp';
import client19 from '../assets/img/clientes/client-19.webp';
import client20 from '../assets/img/clientes/client-20.webp';
import client21 from '../assets/img/clientes/client-21.webp';
import client22 from '../assets/img/clientes/client-22.webp';
import client23 from '../assets/img/clientes/client-23.webp';
import client24 from '../assets/img/clientes/client-24.webp';
import client25 from '../assets/img/clientes/client-25.webp';
import client26 from '../assets/img/clientes/client-26.webp';
import client27 from '../assets/img/clientes/client-27.webp';
import client28 from '../assets/img/clientes/client-28.webp';
import client29 from '../assets/img/clientes/client-29.webp';
import client30 from '../assets/img/clientes/client-30.webp';
import client31 from '../assets/img/clientes/client-31.webp';
import client32 from '../assets/img/clientes/client-32.webp';

gsap.registerPlugin(ScrollTrigger);

const cards = [
  // Row 1 (11)
  { id: 1, img: client1, label: 'Peter Fox' },
  { id: 2, img: client2, label: 'Tracy' },
  { id: 3, img: client3, label: 'Mas-Kotas' },
  { id: 4, img: client4, label: 'Mimo & Co' },
  { id: 5, img: client5, label: 'Xerox' },
  { id: 6, img: client6, label: 'Disney' },
  { id: 7, img: client7, label: 'Goosy Kids' },
  { id: 8, img: client8, label: 'Viamo' },
  { id: 9, img: client9, label: 'Suelas Leal' },
  { id: 10, img: client10, label: 'Sucre' },
  { id: 11, img: client11, label: 'Sky Blue' },
  
  // Row 2 (11)
  { id: 12, img: client12, label: 'Kailer' },
  { id: 13, img: client13, label: 'Maykel Footwear' },
  { id: 14, img: client14, label: 'Tapper Adhesivos' },
  { id: 15, img: client15, label: 'Evaplas' },
  { id: 16, img: client16, label: 'Couce' },
  { id: 17, img: client17, label: 'BlueKids' },
  { id: 18, img: client18, label: 'SeaWalk' },
  { id: 19, img: client19, label: 'Rimland' },
  { id: 20, img: client20, label: 'Pony' },
  { id: 21, img: client21, label: 'La Martina' },
  { id: 22, img: client22, label: 'Jaguar' },
  
  // Row 3 (10)
  { id: 23, img: client23, label: 'Siempre Farmacias' },
  { id: 24, img: client24, label: 'Brenda' },
  { id: 25, img: client25, label: 'Bonzini Shoes' },
  { id: 26, img: client26, label: "Lady Paul's" },
  { id: 27, img: client27, label: "Plumita's" },
  { id: 28, img: client28, label: 'Pira' },
  { id: 29, img: client29, label: 'Yebra' },
  { id: 30, img: client30, label: 'Heyday' },
  { id: 31, img: client31, label: 'Envap' },
  { id: 32, img: client32, label: 'Briganti' },
];

const row1 = cards.slice(0, 11);
const row2 = cards.slice(11, 22);
const row3 = cards.slice(22, 32);

const Clients: React.FC = () => {
  const { t } = useLanguage();
  const [imagesLoaded, setImagesLoaded] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const totalImages = cards.length;

  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const rowRef1 = useRef<HTMLDivElement>(null);
  const rowRef2 = useRef<HTMLDivElement>(null);
  const rowRef3 = useRef<HTMLDivElement>(null);

  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  useEffect(() => {
    document.title = t.pageTitles.clients;
    if (imagesLoaded === totalImages) {
      setIsLoading(false);
    }
  }, [imagesLoaded, totalImages, t]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const pinWrap = pinWrapRef.current;
    if (!section || !pinWrap) return;

    const ctx = gsap.context(() => {
      // Entrance animation - matching Figma feel
      gsap.fromTo('.clients-card', 
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.03,
          ease: 'power2.out',
          delay: 0.2
        }
      );

      if (!isLoading) {
        ScrollTrigger.refresh();

        const mm = gsap.matchMedia();
        mm.add('(min-width: 1024px)', () => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: '+=100%',
              scrub: 1,
              pin: pinWrap,
              pinSpacing: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            }
          });

          tl.fromTo(rowRef1.current, { x: 0 }, { x: -1200, ease: 'none' }, 0)
            .fromTo(rowRef2.current, { x: -1200 }, { x: 0, ease: 'none' }, 0)
            .fromTo(rowRef3.current, { x: 0 }, { x: -1200, ease: 'none' }, 0);
        });
      }
    }, section);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === section) t.kill();
      });
    };
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
            onError={handleImageLoad}
          />
          <span className="clients-card__label">{card.label}</span>
        </div>
      ))}
    </div>
  );

  return (
    <section className="clients-section" ref={sectionRef} id="clientes">
      <div className="clients-pin-wrap" ref={pinWrapRef} style={{ width: '100%' }}>
        <div className="clients-section__inner">
        {/* ── Left: text ── */}
        <div className="clients-section__text">
          <h1 className="clients-section__heading">
            <span className="text-red">{t.clientsPage.headingRed}</span>{' '}
            {t.clientsPage.headingRest}
          </h1>
          <p className="clients-section__body">
            {t.clientsPage.body}
          </p>
          <a href="https://wa.me/541130897009?text=%C2%A1Hola!%20Quisiera%20m%C3%A1s%20informaci%C3%B3n" target="_blank" rel="noopener noreferrer" className="btn btn-primary clients-section__cta">
            {t.clientsPage.cta}
          </a>
        </div>

        {/* ── Right: animated cards (or loader) ── */}
        <div className={`clients-cards ${isLoading ? 'is-loading' : ''}`}>
          {isLoading && (
            <div className="clients-loader">
              <div className="spinner"></div>
            </div>
          )}

          <div className="clients-cards__container">
            {renderRow(row1, rowRef1)}
            {renderRow(row2, rowRef2, 'clients-cards__row--offset')}
            {renderRow(row3, rowRef3)}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;

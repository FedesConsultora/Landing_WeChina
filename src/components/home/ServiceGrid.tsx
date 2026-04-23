import React from 'react';
import { motion } from 'framer-motion';

import service1 from '../../assets/img/servicios/service-1.webp';
import service2 from '../../assets/img/servicios/service-2.webp';
import service3 from '../../assets/img/servicios/service-3.webp';
import service4 from '../../assets/img/servicios/service-4.webp';
import conoceMas from '../../assets/img/hero/conoce-mas.webp';

const services = [
  {
    img: service1,
    title: 'Agentes de compras',
    desc: 'Ubicamos los mejores precios y fábricas de China, validamos sus licencias de negocios y certificados.',
  },
  {
    img: service2,
    title: 'Búsqueda de proveedores',
    desc: 'Encontrar proveedores calificados requiere una eficaz y bien estructurada estrategia.',
  },
  {
    img: service3,
    title: 'Validación de fabricantes online',
    desc: 'Evite estafas y revendedores validando la legitimidad de las fábricas antes de comprometerse.',
  },
  {
    img: service4,
    title: 'Control de calidad',
    desc: 'Inspecciones profesionales titulados en normas ISO y CE para garantizar lo deseado.',
  },
];

const ServiceGrid: React.FC = () => {
  return (
    <section className="service-grid">
      <div className="container">
        <motion.div
          className="service-grid__header"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="service-grid__eyebrow">Protegemos tu inversión</p>
          <h2 className="service-grid__title">EN CHINA</h2>
        </motion.div>

        <div className="service-grid__grid">
          {services.map((service, i) => (
            <motion.div
              key={i}
              className="scard"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="scard__img" style={{ backgroundImage: `url(${service.img})` }} />
              <div className="scard__body">
                <h3 className="scard__title">{service.title}</h3>
                <p className="scard__desc">{service.desc}</p>
              </div>
            </motion.div>
          ))}

          {/* "Conoce más" card — special red card */}
          <motion.div
            className="scard scard--conoce"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="scard__img" style={{ backgroundImage: `url(${conoceMas})` }} />
            <div className="scard__body">
              <h3 className="scard__title">Conoce más</h3>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServiceGrid;

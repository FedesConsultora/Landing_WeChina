import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SectionWrapper from "../components/SectionWrapper";
import { useLanguage } from "../context/LanguageContext";

import serviceAgentes from "../assets/img/servicios/service-3.webp";
import serviceBusqueda from "../assets/img/servicios/busq-proveedores.webp";
import serviceCalidad from "../assets/img/servicios/control-calidad.webp";
import serviceFletes from "../assets/img/servicios/fletes-mar.webp";
import serviceValFabricantes from "../assets/img/servicios/val-fabricantes.webp";
import serviceMuestras from "../assets/img/servicios/manejo-muestras.webp";
import serviceAlmacenaje from "../assets/img/servicios/almacenaje.webp";
import serviceViajes from "../assets/img/servicios/china.webp";
import serviceMarcas from "../assets/img/servicios/creacion-marcas.webp";

const serviceImageMap: Record<string, string> = {
  'agentes-de-compras': serviceAgentes,
  'busqueda-de-proveedores': serviceBusqueda,
  'control-de-calidad': serviceCalidad,
  'fletes-maritimos-y-aereos': serviceFletes,
  'validacion-de-fabricantes-online': serviceValFabricantes,
  'manejo-de-muestras': serviceMuestras,
  'almacenaje-y-consolidacion-de-cargas': serviceAlmacenaje,
  'viajes-de-negocios-a-china': serviceViajes,
  'creacion-de-marcas-propias': serviceMarcas,
};

const Services: React.FC = () => {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const serviceQuery = searchParams.get("service");

  const servicesData = t.servicesPage.items;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    document.title = t.pageTitles.services;
    if (serviceQuery) {
      const foundIdx = servicesData.findIndex((s) => s.id === serviceQuery);
      if (foundIdx !== -1) {
        setActiveIndex(foundIdx);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }, [serviceQuery, t]);

  const activeService = servicesData[activeIndex];

  const handleServiceClick = (index: number) => {
    setActiveIndex(index);
    setSearchParams({ service: servicesData[index].id });
  };

  return (
    <SectionWrapper id="servicios" className="services-page-section">
      <div className="container">
        <div className="services-layout">
          <div className="services-sidebar">
            <h1 className="services-main-title">
              {t.servicesPage.mainTitle}  <span className="text-highlight">{t.servicesPage.mainTitleHighlight}</span>
            </h1>
            <nav className="services-nav">
              <ul>
                {servicesData.map((service, index) => (
                  <li key={service.id}>
                    <button
                      className={`service-nav-item ${activeIndex === index ? "active" : ""}`}
                      onClick={() => handleServiceClick(index)}
                    >
                      {service.title}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="services-image-container">
            <div className="service-image-wrapper">
              <img
                src={serviceImageMap[activeService.id]}
                alt={activeService.title}
                key={activeService.id}
              />
            </div>
          </div>

          <div className="services-description">
            <div className="description-content">
              {activeService.description.map((para, index) => (
                <p key={index}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Services;
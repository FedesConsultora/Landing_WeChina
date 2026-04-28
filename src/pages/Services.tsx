import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SectionWrapper from '../components/SectionWrapper';

// Import images (assuming the naming convention or adjusting as needed)
import serviceImg1 from '../assets/img/servicios/service-1.webp';
import serviceImg2 from '../assets/img/servicios/service-2.webp';
import serviceImg3 from '../assets/img/servicios/service-3.webp';
import serviceImg4 from '../assets/img/servicios/service-4.webp';

const servicesData = [
  {
    id: 'agentes-de-compras',
    title: 'Agentes de compras',
    image: serviceImg1,
    description: [
      'Ubicamos para usted los mejores precios y fábricas de China, validamos sus licencias de negocios y certificados para la seguridad de su inversión y así poder evitar estafas y revendedores. Realizamos contratos de compra entre usted y el fabricante para asegurar que él entiende y se compromete a producir sus productos según sus requerimientos.',
      'Cuando sus compras estén listas, antes de que usted pague al proveedor, vamos a inspeccionar y verificar que todo esté realizado con la calidad y en la cantidad que se haya solicitado. Contamos con inspectores titulados en normas de calidad ISO y CE, que verificarán si hay piezas rotas, con malos acabados o faltantes. Pediremos al fabricante reponerlas o deducirlas de la factura, así usted solo pagará por la cantidad exacta de productos que recibirá en óptimo estado.',
      'También planificamos y coordinamos envíos marítimos y aéreos a cualquier parte del mundo. Todas las cargas van aseguradas por el 110% del valor de los productos.'
    ]
  },
  {
    id: 'busqueda-de-proveedores',
    title: 'Búsqueda de proveedores',
    image: serviceImg2,
    description: [
      'Identificamos proveedores confiables y auditados en todo el territorio chino para asegurar la mejor calidad de manufactura.',
      'Analizamos la capacidad de producción y certificaciones internacionales para mitigar riesgos en la cadena de suministro.',
      'Brindamos informes detallados de cada fábrica seleccionada, incluyendo historial de exportaciones y reputación en el mercado.'
    ]
  },
  {
    id: 'control-de-calidad',
    title: 'Control de calidad',
    image: serviceImg3,
    description: [
      'Realizamos inspecciones pre-embarque exhaustivas para garantizar que los productos cumplan con sus especificaciones técnicas.',
      'Nuestros auditores verifican el empaque, etiquetado y funcionalidad de cada unidad antes del sellado del contenedor.',
      'Emitimos reportes fotográficos y de video en tiempo real durante la inspección en fábrica.'
    ]
  },
  {
    id: 'fletes-maritimos-y-aereos',
    title: 'Fletes marítimos y aéreos',
    image: serviceImg4,
    description: [
      'Gestionamos logística integral puerto a puerto o puerta a puerta, optimizando costos y tiempos de tránsito.',
      'Contamos con acuerdos estratégicos con las principales navieras y aerolíneas para asegurar espacio en temporadas altas.',
      'Realizamos el seguimiento continuo de su carga desde el origen hasta su destino final.'
    ]
  },
  {
    id: 'validacion-de-fabricantes-online',
    title: 'Validación de fabricantes online',
    image: serviceImg1, // Placeholder
    description: [
      'Verificamos la legalidad de proveedores en plataformas como Alibaba, Global Sources y Made-in-China.',
      'Evitamos fraudes mediante la validación de cuentas bancarias corporativas y licencias de exportación.',
      'Confirmamos que el proveedor online sea realmente un fabricante y no un intermediario sin respaldo.'
    ]
  },
  {
    id: 'manejo-de-muestras',
    title: 'Manejo de muestras',
    image: serviceImg2, // Placeholder
    description: [
      'Consolidamos muestras de diferentes proveedores en una sola oficina para reducir costos de envío internacional.',
      'Evaluamos las muestras físicamente antes de enviarlas a su país, ahorrando tiempo en el proceso de selección.',
      'Gestionamos el pago de muestras a proveedores locales de forma rápida y segura.'
    ]
  },
  {
    id: 'almacenaje-y-consolidacion-de-cargas',
    title: 'Almacenaje y consolidación de cargas',
    image: serviceImg3, // Placeholder
    description: [
      'Ofrecemos depósitos estratégicos en China para consolidar compras de múltiples proveedores en un solo contenedor.',
      'Controlamos el inventario y re-empacamos mercadería si es necesario para optimizar el espacio cúbico.',
      'Seguridad las 24 horas y gestión logística de entrada y salida de mercaderías.'
    ]
  },
  {
    id: 'viajes-de-negocios-a-china',
    title: 'Viajes de negocios a china',
    image: serviceImg4, // Placeholder
    description: [
      'Organizamos su agenda comercial en China, incluyendo visitas a fábricas y ferias internacionales como la Feria de Cantón.',
      'Proveemos traductores especializados en comercio exterior y logística local.',
      'Asesoramos en la obtención de visas y traslados internos entre centros industriales.'
    ]
  },
  {
    id: 'creacion-de-marcas-propias',
    title: 'Creación de marcas propias',
    image: serviceImg1, // Placeholder
    description: [
      'Desarrollamos su producto bajo concepto OEM/ODM, gestionando el branding y diseño de empaque con el fabricante.',
      'Protegemos su propiedad intelectual y negociamos exclusividades con los proveedores chinos.',
      'Aseguramos que el producto final refleje la identidad y estándares de calidad de su marca.'
    ]
  }
];

const Services: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const serviceQuery = searchParams.get('service');
  
  const [activeService, setActiveService] = useState(servicesData[0]);

  useEffect(() => {
    if (serviceQuery) {
      const found = servicesData.find(s => s.id === serviceQuery);
      if (found) {
        setActiveService(found);
        // Scroll to top or specific section if needed
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [serviceQuery]);

  const handleServiceClick = (service: typeof servicesData[0]) => {
    setActiveService(service);
    setSearchParams({ service: service.id });
  };

  return (
    <SectionWrapper id="servicios" className="services-page-section">
      <div className="container">
        <div className="services-layout">
          {/* Column 1: Sidebar List */}
          <div className="services-sidebar">
            <h1 className="services-main-title">
              Tu estructura de comercio exterior <span className="text-highlight">en Asia.</span>
            </h1>
            <nav className="services-nav">
              <ul>
                {servicesData.map((service) => (
                  <li key={service.id}>
                    <button
                      className={`service-nav-item ${activeService.id === service.id ? 'active' : ''}`}
                      onClick={() => handleServiceClick(service)}
                    >
                      {service.title}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 2: Image */}
          <div className="services-image-container">
            <div className="service-image-wrapper">
              <img 
                src={activeService.image} 
                alt={activeService.title} 
                key={activeService.id} // Force re-animation if needed
              />
            </div>
          </div>

          {/* Column 3: Description */}
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

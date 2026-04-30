import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SectionWrapper from "../components/SectionWrapper";

import serviceAgentes from "../assets/img/servicios/service-3.webp";
import serviceBusqueda from "../assets/img/servicios/busq-proveedores.webp";
import serviceCalidad from "../assets/img/servicios/control-calidad.webp";
import serviceFletes from "../assets/img/servicios/fletes-mar.webp";
import serviceValFabricantes from "../assets/img/servicios/val-fabricantes.webp";
import serviceMuestras from "../assets/img/servicios/manejo-muestras.webp";
import serviceAlmacenaje from "../assets/img/servicios/almacenaje.webp";
import serviceViajes from "../assets/img/servicios/china.webp";
import serviceMarcas from "../assets/img/servicios/creacion-marcas.webp";

interface ServiceItem {
  id: string;
  title: string;
  image: string;
  description: string[];
}

const servicesData: ServiceItem[] = [
  {
    id: "agentes-de-compras",
    title: "Agentes de compras",
    image: serviceAgentes,
    description: [
      "Ubicamos para usted los mejores precios y fábricas de China, validamos sus licencias de negocios y certificados para la seguridad de su inversión y así poder evitar estafas y revendedores. Realizamos contratos de compra entre usted y el fabricante para asegurar que él entiende y se compromete a producir sus productos según sus requerimientos.",
      "Cuando sus compras estén listas, antes de que usted pague al proveedor, vamos a inspeccionar y verificar que todo esté realizado con la calidad y en la cantidad que se haya solicitado. Contamos con inspectores titulados en normas de calidad ISO y CE, que verificarán si hay piezas rotas, con malos acabados o faltantes. Pediremos al fabricante reponerlas o deducirlas de la factura, así usted solo pagará por la cantidad exacta de productos que recibirá en óptimo estado.",
      "También planificamos y coordinamos envíos marítimos y aéreos a cualquier parte del mundo. Todas las cargas van aseguradas por el 110% del valor de los productos."
    ]
  },
  {
    id: "busqueda-de-proveedores",
    title: "Búsqueda de proveedores",
    image: serviceBusqueda,
    description: [
      "Encontrar un proveedor en Asia hoy es simple, pero detectar una fábrica directa, calificada y con capacidad técnica real exige una estructura de control que internet no puede ofrecer. En WeChina, no somos simples intermediarios; somos tu oficina operativa en origen. Nuestro enfoque técnico prioriza tus especificaciones y estándares de calidad por sobre el precio inicial, eliminando la incertidumbre de 'probar suerte' con proveedores desconocidos.",
      "Gracias a nuestra sociedad binacional y presencia física en Buenos Aires y Guangzhou, transformamos la búsqueda de proveedores en un proceso de ingeniería de confianza. Validamos la existencia legal del fabricante, auditamos sus certificaciones y gestionamos el desarrollo de tu marca propia con el respaldo de un equipo que negocia en tu idioma y bajo tus intereses, asegurando que cada dólar invertido esté protegido.",
      "Nuestro sistema de gestión integral abarca desde la selección inicial hasta la firma del contrato de compra. Nos encargamos de la logística de muestras, la negociación de cantidades mínimas (MOQ) y la formalización de acuerdos de venta sólidos. Con WeChina, tu operación no depende de la suerte, sino de un sistema operativo diseñado para que recibas exactamente lo que compraste, sin sorpresas en el puerto.",
    ]
  },
  {
    id: "control-de-calidad",
    title: "Control de calidad",
    image: serviceCalidad,
    description: [
      "No dejes la calidad de tu stock librada al azar o a la buena voluntad del fabricante. Con nuestro servicio de inspección técnica, eliminás la incertidumbre de recibir mercadería defectuosa, piezas faltantes o errores de producción antes de que la carga salga de Asia. Actuamos como tus ojos en la planta: un inspector profesional visita la fábrica para evaluar de forma independiente que cada unidad coincida estrictamente con tu factura y estándares de calidad.",
      "Nuestra intervención es inmediata y resolutiva: si detectamos productos rotos, terminaciones deficientes o faltantes, exigimos al fabricante el reemplazo instantáneo o el descuento directo en tu factura de saldo. No somos observadores, somos tus socios estratégicos encargados de garantizar que el contenedor que llega a tu depósito contenga exactamente lo que pagaste.",
      "Recibirás un Reporte de Auditoría Detallado, compuesto por evidencia técnica, registros fotográficos y videos crudos de la inspección. Personalizamos el protocolo según tus prioridades críticas, asegurando que los puntos más sensibles de tu producto sean verificados bajo lupa. El costo del servicio se cotiza a medida, basado en la ubicación de la planta y la complejidad del volumen a inspeccionar.",

    ]
  },
  {
    id: "fletes-maritimos-y-aereos",
    title: "Fletes marítimos y aéreos",
    image: serviceFletes,
    description: [
      "Optimizamos tu cadena de suministro mediante alianzas estratégicas con más de 10 líneas navieras internacionales, cubriendo las rutas más eficientes desde China e Indonesia hacia cualquier puerto de destino. No solo movemos contenedores; gestionamos tarifas corporativas competitivas en unidades de 20ft, 40ft y 40HQ, asegurando que el costo logístico no comprometa la rentabilidad de tu stock.",
      "Nuestra estructura binacional elimina la fricción burocrática al centralizar la documentación técnica en español, inglés y mandarín. Actuamos como el nexo operativo entre tu proveedor y el despacho aduanero, recolectando y validando cada documento de exportación para garantizar una identificación precisa de la carga. Con WeChina, la logística deja de ser una incertidumbre para convertirse en un proceso fluido y profesionalizado.",
      "Para recibir una cotización estratégica de flete, solo requerimos:",
      "Naturaleza de la carga: Tipo de mercadería a transportar.", "Ruta operativa: puertos de origen y destino solicitado", "Volumen técnico: Dimensiones o pies cúbicos del contenedor."


    ]
  },
  {
    id: "validacion-de-fabricantes-online",
    title: "Validación de fabricantes online",
    image: serviceValFabricantes,
    description: [
      "Este servicio es indispensable para importadores que han identificado proveedores a través de portales web y necesitan transformar la incertidumbre en certeza operativa. No se limite a confiar en un perfil digital; nuestro equipo presencial en origen realiza una auditoría legal y técnica exhaustiva, verificando registros ante entes gubernamentales en China e Indonesia para confirmar que se trata de fabricantes directos y establecidos.",
      "A través de esta validación, eliminamos el riesgo de estafas y la presencia de intermediarios que sobrecargan los costos reales de los productos. Al contratar a WeChina, usted no solo protege su inversión, sino que se asegura de negociar directamente con la fuente de fabricación, garantizando la transparencia de precios y la viabilidad legal de su proyecto.",

    ]
  },
  {
    id: "manejo-de-muestras",
    title: "Manejo de muestras",
    image: serviceMuestras,
    description: [
      "Optimice sus tiempos y reduzca costos operativos centralizando la recepción de muestras de diversos proveedores en un solo envío estratégico. En lugar de gestionar múltiples fletes individuales, nuestro equipo en las oficinas de China recibe, identifica y audita cada muestra para asegurar que coincida con su solicitud antes de ser despachada.",
      "Al utilizar nuestra estructura como hub logístico, usted accede a tarifas corporativas exclusivas con los principales operadores globales (DHL y FedEx), garantizando el tránsito más rápido y económico hacia su depósito. Transformamos la dispersión de proveedores en un proceso unificado, permitiéndole evaluar la viabilidad de sus productos con agilidad y respaldo técnico."

    ]
  },
  {
    id: "almacenaje-y-consolidacion-de-cargas",
    title: "Almacenaje y consolidación de cargas",
    image: serviceAlmacenaje,
    description: [
      "Importar de múltiples proveedores de forma aislada multiplica los costos de flete y gastos de nacionalización, licuando la rentabilidad de su inversión. Nuestro servicio de consolidación estratégica unifica sus compras en un solo contenedor gestionado por nuestro equipo en origen, transformando procesos fragmentados en una operación logística eficiente y de bajo costo.", "A diferencia de los agentes de carga convencionales, nosotros somos su oficina técnica en China. Mantenemos un control riguroso sobre cada orden de compra y proporcionamos trazabilidad total, manteniendo a nuestros clientes informados sobre el estado de su mercadería los 365 días del año. Con WeChina, usted no solo ahorra en logística; gana la tranquilidad de saber que su stock está siendo custodiado por profesionales en cada etapa del trayecto."


    ]
  },
  {
    id: "viajes-de-negocios-a-china",
    title: "Viajes de negocios a China",
    image: serviceViajes,
    description: [
      "Deje de ser un turista en las ferias y conviértase en un importador con respaldo real en origen. En WeChina, transformamos su viaje de negocios en una operación estratégica, proporcionando la estructura física y técnica necesaria para que su visita a la Feria de Cantón o centros industriales de Indonesia sea productiva y segura. No solo lo recibimos; somos su equipo técnico presencial que valida proveedores en tiempo real.",
      "Nuestra asistencia integral en Asia incluye:",
      "Inteligencia Comercial: Diseño de un plan de negocios y rutas de inspección de fábricas antes de su llegada.",
      "Soporte Técnico-Lingüístico: Traductores especializados en negociación técnica y comercio exterior.",
      "Logística Ejecutiva: Recepción personalizada, traslados y soporte operativo continuo durante toda su estadía.",
      "Con nuestra sociedad binacional, usted cuenta con una oficina física en Buenos Aires y equipos propios en Guangzhou, asegurando que los acuerdos firmados en China tengan seguimiento y ejecución profesional."

    ]
  },
  {
    id: "creacion-de-marcas-propias",
    title: "Creación de marcas propias",
    image: serviceMarcas,
    description: [
      "Transformar una idea de negocio en una marca propia requiere más que un buen diseño; exige una estrategia de producción y control de estándares en origen. En WeChina, actuamos como tu departamento de ingeniería de marca en Asia, gestionando todo el proceso de fabricación bajo la modalidad OEM (Original Equipment Manufacturer) para asegurar que tu identidad se traduzca en productos de alta competitividad.",
      "No nos limitamos a 'dar consejos': establecemos y custodiamos tus protocolos de calidad ante los fabricantes. Nuestro equipo presencial en China supervisa que cada detalle de tu marca —desde los materiales técnicos hasta el packaging final— se ejecute según lo pactado, eliminando la incertidumbre del 'hazlo tú mismo' y protegiendo tu inversión frente a desviaciones de producción.",
      "Con el respaldo de nuestra estructura binacional, logramos que tu marca sea percibida como una solución sólida y profesional en el mercado argentino. Nos aseguramos de que los acuerdos de exclusividad y los estándares de fabricación estén blindados legal y operativamente, permitiéndote escalar tu negocio con la seguridad de tener una oficina técnica propia en el centro de producción global."

    ]
  }
];

const Services: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const serviceQuery = searchParams.get("service");

  const [activeService, setActiveService] = useState<ServiceItem>(servicesData[0]);

  useEffect(() => {
    if (serviceQuery) {
      const found = servicesData.find((s) => s.id === serviceQuery);
      if (found) {
        setActiveService(found);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }, [serviceQuery]);

  const handleServiceClick = (service: ServiceItem) => {
    setActiveService(service);
    setSearchParams({ service: service.id });
  };

  return (
    <SectionWrapper id="servicios" className="services-page-section">
      <div className="container">
        <div className="services-layout">
          <div className="services-sidebar">
            <h1 className="services-main-title">
              Tu estructura de comercio exterior <span className="text-highlight">en Asia.</span>
            </h1>
            <nav className="services-nav">
              <ul>
                {servicesData.map((service) => (
                  <li key={service.id}>
                    <button
                      className={`service-nav-item ${activeService.id === service.id ? "active" : ""}`}
                      onClick={() => handleServiceClick(service)}
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
                src={activeService.image}
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
import React from 'react';
import SectionWrapper from '../components/SectionWrapper';

const About: React.FC = () => {
  return (
    <SectionWrapper id="nosotros" className="about-section">
      <div className="container">
        <div className="about-content">
          <div className="about-text-column">
            <h1 className="about-title">
              Comprensión del mercado y audacia en los negocios, <span className="text-highlight">somos WeChina.</span>
            </h1>
            <div className="about-description">
              <p>
                El conocimiento y la comprensión de los negocios abren puertas a nuevas oportunidades. Por eso queremos compartir y facilitarles los procesos industriales, logísticos, legales, administrativos y fiscales, basados en nuestra experiencia por más de 15 años a quienes compran, fabrican o realizan negocios internacionales con China.
              </p>
              <p>
                Somos el aliado estratégico a nivel comercial y logístico que cualquier emprendedor, empresa o industria debería tener, ofreciendo un servicio profesional y de alta performance en el mercado chino.
              </p>
            </div>
          </div>
          <div className="about-image-column">
            {/* Image placeholder - to be replaced by the user */}
            <div className="about-image-placeholder">
              {/* <img src="/path-to-container-image.jpg" alt="WeChina Logistics" /> */}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default About;

import React from 'react';
import SectionWrapper from '../components/SectionWrapper';
import aboutVideo from '../assets/img/nosotros/HERO-aboutus_1.mp4';

const About: React.FC = () => {
  return (
    <SectionWrapper id="nosotros" className="about-section">
      <div className="about-video-bg">
        <video 
          src={aboutVideo} 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="about-video"
        />
        <div className="video-overlay"></div>
      </div>

      <div className="container about-container">
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
        </div>
      </div>
    </SectionWrapper>
  );
};

export default About;

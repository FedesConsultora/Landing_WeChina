import React from 'react';
import SectionWrapper from '../components/SectionWrapper';
import aboutVideo from '../assets/img/nosotros/HERO-aboutus_1.mp4';
import { useLanguage } from '../context/LanguageContext';

const About: React.FC = () => {
  const { t } = useLanguage();

  React.useEffect(() => {
    document.title = t.pageTitles.about;
  }, [t]);

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
              {t.about.title} <span className="text-highlight">{t.about.titleHighlight}</span>
            </h1>
            <div className="about-description">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default About;

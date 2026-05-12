import React from 'react';
import Hero from '../components/home/Hero';
import Highlights from '../components/home/Highlights';
import ServiceGrid from '../components/home/ServiceGrid';
import LogisticsCTA from '../components/home/LogisticsCTA';
import SectorBridge from '../components/home/SectorBridge';
import { useLanguage } from '../context/LanguageContext';

const Home: React.FC = () => {
  const { t } = useLanguage();

  React.useEffect(() => {
    document.title = t.pageTitles.home;
  }, [t]);

  return (
    <div className="home-page">
      <Hero />
      <Highlights />
      <ServiceGrid />
      <LogisticsCTA />
      <SectorBridge />
    </div>
  );
};

export default Home;

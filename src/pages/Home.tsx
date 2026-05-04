import React from 'react';
import Hero from '../components/home/Hero';
import Highlights from '../components/home/Highlights';
import ServiceGrid from '../components/home/ServiceGrid';
import LogisticsCTA from '../components/home/LogisticsCTA';
import SectorBridge from '../components/home/SectorBridge';

const Home: React.FC = () => {
  React.useEffect(() => {
    document.title = 'WeChina - Inicio';
  }, []);

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

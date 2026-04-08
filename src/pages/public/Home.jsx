import React from 'react';
import Hero from '../../components/Hero';
import About from '../../components/About';
import Services from '../../components/Services';
import Portfolio from '../../components/Portfolio';
import TechStack from '../../components/TechStack';
import Team from '../../components/Team';
import Contact from '../../components/Contact';
import ThreeDBackground from '../../components/ThreeDBackground';

const HomePage = () => {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <ThreeDBackground />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <TechStack />
      <Team />
      <Contact />
    </div>
  );
};

export default HomePage;

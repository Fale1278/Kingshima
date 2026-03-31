import React from 'react';
import Hero from '../../components/Hero';
import About from '../../components/About';
import Services from '../../components/Services';
import Portfolio from '../../components/Portfolio';
import TechStack from '../../components/TechStack';
import Team from '../../components/Team';
import Contact from '../../components/Contact';

const HomePage = () => {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <TechStack />
      <Team />
      <Contact />
    </>
  );
};

export default HomePage;

import React, { useEffect, useRef, useState } from 'react';

const Section = ({ children, id, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    });
    
    const { current } = domRef;
    observer.observe(current);
    
    return () => observer.unobserve(current);
  }, []);

  return (
    <section
      id={id}
      ref={domRef}
      className={`reveal ${isVisible ? 'visible' : ''} ${className}`}
      style={{ padding: '6rem 2rem', position: 'relative' }}
    >
      {children}
    </section>
  );
};

export default Section;

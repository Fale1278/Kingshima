import React from 'react';
import { motion } from 'framer-motion';

const Section = ({ children, id, className = "" }) => {
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 70, scale: 0.95, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.8, 
        type: "spring", 
        bounce: 0.4,
        staggerChildren: 0.2
      }}
      style={{ padding: '6rem 2rem', position: 'relative', width: '100%', perspective: '1000px' }}
    >
      {children}
    </motion.section>
  );
};

export default Section;

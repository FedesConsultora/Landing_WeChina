import React from 'react';

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ id, children, className = '' }) => {
  return (
    <section id={id} className={`section-anchor ${className}`}>
      {children}
    </section>
  );
};

export default SectionWrapper;

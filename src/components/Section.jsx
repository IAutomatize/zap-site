import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Section({ 
  children, 
  className = "", 
  id = "", 
  style = {}, 
  gradientType = "" // Pode ser: "accent", "green" ou vazio
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0.3, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2], [50, 0]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const gradientClass = gradientType ? `gradient-section ${gradientType}` : '';
  
  return (
    <section 
      id={id} 
      ref={ref} 
      className={`${className} ${gradientClass} ${isVisible ? 'is-visible' : ''}`} 
      style={style}
    >
      <motion.div
        style={{
          opacity,
          y,
          width: '100%'
        }}
      >
        {children}
      </motion.div>
    </section>
  );
} 
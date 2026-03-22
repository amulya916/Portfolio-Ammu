import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

function CustomCursor() {
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring config for the smooth lag follow effect
  const springConfig = { damping: 28, stiffness: 200, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Don't show on touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = (e) => {
      const target = e.target;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[data-cursor-grow]') ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON'
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e) => {
      const target = e.target;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[data-cursor-grow]') ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON'
      ) {
        setIsHovering(false);
      }
    };

    const handlePageLeave = () => setIsVisible(false);
    const handlePageEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);
    document.addEventListener('mouseleave', handlePageLeave);
    document.addEventListener('mouseenter', handlePageEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
      document.removeEventListener('mouseleave', handlePageLeave);
      document.removeEventListener('mouseenter', handlePageEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  return (
    <motion.div
      ref={cursorRef}
      className="cursor-blob"
      style={{
        left: springX,
        top: springY,
        opacity: isVisible ? 1 : 0,
        scale: isHovering ? 1.6 : 1,
      }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isHovering ? 1.6 : 1,
      }}
      transition={{ scale: { type: 'spring', damping: 20, stiffness: 300 }, opacity: { duration: 0.2 } }}
    />
  );
}

export default CustomCursor;

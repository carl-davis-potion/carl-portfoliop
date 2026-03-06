'use client';

import { useEffect, useRef, useState } from 'react';

export default function VerticalRuler(props: { className?: string }) {
  const [height, setHeight] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [lastClientY, setLastClientY] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollY, setScrollY] = useState(0);

  const handleMouseMove = (event: MouseEvent) => {
    if (containerRef.current) {
      setLastClientY(event.clientY);
      setMouseY(event.clientY + window.scrollY);
    }
  };

  const handleScroll = () => {
    updateHeight()
    if (containerRef.current) {
      const newScrollY = window.scrollY;
      setMouseY(lastClientY + newScrollY);
      setScrollY(newScrollY);
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.style.transform = `translateY(${-scrollY}px)`;
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollY]);

   const updateHeight = () => {
     setHeight(
       Math.max(
         document.documentElement.scrollHeight,
         document.body.scrollHeight,
       ),
     );
   };

  useEffect(() => {
   

    updateHeight();
    window.addEventListener('resize', updateHeight);
    window.addEventListener('load', updateHeight);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', updateHeight);
      window.removeEventListener('load', updateHeight);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none z-30 max-h-[100vh] w-12 select-none transition-transform ease-linear ${props.className || ''}`}
    >
      <div className='relative w-full' style={{ height: `${height}px` }}>
        {[...Array(Math.ceil(height / 50))].map((_, i) => {
          // const isCurrent = mouseY >= i * 50 && mouseY < (i + 1) * 50;
          // const isPrevious = mouseY >= (i - 1) * 50 && mouseY < i * 50;
          // const isNext = mouseY >= (i + 1) * 50 && mouseY < (i + 2) * 50;
          const adjustedMouseY = mouseY;
          const isCurrent =
            adjustedMouseY >= i * 50 && adjustedMouseY < (i + 1) * 50;
          const isPrevious =
            adjustedMouseY >= (i - 1) * 50 && adjustedMouseY < i * 50;
          const isNext =
            adjustedMouseY >= (i + 1) * 50 && adjustedMouseY < (i + 2) * 50;

          return (
            <div
              key={i}
              className='absolute left-0 flex items-center'
              style={{ top: `${i * 50}px` }}
            >
              <span
                className={`w-8 pr-1 text-right text-subheading-2xs ${
                  isCurrent
                    ? 'text-text-strong-950'
                    : isPrevious || isNext
                      ? 'text-text-sub-600'
                      : 'text-text-disabled-300 transition-all'
                }`}
              >
                {i * 50}
              </span>
              <div className='w-3 border-t border-gray-300' />
            </div>
          );
        })}
      </div>
    </div>
  );
}

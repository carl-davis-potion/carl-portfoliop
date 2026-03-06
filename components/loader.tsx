'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedVerticalRuler from './animated-vertical-ruler';

const name = 'Carl Preston Davis';
const segmentDuration = 500;
const totalSegments = 6;
const totalDuration = segmentDuration * totalSegments;

const SegmentedLoader: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const completionTimeout = setTimeout(() => {
      setIsLoading(false);
    }, totalDuration);
    return () => clearTimeout(completionTimeout);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className='fixed inset-0 z-[100] flex items-center justify-center bg-bg-white-0'
          initial={{ y: 0 }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <AnimatedVerticalRuler variant='left' />
          <AnimatedVerticalRuler variant='right' />
          <div className='flex w-full items-center justify-center md:w-1/2'>
            <motion.div
              className='flex flex-wrap justify-center gap-x-[0.15em] text-title-h1 text-text-strong-950 md:text-title-h0'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {name.split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  className='inline-block'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.15 + i * 0.12,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {word}{' '}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SegmentedLoader;

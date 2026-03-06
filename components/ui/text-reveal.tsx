'use client';

import { FC, ReactNode, useRef, Fragment } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LetterProps {
  children: ReactNode;
  progress: any; // MotionValue<number> is not directly accessible in the type definition
  range: [number, number];
}

const Letter: FC<LetterProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]); // Map scroll progress to opacity
  return (
    <span className='relative'>
      <span className='absolute opacity-30'>{children}</span>
      <motion.span style={{ opacity }} className='text-black dark:text-white'>
        {children}
      </motion.span>
    </span>
  );
};

type SupportedEdgeUnit = 'px' | 'vw' | 'vh' | '%';
type EdgeUnit = `${number}${SupportedEdgeUnit}`;
type NamedEdges = 'start' | 'end' | 'center';
type EdgeString = NamedEdges | EdgeUnit | `${number}`;
type Edge = EdgeString | number;
type ProgressIntersection = [number, number];
type Intersection = `${Edge} ${Edge}`;
type ScrollOffset = Array<Edge | Intersection | ProgressIntersection>;

interface TextRevealByWordProps {
  text: string;
  prefix?: string; // Add a prefix prop
  className?: string;
  velocity?: number;
  offset?: ScrollOffset;
}

export const TextRevealByWord = ({
  text,
  prefix = '', // Default prefix is empty
  className,
  velocity = 1,
  offset = ['start end', 'end start'],
}: TextRevealByWordProps) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset,
  });

  // Split text into words
  const trimmedText = text.trimStart();
  const words = trimmedText.split(/\s+/);

  if(prefix) {
    prefix = prefix + '\u00A0';
  }

  return (
    <div ref={targetRef} className={cn('relative z-0', className)}>
      <p className='flex flex-wrap text-title-h3 text-text-soft-400'>
        {prefix && (
          <span className='text-black opacity-100 dark:text-white'>{`${prefix}`}</span>
        )}
        {words.map((word, i) => {
          const start = (i / words.length) * (1 / velocity);
          const end = ((i + 1) / words.length) * (1 / velocity);
          
          return (
            <Fragment key={i}>
              <Letter progress={scrollYProgress} range={[start, end]}>
                {word}
              </Letter>
              &nbsp;
            </Fragment>
          );
        })}
      </p>
    </div>
  );
};

export default TextRevealByWord;

'use client';

import { ReactLenis, type LenisRef } from 'lenis/react';
import { cancelFrame, frame } from 'framer-motion';
import { ReactNode, useEffect, useRef } from 'react';

interface FrameData {
  delta: number;
  timestamp: number;
  isProcessing: boolean;
}

export default function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    function update(data: FrameData) {
      // Use FrameData's timestamp property
      lenisRef.current?.lenis?.raf(data.timestamp);
    }

    // Use Framer Motion's frame system
    frame.update(update, true);

    return () => {
      cancelFrame(update);
      lenisRef.current?.lenis?.destroy();
    };
  }, []);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        lerp: 0.04,
        smoothWheel: true,
        // syncTouch: true,
        wheelMultiplier: 1.5,
        // touchInertiaMultiplier: 1.7,
        // syncTouchLerp: 0.1,
        autoRaf: false, // Crucial: disable Lenis' internal RAF
      }}
    >
      {children}
    </ReactLenis>
  );
}

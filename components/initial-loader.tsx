'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Loader from '@/components/loader';
import { usePathname } from 'next/navigation';

export default function InitialLoader() {
  const [showLoader, setShowLoader] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Só mostra o loader na página inicial
    if (pathname !== '/') {
      setShowLoader(false);
      return;
    }

    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, [pathname]);

  return <AnimatePresence>{showLoader && <Loader />}</AnimatePresence>;
}

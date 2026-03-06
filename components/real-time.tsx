import React, { useEffect, useState } from 'react';
import HyperText from './ui/hyper-text';

const RealTimeClock = () => {
  const [time, setTime] = useState(
    new Date().toLocaleTimeString(undefined, { timeZoneName: 'short' })
  );

  useEffect(() => {
    // Atualiza o horário a cada segundo
    const interval = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString(undefined, { timeZoneName: 'short' })
      );
    }, 1000);

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(interval);
  }, []);

  return (
    time
  );
};

export default RealTimeClock;

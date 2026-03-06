import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className='flex items-center gap-1'>
      <svg width="56" height="56" viewBox="0 0 104 104" fill="current" className={`fill-current ${className}`} xmlns="http://www.w3.org/2000/svg">
<path d="M46.0626 11L25.6288 11L2.70541e-06 76.6483L20.4338 76.6483L46.0626 11Z"/>
<path d="M103.942 11L83.5087 11L57.8799 76.6483L78.3137 76.6483L103.942 11Z"/>
<path d="M68.2462 27.3516L47.8124 27.3516L22.1836 92.9998L42.6174 92.9998L68.2462 27.3516Z"/>
</svg>

      {/* <div className='text-title-h4 text-text-strong-950'>Mainnet</div> */}
    </div>
  );
};

export default Logo;

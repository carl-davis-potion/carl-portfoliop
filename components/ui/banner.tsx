import * as React from 'react';
import { cn } from '@/utils/cn';

// Lista de países subdesenvolvidos e emergentes
const DEVELOPING_COUNTRIES = [
  'BR', 'IN', 'CN', 'RU', 'ZA', 'MX', 'ID', 'TR', 'AR', 'CO', 
  'TH', 'MY', 'PH', 'EG', 'PK', 'VN', 'NG', 'BD'
  // ... adicione mais países conforme necessário
];

interface BannerProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ComponentType<{ className?: string }>;
  backgroundColor: string;
  iconColor: string;
  userCountry?: string; // Código do país do usuário (ISO 2)
}

export const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  ({ icon: IconComponent, backgroundColor, iconColor, userCountry, className, children, ...props }, ref) => {
    // Verifica se o país do usuário está na lista de países elegíveis
    const shouldShow = !userCountry || DEVELOPING_COUNTRIES.includes(userCountry.toUpperCase());

    if (!shouldShow) return null;

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex h-fit items-start justify-start gap-1 overflow-hidden rounded-lg p-2',
          className
        )}
        style={{ backgroundColor }}
        {...props}
      >
        <IconComponent className={cn('flex-shrink-0', iconColor)} />
        <div className='shrink grow basis-0 self-stretch text-paragraph-xs leading-3'>
          {children}
        </div>
      </div>
    );
  }
);

Banner.displayName = 'Banner'; 
import * as React from 'react';
import Image from 'next/image';
import { cn } from '@/utils/cn';

type SoftwareVariant = 'adobe-photoshop' | 'adobe-illustrator' | 'figma' | 'framer';

interface SoftwareTagProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: SoftwareVariant;
}

const softwareConfig: Record<SoftwareVariant, { title: string; icon: string }> = {
  'adobe-photoshop': {
    title: 'Adobe Photoshop',
    icon: '/assets/logos/Adobe-Photoshop.svg'
  },
  'adobe-illustrator': {
    title: 'Adobe Illustrator',
    icon: '/assets/logos/Adobe-Illustrator.svg'
  },
  'figma': {
    title: 'Figma',
    icon: '/assets/logos/Figma.svg'
  },
  'framer': {
    title: 'Framer',
    icon: '/assets/logos/Framer.svg'
  }
};

export const SoftwareTag = React.forwardRef<HTMLDivElement, SoftwareTagProps>(
  ({ variant, className, ...props }, ref) => {
    const config = softwareConfig[variant];

    return (
      <div 
        ref={ref}
        className={cn(
          'flex h-fit items-center justify-start gap-2 border border-stroke-soft-200 px-8 py-[15px]',
          className
        )}
        {...props}
      >
        <div className='relative h-8 w-8'>
          <Image
            src={config.icon}
            alt={config.title}
            width={32}
            height={32}
            className='object-contain'
          />
        </div>
        <div className='text-paragraph-sm text-text-strong-950'>
          {config.title}
        </div>
      </div>
    );
  }
);

SoftwareTag.displayName = 'SoftwareTag'; 
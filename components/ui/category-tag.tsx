import * as React from 'react';
import { cn } from '@/utils/cn';
import { RiShoppingBag2Line, RiTShirtLine, RiPaletteLine, RiLayoutLine, RiSmartphoneLine } from '@remixicon/react';

type CategoryVariant = 'e-commerce' | 'streetwear' | 'design' | 'ui-ux' | 'mobile';

interface CategoryTagProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: CategoryVariant;
}

const categoryConfig: Record<CategoryVariant, { title: string; icon: React.ElementType }> = {
  'e-commerce': {
    title: 'E-Commerce',
    icon: RiShoppingBag2Line
  },
  'streetwear': {
    title: 'Streetwear',
    icon: RiTShirtLine
  },
  'design': {
    title: 'Design',
    icon: RiPaletteLine
  },
  'ui-ux': {
    title: 'UI/UX',
    icon: RiLayoutLine
  },
  'mobile': {
    title: 'Mobile',
    icon: RiSmartphoneLine
  }
};

export const CategoryTag = React.forwardRef<HTMLDivElement, CategoryTagProps>(
  ({ variant, className, ...props }, ref) => {
    const config = categoryConfig[variant];
    const Icon = config.icon;

    return (
      <div 
        ref={ref}
        className={cn(
          'flex h-fit items-center justify-start gap-2 border border-stroke-soft-200 px-8 py-[15px]',
          className
        )}
        {...props}
      >
        <div className='flex h-6 shrink grow basis-0 items-center justify-start gap-2'>
          <Icon size={24} className="text-text-strong-950" />
          <div className='text-paragraph-sm text-text-strong-950'>
            {config.title}
          </div>
        </div>
      </div>
    );
  }
);

CategoryTag.displayName = 'CategoryTag'; 
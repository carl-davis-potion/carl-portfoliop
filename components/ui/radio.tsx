// AlignUI Radio v0.0.0

import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cn } from '@/utils/cn';

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    className={cn('flex flex-col w-full', className)}
    {...props}
    ref={ref}
  />
));
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, children, ...props }, ref) => {
  const id = React.useId();
  
  return (
    <div 
      className={cn(
        "group flex items-start gap-2 p-4 transition-all",
        "border border-stroke-soft-200",
        "hover:border-text-stroke-white-0/40",
        "[&:has([data-state=checked])]:border-stroke-strong-950",
        "[&:has([data-state=checked])]:bg-bg-weak-50",
        "cursor-pointer"
      )}
    >
      <RadioGroupPrimitive.Item
        ref={ref}
        id={id}
        className={cn(
          'h-4 w-4 rounded-full border border-stroke-soft-200',
          'ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-text-stroke-white-0',
          'radix-state-checked:bg-text-stroke-white-0 radix-state-checked:border-text-stroke-white-0',
          'relative cursor-pointer',
          className
        )}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center absolute inset-0">
          <div className="h-2 w-2 rounded-full bg-bg-strong-950" />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
      <label
        htmlFor={id}
        className="flex-1 cursor-pointer"
      >
        {children}
      </label>
    </div>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup as Group, RadioGroupItem as Item };

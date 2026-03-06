import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface TeamMemberProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  role: string;
  description: string;
  imageUrl: string;
}

export function TeamMember({ name, role, description, imageUrl, className, ...props }: TeamMemberProps) {
  return (
    <div className={cn('flex flex-col gap-4  border border-stroke-soft-200 ', className)} {...props}>
      <div className="relative h-[200px] w-[200px] overflow-hidden">
        <Image
          src={imageUrl}
          alt={`Foto de ${name}`}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex p-4 flex-col">
        <h3 className="text-title-h5 text-text-strong-950">{name}</h3>
        <p className="text-paragraph-sm text-text-sub-600">{role}</p>
        <p className="mt-2 text-paragraph-sm text-text-soft-400">{description}</p>
      </div>
    </div>
  );
} 
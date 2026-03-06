import { RainbowButton } from '@/components/ui/rainbow-button';
import { RESUME } from '@/data/resume';

interface HeaderProps {
  size?: 'compact' | 'full';
}

export default function Header({ size = 'compact' }: HeaderProps) {
  const maxWidthClass = size === 'full' ? 'max-w-[1100px]' : 'max-w-[720px]';

  return (
    <header
      className={`fixed z-10 flex h-fit w-full border-b border-stroke-soft-200 bg-bg-white-0 px-3 py-3 md:border-l md:border-r lg:px-8 lg:py-4 ${maxWidthClass} items-center justify-end shadow-[0px_16px_32px_-12px_rgba(14,18,27,0.10)]`}
    >
      <div className='flex items-center gap-2'>
        <RainbowButton
          onClick={() =>
            window.open(`mailto:${RESUME.contact.email}`, '_self')
          }
          className='w-fit px-2 md:px-2'
        >
          Contact
        </RainbowButton>
      </div>
    </header>
  );
}

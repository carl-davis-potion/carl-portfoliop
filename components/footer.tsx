import React from 'react';
import { RiLinkedinBoxLine, RiGithubLine } from '@remixicon/react';
import { RESUME } from '@/data/resume';

const Footer = (props: { className?: string }) => {
  return (
    <footer className='bg-bg-white-0 w-full max-w-[720px] h-fit flex-col items-start gap-6 border-r border-t border-l border-stroke-soft-200'>
      <div
        className={`flex flex-col align-top justify-between ${props.className || ''}`}
      >
        <div className='inline-flex w-full flex-col items-start justify-start gap-3 border-b border-stroke-soft-200 p-4 lg:p-8'>
          <div className='flex flex-wrap items-center gap-x-4 gap-y-2 text-paragraph-sm text-text-sub-600'>
            <a
              href={`mailto:${RESUME.contact.email}`}
              className='hover:text-text-strong-950'
            >
              {RESUME.contact.email}
            </a>
            <a
              href={RESUME.contact.linkedinUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-1.5 hover:text-text-strong-950'
            >
              <RiLinkedinBoxLine className='size-4' />
              LinkedIn
            </a>
            <a
              href={RESUME.contact.githubUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-1.5 hover:text-text-strong-950'
            >
              <RiGithubLine className='size-4' />
              GitHub
            </a>
          </div>
        </div>

        <div className='flex w-full justify-between border-stroke-soft-200 p-4'>
          <span className='text-paragraph-sm text-text-strong-950'>
            {RESUME.name} © {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

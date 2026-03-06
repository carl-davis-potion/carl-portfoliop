'use client';

import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/header';
import Footer from '@/components/footer';
import VerticalRuler from '@/components/vertical-ruler';
import { RESUME } from '@/data/resume';
import {
  RiMapPinLine,
  RiMailLine,
  RiPhoneLine,
  RiLinkedinBoxLine,
  RiGithubLine,
} from '@remixicon/react';

export default function Home() {
  const [photoError, setPhotoError] = useState(false);

  return (
    <div className='relative flex w-full flex-col items-center'>
      <Header />
      <div className='relative flex w-full max-w-[720px] flex-col border-l border-r border-stroke-soft-200 bg-bg-white-0'>
        <div className='absolute left-[-50px] flex w-full items-start'>
          <VerticalRuler className='fixed top-0' />
        </div>

        <div className='flex flex-col gap-8 border-t border-stroke-soft-200 px-4 pt-[122px] pb-16 lg:px-8'>
          {/* Last updated */}
          <p className='text-subheading-sm text-text-soft-400'>
            Last updated {RESUME.lastUpdated}
          </p>

          {/* Name, title & photo */}
          <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6'>
            <div className='flex flex-col gap-1'>
              <h1 className='text-title-h1 text-text-strong-950'>
                {RESUME.name}
              </h1>
              <p className='text-title-h5 text-text-sub-600'>
                {RESUME.title}
              </p>
            </div>
            {!photoError && (
              <div className='relative h-28 w-28 shrink-0 overflow-hidden rounded-full border-2 border-stroke-soft-200 bg-bg-weak-50 sm:h-32 sm:w-32'>
                <Image
                  src={RESUME.photo}
                  alt={RESUME.name}
                  fill
                  className='object-cover'
                  sizes='128px'
                  priority
                  onError={() => setPhotoError(true)}
                />
              </div>
            )}
          </div>

          {/* Contact row */}
          <div className='flex flex-wrap items-center gap-x-4 gap-y-2 text-paragraph-sm text-text-sub-600'>
            <span className='inline-flex items-center gap-1.5'>
              <RiMapPinLine className='size-4 shrink-0' />
              {RESUME.contact.location}
            </span>
            <a
              href={`mailto:${RESUME.contact.email}`}
              className='inline-flex items-center gap-1.5 hover:text-text-strong-950'
            >
              <RiMailLine className='size-4 shrink-0' />
              {RESUME.contact.email}
            </a>
            <a
              href={`tel:${RESUME.contact.phone.replace(/\D/g, '')}`}
              className='inline-flex items-center gap-1.5 hover:text-text-strong-950'
            >
              <RiPhoneLine className='size-4 shrink-0' />
              {RESUME.contact.phone}
            </a>
            <a
              href={RESUME.contact.linkedinUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-1.5 hover:text-text-strong-950'
            >
              <RiLinkedinBoxLine className='size-4 shrink-0' />
              {RESUME.contact.linkedin}
            </a>
            <a
              href={RESUME.contact.githubUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-1.5 hover:text-text-strong-950'
            >
              <RiGithubLine className='size-4 shrink-0' />
              {RESUME.contact.github}
            </a>
          </div>

          {/* Summary */}
          <section className='flex flex-col gap-2'>
            <h2 className='text-title-h5 text-text-strong-950'>Summary</h2>
            <div className='flex flex-col gap-2 text-paragraph-sm text-text-sub-600'>
              {RESUME.summary.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </section>

          {/* Experience */}
          <section className='flex flex-col gap-6'>
            <h2 className='text-title-h5 text-text-strong-950'>Experience</h2>
            <div className='flex flex-col gap-8'>
              {RESUME.experience.map((job) => (
                <div
                  key={`${job.company}-${job.period}`}
                  className='flex flex-col gap-2'
                >
                  <div className='flex flex-wrap items-baseline justify-between gap-2'>
                    <div>
                      <h3 className='text-label-lg text-text-strong-950'>
                        {job.company},{' '}
                        <span className='font-normal text-text-sub-600'>
                          {job.role}
                        </span>
                      </h3>
                    </div>
                    <div className='text-paragraph-sm text-text-soft-400'>
                      {job.period}
                      {job.duration && (
                        <span className='ml-1 text-text-sub-600'>
                          {job.duration}
                        </span>
                      )}
                    </div>
                  </div>
                  {job.bullets.length > 0 && (
                    <ul className='list-inside list-disc space-y-1.5 text-paragraph-sm text-text-sub-600'>
                      {job.bullets.map((bullet, j) => (
                        <li key={j}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section className='flex flex-col gap-4'>
            <h2 className='text-title-h5 text-text-strong-950'>Skills</h2>
            <div className='flex flex-col gap-3'>
              {Object.entries(RESUME.skills).map(([category, list]) => (
                <div key={category}>
                  <span className='text-label-md text-text-strong-950'>
                    {category}:{' '}
                  </span>
                  <span className='text-paragraph-sm text-text-sub-600'>
                    {list}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className='flex flex-col gap-2'>
            <h2 className='text-title-h5 text-text-strong-950'>Education</h2>
            <div className='text-paragraph-sm text-text-sub-600'>
              <span className='font-medium text-text-strong-950'>
                {RESUME.education.degree}{' '}
              </span>
              <span className='text-text-strong-950'>
                {RESUME.education.institution},{' '}
                {RESUME.education.field}
              </span>
              <br />
              <span>{RESUME.education.location}</span>
              <br />
              <span>{RESUME.education.period}</span>
            </div>
          </section>
        </div>
      </div>

      <Footer className='md:flex-col' />
    </div>
  );
}

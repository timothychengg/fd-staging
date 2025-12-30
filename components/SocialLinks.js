'use client';

import { memo } from 'react';

export const SocialLinks = memo(function SocialLinks({ className = '' }) {
  const socialLinks = [
    {
      href: 'https://www.instagram.com/fanddstaging/',
      label: 'Follow us on Instagram',
      color: '#E4405F',
      hoverColor: '#C13584',
      icon: (
        <svg
          className='h-5 w-5'
          fill='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
        </svg>
      ),
    },
    {
      href: 'https://www.thumbtack.com/ca/pleasant-hill/home-staging/fd-staging/service/491115335951941639',
      label: 'View us on Thumbtack',
      color: '#009FD9',
      hoverColor: '#007BA8',
      icon: (
        <svg
          className='h-5 w-5'
          fill='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' />
        </svg>
      ),
    },
    {
      href: 'https://www.yelp.com/biz/f-and-d-staging-pleasant-hill',
      label: 'View us on Yelp',
      color: '#FF1A1A',
      hoverColor: '#D32323',
      icon: (
        <svg
          className='h-5 w-5'
          fill='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
        </svg>
      ),
    },
  ];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {socialLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target='_blank'
          rel='noopener noreferrer'
          className='flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-all hover:shadow-sm'
          style={{
            color: link.color,
            borderColor: `${link.color}30`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = link.hoverColor;
            e.currentTarget.style.borderColor = `${link.hoverColor}40`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = link.color;
            e.currentTarget.style.borderColor = `${link.color}30`;
          }}
          aria-label={link.label}
          title={link.label}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
});

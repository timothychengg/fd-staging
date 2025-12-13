'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';

// Optimize motion components
const MotionDiv = motion.div;

const navItems = [
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/services', label: 'Services' },
  { href: '/process', label: 'Process' },
  { href: '/about', label: 'About Us' },
  // { href: '/partners', label: 'For Agents' },
  { href: '/faq', label: 'FAQ' },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className='sticky top-0 z-40 border-b border-luxmuted/15 bg-luxbg/80 backdrop-blur'>
      <a href='#main-content' className='skip-link'>
        Skip to main content
      </a>
      <div className='section-shell flex items-center justify-between gap-4 py-4'>
        <Link href='/' className='flex items-center gap-3' aria-label="F&D Staging Home">
          <MotionDiv
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <Logo size="default" />
          </MotionDiv>
          <div className='flex flex-col'>
            <span className='tagline text-[0.68rem]'>F&amp;D STAGING</span>
            <span className='text-[0.7rem] text-luxmuted'>
              Home Staging • San Francisco Bay Area
            </span>
          </div>
        </Link>

        <nav className='hidden items-center gap-6 text-[0.78rem] text-luxmuted md:flex'>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className='uppercase tracking-[0.18em] hover:text-luxtxt'
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className='flex items-center gap-3'>
          <Link
            href='/contact'
            className='btn-pill hidden bg-luxtxt text-luxbg md:inline-flex'
          >
            Book With Us
          </Link>
          <button
            type='button'
            onClick={() => setOpen((v) => !v)}
            className='inline-flex h-9 w-9 items-center justify-center rounded-full border border-luxmuted/40 text-[0.7rem] uppercase tracking-[0.18em] md:hidden'
            aria-label='Toggle navigation'
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <MotionDiv
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className='border-t border-luxmuted/15 bg-luxbg md:hidden'
          >
            <div className='section-shell flex flex-col gap-4 py-4 text-sm'>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className='uppercase tracking-[0.18em] text-luxmuted'
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href='/contact'
                onClick={() => setOpen(false)}
                className='btn-pill bg-luxtxt text-center text-luxbg'
              >
                Book Consult
              </Link>
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </header>
  );
}

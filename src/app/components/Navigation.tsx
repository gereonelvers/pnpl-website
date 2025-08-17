'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
      // Only hide navigation on home page initially
      setIsVisible(pathname !== '/' || scrollY > 100);
    };

    // Set initial visibility based on page
    setIsVisible(pathname !== '/');
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const isHomePage = pathname === '/';

  const handleSectionClick = (sectionId: string) => {
    if (isHomePage) {
      // On home page, scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // On other pages, navigate to home page with hash
      window.location.href = `/#${sectionId}`;
    }
  };

  const handleHomeClick = () => {
    if (isHomePage) {
      // On home page, scroll to hero
      const element = document.getElementById('hero');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // On other pages, navigate to home
      window.location.href = '/';
    }
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: isScrolled ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)',
        backdropFilter: isScrolled ? 'blur(15px)' : 'blur(10px)',
        borderBottom: isScrolled ? '1px solid rgba(0, 0, 0, 0.1)' : '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.1)' : '0 2px 10px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.3s ease',
        padding: isScrolled ? '0.8rem 2rem' : '1rem 2rem',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
        pointerEvents: isVisible ? 'auto' : 'none'
      }}
    >
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        maxWidth: '90%',
        margin: '0 auto',
        width: '100%'
      }}>
        <button
          onClick={handleHomeClick}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: 'clamp(14px, 4vw, 20px)',
            fontWeight: 500,
            color: '#000',
            letterSpacing: '-0.01em',
            textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '60vw'
          }}
        >
          <span className="desktop-only">Parker Jones Neural Processing Lab</span><span className="mobile-only">PNPL</span>
        </button>
        
        <div style={{ 
          display: 'flex', 
          gap: 'clamp(0.5rem, 2vw, 2rem)',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => handleSectionClick('publications')}
            className="nav-link"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: 'clamp(12px, 2vw, 14px)',
              color: '#444',
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              transition: 'color 0.2s ease',
              textShadow: '0 1px 1px rgba(255, 255, 255, 0.6)'
            }}
          >
            Publications
          </button>
          
          <button
            onClick={() => handleSectionClick('team')}
            className="nav-link"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: 'clamp(12px, 2vw, 14px)',
              color: '#444',
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              transition: 'color 0.2s ease',
              textShadow: '0 1px 1px rgba(255, 255, 255, 0.6)'
            }}
          >
            Team
          </button>
          
          <Link
            href="/blog"
            className="nav-link"
            style={{
              fontSize: 'clamp(12px, 2vw, 14px)',
              color: '#444',
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              transition: 'color 0.2s ease',
              textShadow: '0 1px 1px rgba(255, 255, 255, 0.6)',
              textDecoration: 'none'
            }}
          >
            Blog
          </Link>
          
          <a
            href="mailto:parker.jones@oxford.ac.uk"
            className="nav-button"
            style={{
              fontSize: 'clamp(10px, 2vw, 12px)',
              color: '#000',
              textDecoration: 'none',
              border: '1px solid #000',
              padding: 'clamp(0.3rem, 1vw, 0.5rem) clamp(0.6rem, 2vw, 1rem)',
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              transition: 'all 0.2s ease',
              background: 'rgba(255, 255, 255, 0.1)',
              textShadow: '0 1px 1px rgba(255, 255, 255, 0.8)'
            }}
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isOverDarkSection, setIsOverDarkSection] = useState(false);
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

  // Detect when navbar intersects with dark sections
  useEffect(() => {
    if (pathname !== '/') {
      setIsOverDarkSection(false);
      return;
    }

    setIsOverDarkSection(false);

    const checkIntersection = () => {
      // Check explicitly marked dark sections
      const darkSections = document.querySelectorAll('[data-dark-section]');
      
      // Also check for code blocks that typically have dark backgrounds
      const codeElements = document.querySelectorAll('pre, code, .hljs, .highlight, .code-block, .language-');
      
      let isOverDark = false;
      const navbarHeight = 80; // Approximate navbar height

      // Check marked dark sections
      darkSections.forEach((section) => {
        const sectionRect = section.getBoundingClientRect();
        if (sectionRect.top < navbarHeight && sectionRect.bottom > 0) {
          isOverDark = true;
          console.log('Navbar intersecting with dark section:', section);
        }
      });

      // Check code elements
      codeElements.forEach((element) => {
        const elementRect = element.getBoundingClientRect();
        // Only check larger code blocks (height > 30px) to avoid inline code
        if (elementRect.height > 30 && elementRect.top < navbarHeight && elementRect.bottom > 0) {
          const computedStyle = window.getComputedStyle(element);
          const bgColor = computedStyle.backgroundColor;
          
          // Check if background is dark (not transparent or very light)
          if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
            const rgb = bgColor.match(/\d+/g);
            if (rgb) {
              const brightness = (parseInt(rgb[0]) * 0.299 + parseInt(rgb[1]) * 0.587 + parseInt(rgb[2]) * 0.114);
              if (brightness < 128) { // Dark background
                isOverDark = true;
                console.log('Navbar intersecting with dark code element:', element);
              }
            }
          }
        }
      });

      console.log('Navbar over dark section:', isOverDark);
      setIsOverDarkSection(isOverDark);
    };

    // Check on scroll and resize
    const handleScroll = () => checkIntersection();
    const handleResize = () => checkIntersection();

    // Initial check after DOM is ready
    const timer = setTimeout(checkIntersection, 100);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
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
        padding: isScrolled ? '0.8rem 1rem' : '1rem 1rem',
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
            color: isOverDarkSection === true ? '#ffffff' : '#000000',
            letterSpacing: '-0.01em',
            textShadow: isOverDarkSection ? '0 1px 2px rgba(0, 0, 0, 0.5)' : '0 1px 2px rgba(255, 255, 255, 0.8)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '60vw',
            transition: 'color 0.3s ease, text-shadow 0.3s ease'
          }}
          title={`Debug: isOverDarkSection=${isOverDarkSection}`}
        >
          <span className="desktop-only">🍍 Parker Jones Neural Processing Lab</span><span className="mobile-only">🍍 PNPL</span>
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
              color: isOverDarkSection === true ? 'rgba(255, 255, 255, 0.9)' : '#444444',
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              transition: 'color 0.3s ease, text-shadow 0.3s ease',
              textShadow: isOverDarkSection ? '0 1px 1px rgba(0, 0, 0, 0.3)' : '0 1px 1px rgba(255, 255, 255, 0.6)'
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
              color: isOverDarkSection === true ? 'rgba(255, 255, 255, 0.9)' : '#444444',
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              transition: 'color 0.3s ease, text-shadow 0.3s ease',
              textShadow: isOverDarkSection ? '0 1px 1px rgba(0, 0, 0, 0.3)' : '0 1px 1px rgba(255, 255, 255, 0.6)'
            }}
          >
            Team
          </button>
          
          <Link
            href="/blog"
            className="nav-link"
            style={{
              fontSize: 'clamp(12px, 2vw, 14px)',
              color: isOverDarkSection === true ? 'rgba(255, 255, 255, 0.9)' : '#444444',
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              transition: 'color 0.3s ease, text-shadow 0.3s ease',
              textShadow: isOverDarkSection ? '0 1px 1px rgba(0, 0, 0, 0.3)' : '0 1px 1px rgba(255, 255, 255, 0.6)',
              textDecoration: 'none'
            }}
          >
            Blog
          </Link>
          
          <button
            onClick={() => handleSectionClick('get-in-touch')}
            className="nav-button"
            style={{
              fontSize: 'clamp(10px, 2vw, 12px)',
              color: isOverDarkSection === true ? '#ffffff' : '#000000',
              border: `1px solid ${isOverDarkSection === true ? '#ffffff' : '#000000'}`,
              padding: 'clamp(0.3rem, 1vw, 0.5rem) clamp(0.6rem, 2vw, 1rem)',
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              transition: 'all 0.3s ease',
              background: isOverDarkSection ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
              textShadow: isOverDarkSection ? '0 1px 1px rgba(0, 0, 0, 0.3)' : '0 1px 1px rgba(255, 255, 255, 0.8)',
              cursor: 'pointer'
            }}
          >
            Contact
          </button>
        </div>
      </div>
    </nav>
  );
}

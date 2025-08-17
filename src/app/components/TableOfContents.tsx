'use client';

import React, { useState, useEffect } from 'react';
import { TocItem } from '@/types/blog';

interface TableOfContentsProps {
  items: TocItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [tocPosition, setTocPosition] = useState<'fixed' | 'absolute'>('fixed');
  const [tocTop, setTocTop] = useState(200);

  useEffect(() => {
    const handleScroll = () => {
      const headings = items.map(item => {
        const element = document.getElementById(item.id);
        if (!element) {
          console.log(`TOC: Could not find element with ID "${item.id}" for heading "${item.text}"`);
        }
        return element;
      }).filter(Boolean);
      
      console.log(`TOC: Found ${headings.length} out of ${items.length} heading elements`);
      
      const scrollPosition = window.scrollY + 100; // Offset for header

      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i];
        if (heading && heading.offsetTop <= scrollPosition) {
          setActiveId(heading.id);
          break;
        }
      }

      // Adjust TOC position to avoid footer overlap
      const footer = document.querySelector('footer');
      const article = document.querySelector('article');
      
      if (footer && article) {
        const footerTop = footer.offsetTop;
        const articleRect = article.getBoundingClientRect();
        // const articleBottom = window.scrollY + articleRect.bottom;
        const tocHeight = 400; // Approximate TOC height
        const buffer = 100; // Buffer space
        
        // Check if we need to switch to absolute positioning
        const spaceFromFooter = footerTop - (window.scrollY + window.innerHeight);
        const needsAbsolutePosition = spaceFromFooter < tocHeight + buffer;
        
        if (needsAbsolutePosition) {
          setTocPosition('absolute');
          // Position TOC so it ends before the footer
          const maxTop = Math.max(200, footerTop - tocHeight - buffer);
          setTocTop(maxTop);
        } else {
          setTocPosition('fixed');
          setTocTop(200);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Set initial active item

    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // Account for fixed header
      const top = element.offsetTop - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div style={{
      position: tocPosition,
      top: `${tocTop}px`,
      right: '2rem',
      width: '280px',
      maxHeight: tocPosition === 'fixed' ? 'calc(100vh - 240px)' : '400px',
      overflowY: 'auto',
      background: '#fff',
      border: '1px solid #eee',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      zIndex: 10,
      transition: 'top 0.3s ease'
    }}
    className="toc-container"
    >
      <h3 style={{
        fontSize: '16px',
        fontWeight: 600,
        marginBottom: '1rem',
        color: '#0a0a0a',
        borderBottom: '1px solid #eee',
        paddingBottom: '0.5rem'
      }}>
        Table of Contents
      </h3>
      
      <nav>
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0
        }}>
          {items.map((item) => (
            <li
              key={item.id}
              style={{
                marginBottom: '0.5rem'
              }}
            >
              <button
                onClick={() => scrollToHeading(item.id)}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  padding: '0.5rem 0',
                  fontSize: '14px',
                  color: activeId === item.id ? '#0a0a0a' : '#666',
                  fontWeight: activeId === item.id ? 600 : 400,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  paddingLeft: `${(item.level - 1) * 12 + 12}px`,
                  borderLeft: activeId === item.id ? '3px solid #0a0a0a' : '3px solid transparent',
                  marginLeft: '-12px'
                }}
                onMouseEnter={(e) => {
                  if (activeId !== item.id) {
                    e.currentTarget.style.color = '#333';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeId !== item.id) {
                    e.currentTarget.style.color = '#666';
                  }
                }}
              >
                {item.text}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

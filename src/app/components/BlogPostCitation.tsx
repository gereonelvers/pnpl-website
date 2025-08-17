'use client';

import React, { useState, useEffect } from 'react';

interface BlogPostCitationProps {
  bibtex: string;
}

export default function BlogPostCitation({ bibtex }: BlogPostCitationProps) {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const copyBibTeX = async () => {
    try {
      await navigator.clipboard.writeText(bibtex);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy BibTeX:', err);
    }
  };

  return (
    <section style={{
      marginTop: '3rem',
      marginBottom: '2rem',
      padding: '2rem',
      background: 'linear-gradient(135deg, #f8f9ff 0%, #e8f2ff 100%)',
      borderRadius: '12px',
      border: '2px solid #e3f2fd',
      position: 'relative'
    }}>
      {/* Decorative element */}
      <div style={{
        position: 'absolute',
        top: '-1px',
        left: '2rem',
        right: '2rem',
        height: '3px',
        background: 'linear-gradient(90deg, #1976d2, #42a5f5, #1976d2)',
        borderRadius: '2px'
      }} />
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        flexWrap: 'wrap'
      }}>
        <div style={{ flex: 1 }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: 600,
            marginBottom: '0.5rem',
            color: '#1565c0',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{
              fontSize: '20px'
            }}>📄</span>
            Cite this blog post
          </h3>
          
          <p style={{
            fontSize: '14px',
            color: '#1976d2',
            margin: 0,
            lineHeight: 1.4
          }}>
            Use this citation format to reference this blog post in your research
          </p>
        </div>
        
        {mounted && (
          <button
            onClick={copyBibTeX}
            style={{
              background: copied ? '#4CAF50' : '#1976d2',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              minWidth: '120px',
              boxShadow: copied ? '0 2px 8px rgba(76, 175, 80, 0.3)' : '0 2px 8px rgba(25, 118, 210, 0.3)'
            }}
            onMouseEnter={(e) => {
              if (!copied) {
                e.currentTarget.style.background = '#1565c0';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseLeave={(e) => {
              if (!copied) {
                e.currentTarget.style.background = '#1976d2';
                e.currentTarget.style.transform = 'translateY(0)';
              }
            }}
          >
            {copied ? '✓ Copied!' : 'Copy BibTeX'}
          </button>
        )}
      </div>
    </section>
  );
}
'use client';

import { useEffect } from 'react';

interface MathRendererProps {
  children: React.ReactNode;
}

export default function MathRenderer({ children }: MathRendererProps) {
  useEffect(() => {
    const renderMath = async () => {
      try {
        // Import KaTeX dynamically
        const katex = await import('katex');
        
        // Render display math
        const displayMath = document.querySelectorAll('.math-display');
        displayMath.forEach((element) => {
          const mathText = element.textContent;
          if (mathText) {
            try {
              // Remove the \[ and \] delimiters
              const cleanMath = mathText.replace(/^\\\[/, '').replace(/\\\]$/, '');
              element.innerHTML = katex.renderToString(cleanMath, {
                displayMode: true,
                throwOnError: false
              });
            } catch (err) {
              console.warn('Failed to render display math:', err);
            }
          }
        });

        // Render inline math
        const inlineMath = document.querySelectorAll('.math-inline');
        inlineMath.forEach((element) => {
          const mathText = element.textContent;
          if (mathText) {
            try {
              // Remove the \( and \) delimiters
              const cleanMath = mathText.replace(/^\\\(/, '').replace(/\\\)$/, '');
              element.innerHTML = katex.renderToString(cleanMath, {
                displayMode: false,
                throwOnError: false
              });
            } catch (err) {
              console.warn('Failed to render inline math:', err);
            }
          }
        });
      } catch (error) {
        console.warn('KaTeX not available:', error);
      }
    };

    renderMath();
  }, [children]);

  return <>{children}</>;
}

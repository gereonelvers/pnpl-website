'use client';

import React, { useState, useEffect } from 'react';

export default function BlogDemo() {
  const [mounted, setMounted] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const startDemo = () => {
    if (!mounted) return;
    
    setIsRunning(true);
    setResults('Processing neural signals...\n');
    
    const words = ['hello', 'world', 'brain', 'computer', 'interface'];
    
    setTimeout(() => {
      const randomWord = words[Math.floor(Math.random() * words.length)];
      const confidence = (85 + Math.random() * 10).toFixed(1);
      
      setResults(prev => prev + 
        `Detected word: ${randomWord}\n` +
        `Confidence: ${confidence}%\n` +
        `Processing time: ${(150 + Math.random() * 100).toFixed(0)}ms\n` +
        `✅ Classification complete!\n`
      );
      setIsRunning(false);
    }, 2000);
  };

  if (!mounted) {
    return (
      <div style={{
        background: '#f5f5f5',
        padding: '2rem',
        borderRadius: '12px',
        margin: '2rem 0'
      }}>
        <h3>🧠 Inner Speech Classifier Demo</h3>
        <p>Loading demo...</p>
      </div>
    );
  }

  return (
    <div style={{
      background: '#f5f5f5',
      padding: '2rem',
      borderRadius: '12px',
      margin: '2rem 0'
    }}>
      <h3>🧠 Inner Speech Classifier Demo</h3>
      <button
        onClick={startDemo}
        disabled={isRunning}
        style={{
          background: isRunning ? '#ccc' : '#007acc',
          color: 'white',
          border: 'none',
          padding: '1rem 2rem',
          borderRadius: '8px',
          cursor: isRunning ? 'not-allowed' : 'pointer',
          margin: '1rem 0'
        }}
      >
        {isRunning ? 'Processing...' : 'Start Classification'}
      </button>
      {results && (
        <div style={{
          marginTop: '1rem',
          fontFamily: 'monospace',
          whiteSpace: 'pre-line',
          background: '#e8f4fd',
          padding: '1rem',
          borderRadius: '4px'
        }}>
          {results}
        </div>
      )}
    </div>
  );
}

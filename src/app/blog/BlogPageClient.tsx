'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { BlogPost } from '@/types/blog';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

interface BlogPageProps {
  posts: BlogPost[];
  tags: string[];
}

export default function BlogPageClient({ posts, tags }: BlogPageProps) {
  const [selectedTag, setSelectedTag] = useState<string>('');
  
  const filteredPosts = selectedTag 
    ? posts.filter(post => post.tags.includes(selectedTag))
    : posts;

  return (
    <>
      <Navigation />
      <main style={{ 
        paddingTop: '120px', 
        minHeight: '100vh',
        background: '#fafafa',
        color: '#0a0a0a'
      }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '0 clamp(1rem, 4vw, 2rem)'
        }}>
          {/* Header */}
          <header style={{
            textAlign: 'center',
            paddingBottom: 'clamp(2.5rem, 8vw, 5rem)',
            marginBottom: 'clamp(2rem, 6vw, 4rem)'
          }}>
            <h1 style={{
              fontSize: 'clamp(28px, 8vw, 52px)',
              fontWeight: 200,
              marginBottom: '1.5rem',
              letterSpacing: '-0.025em',
              color: '#0a0a0a'
            }}>
              Research & Insights
            </h1>
            <p style={{
              fontSize: 'clamp(16px, 4vw, 20px)',
              color: '#555',
              maxWidth: '500px',
              margin: '0 auto',
              lineHeight: 1.5,
              fontWeight: 300
            }}>
              Latest thoughts and discoveries from the lab
            </p>
          </header>

          {/* Tags Filter */}
          {tags && tags.length > 0 && (
            <div style={{
              marginBottom: 'clamp(2rem, 6vw, 4rem)',
              textAlign: 'center'
            }}>
              <div style={{
                display: 'inline-flex',
                gap: 'clamp(0.5rem, 2vw, 0.75rem)',
                flexWrap: 'wrap',
                justifyContent: 'center',
                padding: 'clamp(0.3rem, 1vw, 0.5rem)',
                background: '#fff',
                borderRadius: '50px',
                boxShadow: '0 2px 20px rgba(0,0,0,0.08)',
                maxWidth: '100%',
                overflow: 'hidden'
              }}>
                <button
                  onClick={() => setSelectedTag('')}
                  style={{
                    padding: 'clamp(0.4rem, 2vw, 0.6rem) clamp(0.8rem, 3vw, 1.2rem)',
                    border: 'none',
                    background: selectedTag === '' ? '#0a0a0a' : 'transparent',
                    color: selectedTag === '' ? '#fff' : '#666',
                    borderRadius: '50px',
                    fontSize: 'clamp(12px, 3vw, 14px)',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  All
                </button>
                {tags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    style={{
                      padding: 'clamp(0.4rem, 2vw, 0.6rem) clamp(0.8rem, 3vw, 1.2rem)',
                      border: 'none',
                      background: selectedTag === tag ? '#0a0a0a' : 'transparent',
                      color: selectedTag === tag ? '#fff' : '#666',
                      borderRadius: '50px',
                      fontSize: 'clamp(12px, 3vw, 14px)',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Posts List */}
          {!filteredPosts || filteredPosts.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '5rem 0',
              color: '#999',
              fontSize: '18px'
            }}>
              {selectedTag ? `No posts tagged "${selectedTag}"` : 'Coming soon...'}
            </div>
          ) : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(2rem, 5vw, 3rem)',
              marginBottom: 'clamp(3rem, 8vw, 5rem)'
            }}>
              {filteredPosts.map((post) => (
                <article
                  key={post.slug}
                  style={{
                    background: '#fff',
                    borderRadius: 'clamp(12px, 3vw, 16px)',
                    padding: 'clamp(1.5rem, 5vw, 2.5rem)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                    border: '1px solid rgba(0,0,0,0.06)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 8px 40px rgba(0,0,0,0.12)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    style={{ 
                      textDecoration: 'none', 
                      color: 'inherit',
                      display: 'block'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column'
                    }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      marginBottom: '1.5rem',
                      fontSize: '13px',
                      color: '#888',
                      fontWeight: 500
                    }}>
                      <span>{(() => {
                        try {
                          const date = new Date(post.date);
                          if (isNaN(date.getTime())) {
                            return post.date;
                          }
                          return format(date, 'MMM dd, yyyy');
                        } catch {
                          return post.date;
                        }
                      })()}</span>
                      <span>•</span>
                      <span>{post.readingTime} min</span>
                    </div>
                    
                    <h2 
                      className="blog-post-title"
                      style={{
                        fontSize: 'clamp(30px, 7vw, 32px)',
                        fontWeight: 500,
                        marginBottom: '1rem',
                        lineHeight: 1.3,
                        color: '#0a0a0a',
                        letterSpacing: '-0.01em'
                      }}>
                      {post.title}
                    </h2>
                    
                    <p style={{
                      fontSize: 'clamp(14px, 3.5vw, 16px)',
                      color: '#666',
                      lineHeight: 1.6,
                      marginBottom: '1.5rem'
                    }}>
                      {post.excerpt}
                    </p>
                    
                    {post.tags.length > 0 && (
                      <div style={{
                        display: 'flex',
                        gap: '0.5rem',
                        flexWrap: 'wrap'
                      }}>
                        {post.tags.slice(0, 3).map(tag => (
                          <span
                            key={tag}
                            style={{
                              background: '#f8f9fa',
                              color: '#666',
                              padding: '0.3rem 0.8rem',
                              borderRadius: '6px',
                              fontSize: '12px',
                              fontWeight: 500
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 3 && (
                          <span style={{
                            color: '#999',
                            fontSize: '12px',
                            padding: '0.3rem 0'
                          }}>
                            +{post.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

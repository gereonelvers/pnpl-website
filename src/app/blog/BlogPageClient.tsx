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
        background: '#fff',
        color: '#0a0a0a'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          {/* Header */}
          <header style={{
            textAlign: 'center',
            paddingBottom: '4rem',
            borderBottom: '1px solid #eee',
            marginBottom: '3rem'
          }}>
            <h1 style={{
              fontSize: '48px',
              fontWeight: 300,
              marginBottom: '1rem',
              letterSpacing: '-0.02em',
              color: '#0a0a0a'
            }}>
              PNPL Blog
            </h1>
            <p style={{
              fontSize: '18px',
              color: '#666',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.6
            }}>
              Insights, research updates, and thoughts from the lab.
            </p>
          </header>

          {/* Tags Filter */}
          {tags && tags.length > 0 && (
            <div style={{
              marginBottom: '3rem',
              textAlign: 'center'
            }}>
              <div style={{
                display: 'inline-flex',
                gap: '0.5rem',
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}>
                <button
                  onClick={() => setSelectedTag('')}
                  style={{
                    padding: '0.5rem 1rem',
                    border: selectedTag === '' ? '2px solid #0a0a0a' : '1px solid #ddd',
                    background: selectedTag === '' ? '#0a0a0a' : '#fff',
                    color: selectedTag === '' ? '#fff' : '#666',
                    borderRadius: '20px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  All Posts
                </button>
                {tags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    style={{
                      padding: '0.5rem 1rem',
                      border: selectedTag === tag ? '2px solid #0a0a0a' : '1px solid #ddd',
                      background: selectedTag === tag ? '#0a0a0a' : '#fff',
                      color: selectedTag === tag ? '#fff' : '#666',
                      borderRadius: '20px',
                      fontSize: '14px',
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

          {/* Posts Grid */}
          {!filteredPosts || filteredPosts.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '4rem 0',
              color: '#666'
            }}>
              {selectedTag ? `No posts found with tag "${selectedTag}"` : 'No blog posts yet. Check back soon!'}
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
              gap: '2rem',
              marginBottom: '4rem'
            }}>
              {filteredPosts.map((post) => (
                <article
                  key={post.slug}
                  style={{
                    background: '#fff',
                    border: '1px solid #eee',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <div style={{ padding: '1.5rem' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        marginBottom: '1rem',
                        fontSize: '14px',
                        color: '#666'
                      }}>
                        <span>{format(new Date(post.date), 'MMM dd, yyyy')}</span>
                        <span>•</span>
                        <span>{post.readingTime} min read</span>
                        <span>•</span>
                        <span>{post.author}</span>
                      </div>
                      
                      <h2 style={{
                        fontSize: '20px',
                        fontWeight: 600,
                        marginBottom: '0.75rem',
                        lineHeight: 1.3,
                        color: '#333'
                      }}>
                        {post.title}
                      </h2>
                      
                      <p style={{
                        fontSize: '14px',
                        color: '#666',
                        lineHeight: 1.5,
                        marginBottom: '1rem'
                      }}>
                        {post.excerpt}
                      </p>
                      
                      {post.tags.length > 0 && (
                        <div style={{
                          display: 'flex',
                          gap: '0.5rem',
                          flexWrap: 'wrap'
                        }}>
                          {post.tags.map(tag => (
                            <span
                              key={tag}
                              style={{
                                background: '#f5f5f5',
                                color: '#0a0a0a',
                                padding: '0.25rem 0.5rem',
                                borderRadius: '12px',
                                fontSize: '12px',
                                fontWeight: 500,
                                border: '1px solid #ddd'
                              }}
                            >
                              {tag}
                            </span>
                          ))}
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

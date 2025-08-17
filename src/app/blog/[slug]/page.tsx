import Link from 'next/link';
import { format } from 'date-fns';
import { getPostBySlug } from '@/lib/blog';
import Navigation from '../../components/Navigation';
import Citations from '../../components/Citations';
import BlogDemo from '../../components/BlogDemo';
import TableOfContents from '../../components/TableOfContents';
import MathRenderer from '../../components/MathRenderer';
import Footer from '../../components/Footer';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Navigation />
      <main style={{ 
        paddingTop: '120px', 
        minHeight: '100vh',
        background: '#fff',
        color: '#0a0a0a'
      }}>
        {/* Table of Contents */}
        {post.toc && post.toc.length > 0 && (
          <TableOfContents items={post.toc} />
        )}

        <article style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 2rem',
          marginRight: post.toc && post.toc.length > 0 ? '380px' : 'auto',
          width: '100%',
          overflow: 'hidden'
        }}
        className="blog-article"
        >
          {/* Header */}
          <header style={{
            textAlign: 'center',
            marginBottom: '4rem',
            paddingBottom: '3rem',
            borderBottom: '2px solid #f0f0f0'
          }}>
            <h1 style={{
              fontSize: '56px',
              fontWeight: 200,
              marginBottom: '1.5rem',
              letterSpacing: '-0.03em',
              color: '#0a0a0a',
              lineHeight: 1.1
            }}>
              {post.title}
            </h1>
            <p style={{
              fontSize: '20px',
              color: '#666',
              fontWeight: 300,
              lineHeight: 1.5,
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              {post.excerpt}
            </p>
          </header>

          {/* Post Meta */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '3rem',
            padding: '1.5rem',
            background: '#f9f9f9',
            borderRadius: '12px',
            border: '1px solid #eee'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              fontSize: '14px',
              color: '#666'
            }}>
              <span>{format(new Date(post.date), 'MMMM dd, yyyy')}</span>
              <span>•</span>
              <span>{post.readingTime} min read</span>
              <span>•</span>
              <span>By {post.author}</span>
            </div>
            
            <Link
              href="/blog"
              style={{
                color: '#0a0a0a',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 500,
                border: '1px solid #ddd',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                transition: 'all 0.2s ease'
              }}
            >
              ← Back to Blog
            </Link>
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              flexWrap: 'wrap',
              marginBottom: '3rem'
            }}>
              {post.tags.map(tag => (
                <span
                  key={tag}
                  style={{
                    background: '#f5f5f5',
                    color: '#0a0a0a',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: 500,
                    border: '1px solid #ddd'
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Content */}
          <MathRenderer>
            <div 
              style={{
                fontSize: '16px',
                lineHeight: 1.7,
                color: '#333',
                marginBottom: '4rem'
              }}
              className="blog-content"
            >
              {post.content.includes('data-component="BlogDemo"') ? (
                <div>
                  <div dangerouslySetInnerHTML={{ 
                    __html: post.content.replace('<div data-component="BlogDemo"></div>', '<div id="blog-demo-placeholder"></div>') 
                  }} />
                  <BlogDemo />
                </div>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              )}
            </div>
          </MathRenderer>

          {/* Citations */}
          {post.citations && post.citations.length > 0 && (
            <Citations citations={post.citations} />
          )}

          {/* Navigation */}
          <div style={{
            marginTop: '4rem',
            paddingTop: '2rem',
            borderTop: '1px solid #eee',
            textAlign: 'center'
          }}>
            <Link
              href="/blog"
              style={{
                display: 'inline-block',
                background: '#0a0a0a',
                color: '#fff',
                padding: '1rem 2rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: 500,
                transition: 'all 0.2s ease'
              }}
            >
              Read More Posts
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

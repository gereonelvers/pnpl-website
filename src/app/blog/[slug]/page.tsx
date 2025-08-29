import { format } from 'date-fns';
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import Navigation from '../../components/Navigation';
import Citations from '../../components/Citations';
import BlogPostCitation from '../../components/BlogPostCitation';
import TableOfContents from '../../components/TableOfContents';
import MathRenderer from '../../components/MathRenderer';
import Footer from '../../components/Footer';
import { notFound } from 'next/navigation';

export const dynamic = 'error';
export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

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
              fontSize: 'clamp(24px, 6vw, 56px)',
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
              flexDirection: 'column',
              gap: '0.5rem',
              fontSize: '14px',
              color: '#666'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <span>{(() => {
                  try {
                    const date = new Date(post.date);
                    if (isNaN(date.getTime())) {
                      return post.date; // fallback to original string
                    }
                    return format(date, 'MMMM dd, yyyy');
                  } catch {
                    return post.date; // fallback to original string
                  }
                })()}</span>
                <span>•</span>
                <span>{post.readingTime} min read</span>
              </div>
              <span>By {post.author}</span>
            </div>
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
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
          </MathRenderer>

          {/* Self Citation */}
          {post.selfCitation && (
            <BlogPostCitation bibtex={post.selfCitation} />
          )}

          {/* Citations */}
          {post.citations && post.citations.length > 0 && (
            <Citations citations={post.citations} />
          )}

        </article>
      </main>
      <Footer />
    </>
  );
}

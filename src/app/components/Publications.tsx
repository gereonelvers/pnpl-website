'use client';

import React from 'react';

interface Publication {
  title: string;
  authors: string[];
  venue: string;
  year: number;
  doi?: string;
  arxiv?: string;
  description?: string;
  abstract?: string;
  featured?: boolean;
}

const publications: Publication[] = [
  {
    title: "The 2025 PNPL competition: Speech detection and phoneme classification in the LibriBrain dataset",
    authors: ["Gilad Landau", "Miran Özdogan", "Gereon Elvers", "Francesco Mantegna", "Pratik Somaiya", "Dulhan Jayalath", "Luisa Kurth", "Teyun Kwon", "Brendan Shillingford", "Greg Farquhar", "Minqi Jiang", "Karim Jerbi", "Hamza Abdelhedi", "Yorguin Mantilla Ramos", "Caglar Gulcehre", "Mark Woolrich", "Natalie Voets", "Oiwi Parker Jones"],
    venue: "NeurIPS 2025 Competition Track",
    year: 2025,
    arxiv: "2506.10165",
    description: "Competition framework for advancing speech decoding from non-invasive brain data using the LibriBrain dataset. Cite this for the LibriBrain competition.",
    abstract: "The advance of speech decoding from non-invasive brain data holds the potential for profound societal impact. Among its most promising applications is the restoration of communication to paralysed individuals affected by speech deficits such as dysarthria, without the need for high-risk surgical interventions. This competition provides a standardized framework for evaluating speech detection and phoneme classification methods using the LibriBrain dataset, fostering collaborative progress in the field.",
    featured: true
  },
  {
    title: "LibriBrain: Over 50 Hours of Within-Subject MEG to Improve Speech Decoding Methods at Scale",
    authors: ["Miran Özdogan", "Gilad Landau", "Gereon Elvers", "Dulhan Jayalath", "Pratik Somaiya", "Francesco Mantegna", "Mark Woolrich", "Oiwi Parker Jones"],
    venue: "arXiv preprint",
    year: 2025,
    arxiv: "2506.02098",
    description: "The largest single-subject MEG dataset to date for speech decoding, with over 50 hours of recordings. Cite this for the LibriBrain dataset.",
    abstract: "LibriBrain represents the largest single-subject MEG dataset to date for speech decoding, with over 50 hours of recordings. The dataset aims to support advances in neural decoding by providing high-quality MEG recordings with detailed annotations. This comprehensive resource enables researchers to develop and test sophisticated speech decoding algorithms at unprecedented scale, potentially accelerating progress in brain-computer interface technologies.",
    featured: true
  },
  {
    title: "Unlocking Non-Invasive Brain-to-Text",
    authors: ["Dulhan Jayalath", "Gilad Landau", "Oiwi Parker Jones"],
    venue: "arXiv preprint",
    year: 2025,
    arxiv: "2505.13446",
    description: "Advances in non-invasive brain-to-text technology with LLM-based rescoring and predictive in-filling approaches.",
    abstract: "The paper discusses advances in non-invasive brain-to-text (B2T) technology, highlighting three key contributions: extending word-classification models with LLM-based rescoring, introducing a predictive in-filling approach for out-of-vocabulary words, and demonstrating scalability of non-invasive B2T models across datasets. These developments represent significant progress toward practical brain-computer interfaces for communication.",
    featured: true
  },
  {
    title: "The Brain's Bitter Lesson: Scaling Speech Decoding With Self-Supervised Learning",
    authors: ["Dulhan Jayalath", "Gilad Landau", "Brendan Shillingford", "Mark Woolrich", "Oiwi Parker Jones"],
    venue: "ICML 2025",
    year: 2025,
    arxiv: "2406.04328",
    description: "Breakthrough in scaling speech decoding models across subjects using self-supervised learning techniques.",
    abstract: "The past few years have seen remarkable progress in the decoding of speech from brain activity, primarily driven by large single-subject datasets. However, due to individual variation in brain anatomy and physiology, these models typically do not generalize well across subjects. Here we show that self-supervised learning can be used to create speech decoding models that generalize across subjects and datasets. Using a combination of contrastive learning and masked language modeling on neural recordings from multiple subjects, we demonstrate significant improvements in cross-subject decoding performance. These advances unlock the potential for scaling speech decoding models beyond the current frontier.",
    featured: true
  }
];

export default function Publications() {
  const [expandedAbstract, setExpandedAbstract] = React.useState<number | null>(null);

  return (
    <section 
      id="publications"
      style={{
        minHeight: '100vh',
        padding: 'clamp(4rem, 8vw, 6rem) clamp(1rem, 4vw, 2rem)',
        background: 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)',
        borderTop: '1px solid #e5e5e5',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ marginBottom: 'clamp(3rem, 8vw, 5rem)', textAlign: 'center' as const }}>
          <div style={{ marginBottom: '1rem' }}>
            <span style={{ 
              fontSize: '12px', 
              letterSpacing: '0.15em', 
              textTransform: 'uppercase',
              color: '#666',
              fontWeight: 500 
            }}>
              Our work
            </span>
          </div>
          <h2 style={{ 
            fontSize: 'clamp(36px, 5vw, 56px)', 
            margin: 0, 
            lineHeight: 1.1,
            fontWeight: 200,
            letterSpacing: '-0.03em',
            marginBottom: '1.5rem'
          }}>
            Recent Publications
          </h2>
          <p style={{ 
            fontSize: '20px',
            color: '#555',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: 1.6,
            fontWeight: 300
          }}>
            Take a look at some of our recent work in the field of neural signal processing and brain-computer interfaces.
          </p>
        </div>

        <div style={{ display: 'grid', gap: '3rem' }}>
          {publications.map((pub, index) => (
            <div
              key={index}
              className="publication-card"
              style={{
                background: '#ffffff',
                border: '1px solid #e5e5e5',
                borderRadius: '2px',
                padding: 'clamp(1.5rem, 5vw, 3rem)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
                position: 'relative' as const,
                ...(pub.featured && {
                  border: '1px solid #ddd',
                  boxShadow: '0 8px 40px rgba(0, 0, 0, 0.12)',
                })
              }}
            >
              {pub.featured && (
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: '#000',
                  color: '#fff',
                  fontSize: '10px',
                  padding: '0.25rem 0.5rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase'
                }}>
                  Featured
                </div>
              )}
              
              <div style={{ 
                marginBottom: '1.5rem',
                marginTop: pub.featured ? '2.5rem' : '0'
              }}>
                <h3 style={{ 
                  fontSize: '24px', 
                  margin: 0,
                  lineHeight: 1.3,
                  fontWeight: 300,
                  letterSpacing: '-0.01em'
                }}>
                  {pub.title}
                </h3>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <span style={{ 
                  fontSize: '15px', 
                  color: '#666',
                  letterSpacing: '0.01em'
                }}>
                  {pub.authors.join(', ')}
                </span>
              </div>
              
              <div style={{ 
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(0.75rem, 2vw, 1.5rem)',
                flexWrap: 'wrap'
              }}>
                <span style={{ 
                  fontSize: '15px', 
                  fontWeight: 500,
                  color: '#444'
                }}>
                  {pub.venue} ({pub.year})
                </span>
                
                {pub.doi && (
                  <a
                    href={`https://doi.org/${pub.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="publication-link"
                    style={{
                      fontSize: 'clamp(10px, 2vw, 12px)',
                      color: '#000',
                      textDecoration: 'none',
                      border: '1px solid #000',
                      padding: 'clamp(0.3rem, 1vw, 0.4rem) clamp(0.6rem, 1.5vw, 0.8rem)',
                      transition: 'all 0.2s ease',
                      letterSpacing: '0.02em',
                      textTransform: 'uppercase'
                    }}
                  >
                    DOI
                  </a>
                )}
                
                {pub.arxiv && (
                  <a
                    href={`https://arxiv.org/abs/${pub.arxiv}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="publication-link"
                    style={{
                      fontSize: 'clamp(10px, 2vw, 12px)',
                      color: '#000',
                      textDecoration: 'none',
                      border: '1px solid #000',
                      padding: 'clamp(0.3rem, 1vw, 0.4rem) clamp(0.6rem, 1.5vw, 0.8rem)',
                      transition: 'all 0.2s ease',
                      letterSpacing: '0.02em',
                      textTransform: 'uppercase'
                    }}
                  >
                    arXiv
                  </a>
                )}
              </div>
              
              {pub.description && (
                <p style={{ 
                  fontSize: '16px', 
                  color: '#555',
                  margin: '0 0 1.5rem 0',
                  lineHeight: 1.6,
                  fontWeight: 300
                }}>
                  <span style={{ fontWeight: 600 }}>tl;dr:</span> {pub.description}
                </p>
              )}
              
              {pub.abstract && (
                <div>
                  <button
                    onClick={() => setExpandedAbstract(expandedAbstract === index ? null : index)}
                    style={{
                      background: 'none',
                      border: '1px solid #ccc',
                      padding: 'clamp(0.4rem, 1vw, 0.5rem) clamp(0.8rem, 2vw, 1rem)',
                      fontSize: 'clamp(10px, 2vw, 12px)',
                      color: '#666',
                      cursor: 'pointer',
                      letterSpacing: '0.02em',
                      textTransform: 'uppercase',
                      transition: 'all 0.2s ease',
                      marginBottom: '1rem'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#000';
                      e.currentTarget.style.color = '#000';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#ccc';
                      e.currentTarget.style.color = '#666';
                    }}
                  >
                    {expandedAbstract === index ? 'Hide Abstract' : 'Show Abstract'}
                  </button>
                  
                  {expandedAbstract === index && (
                    <div style={{
                      background: '#f8f8f8',
                      padding: 'clamp(1rem, 3vw, 2rem)',
                      border: '1px solid #eee',
                      marginTop: '0.5rem'
                    }}>
                      <h4 style={{
                        fontSize: '14px',
                        fontWeight: 500,
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        color: '#666',
                        margin: '0 0 1rem 0'
                      }}>
                        Abstract
                      </h4>
                      <p style={{
                        fontSize: '15px',
                        lineHeight: 1.7,
                        color: '#444',
                        margin: 0,
                        textAlign: 'justify' as const
                      }}>
                        {pub.abstract}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

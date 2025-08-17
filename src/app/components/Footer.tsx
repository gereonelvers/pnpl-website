'use client';

import Image from 'next/image';

export default function Footer() {
  return (
    <footer data-dark-section style={{
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
      color: '#fff',
      padding: 'clamp(2rem, 5vw, 3rem) clamp(1rem, 4vw, 2rem)',
      borderTop: '1px solid #333',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Subtle background pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.02) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.02) 0%, transparent 50%)',
        pointerEvents: 'none'
      }} />
      
      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Main footer content */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 'clamp(2rem, 5vw, 4rem)',
          marginBottom: 'clamp(2rem, 5vw, 4rem)'
        }}>
          {/* Lab info section */}
          <div>
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ 
                fontSize: 'clamp(20px, 4vw, 24px)', 
                margin: '0 0 1rem 0',
                fontWeight: 200,
                letterSpacing: '-0.02em'
              }}>
                PNPL 🍍
              </h3>
              <p style={{ 
                fontSize: 'clamp(14px, 3vw, 16px)', 
                opacity: 0.8,
                margin: '0 0 1.5rem 0',
                lineHeight: 1.6,
                fontWeight: 300
              }}>
                Parker Jones Neural Processing Lab
              </p>
              <p style={{ 
                fontSize: 'clamp(12px, 2.5vw, 14px)', 
                opacity: 0.6,
                margin: 0,
                lineHeight: 1.6
              }}>
                Oxford Robotics Institute <br/>
                University of Oxford <br/>
                23 Banbury Rd <br/>
                Oxford OX2 6NN
              </p>
            </div>
            
            <div style={{ marginBottom: '2rem' }}>
              <p style={{ 
                fontSize: '14px', 
                opacity: 0.7,
                margin: 0,
                lineHeight: 1.6,
                fontStyle: 'italic'
              }}>
              </p>
            </div>
          </div>
          
          {/* Contact and links */}
          <div>
            <h4 style={{ 
              fontSize: 'clamp(12px, 2.5vw, 14px)', 
              margin: '0 0 1.5rem 0',
              fontWeight: 500,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              opacity: 0.8
            }}>
              Connect
            </h4>
            <div style={{ 
              display: 'grid',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              <a
                href="mailto:oiwi@robots.ox.ac.uk"
                className="footer-link"
                style={{
                  fontSize: 'clamp(12px, 2.5vw, 14px)',
                  color: '#fff',
                  textDecoration: 'none',
                  opacity: 0.7,
                  transition: 'all 0.3s ease',
                  display: 'block'
                }}
              >
                oiwi@robots.ox.ac.uk
              </a>
              <a
                href="https://ori.ox.ac.uk/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
                style={{
                  fontSize: 'clamp(12px, 2.5vw, 14px)',
                  color: '#fff',
                  textDecoration: 'none',
                  opacity: 0.7,
                  transition: 'all 0.3s ease',
                  display: 'block'
                }}
              >
                Oxford Robotics Institute →
              </a>
              <a
                href="https://eng.ox.ac.uk/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
                style={{
                  fontSize: 'clamp(12px, 2.5vw, 14px)',
                  color: '#fff',
                  textDecoration: 'none',
                  opacity: 0.7,
                  transition: 'all 0.3s ease',
                  display: 'block'
                }}
              >
                Department of Engineering Science →
              </a>
              <a
                href="http://ox.ac.uk/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
                style={{
                  fontSize: 'clamp(12px, 2.5vw, 14px)',
                  color: '#fff',
                  textDecoration: 'none',
                  opacity: 0.7,
                  transition: 'all 0.3s ease',
                  display: 'block'
                }}
              >
                University of Oxford →
              </a>
            </div>
          </div>
          
          <div>
            <div style={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
              alignItems: 'center'
            }}>
              <a
                href="https://ori.ox.ac.uk/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  opacity: 0.8,
                  transition: 'opacity 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
              >
                <Image
                  src="/ori-logo.png"
                  alt="Oxford Robotics Institute"
                  width={160}
                  height={60}
                  style={{
                    objectFit: 'contain'
                  }}
                />
              </a>
              <a
                href="https://www.ox.ac.uk/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  opacity: 0.8,
                  transition: 'opacity 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
              >
                <Image
                  src="/oxford-logo.png"
                  alt="University of Oxford"
                  width={340}
                  height={100}
                  style={{
                    objectFit: 'contain'
                  }}
                />
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid #333',
          paddingTop: 'clamp(1rem, 3vw, 2rem)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <p style={{ 
            fontSize: 'clamp(10px, 2vw, 12px)', 
            opacity: 0.4,
            margin: 0,
            letterSpacing: '0.02em'
          }}>
            © 2025 Parker Jones Neural Processing Lab. All rights reserved.
          </p>
          <p style={{ 
            fontSize: 'clamp(10px, 2vw, 12px)', 
            opacity: 0.4,
            margin: 0,
            letterSpacing: '0.02em'
          }}>
            aloha 🌺 from Oxford!
          </p>
        </div>
      </div>
    </footer>
  );
}
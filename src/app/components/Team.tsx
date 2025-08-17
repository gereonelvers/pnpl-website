'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

interface TeamMember {
  name: string;
  title: string;
  bio: string;
  email?: string;
  website?: string;
  twitter?: string;
  interests: string[];
  image?: string;
  featured?: boolean;
}

const teamMembers: TeamMember[] = [
  {
    name: "Oiwi Parker Jones",
    title: "Principal Investigator",
    bio: "Oiwi leads the Parker Jones Neural Processing Lab (PNPL) at the University of Oxford. His aim is to build bridges between deep learning and the brain, for example by accelerating the development of Brain Computer Interfaces (BCIs), but also by developing deep learning methods for interpreting brain data and leveraging principles of systems neuroscience to inform machine learning. Oiwi completed a DPhil focused on Natural Language Processing (NLP) for low-resource languages. He further trained as a postdoc in Imaging Neuroscience at UCL and Oxford, and in Applied Artificial Intelligence at the ORI. He was previously a lecturer in Medicine at St Peter's College, Oxford, and is currently Hugh Price Fellow in Computer Science at Jesus College, Oxford.",
    email: "oiwi@robots.ox.ac.uk",
    website: "https://ori.ox.ac.uk/people/oiwi-parker-jones/",
    twitter: "@oiwi3000",
    interests: ["Neural Decoding", "Brain-Computer Interfaces", "Deep Learning", "Computational Neuroscience"],
    image: "/team/oiwi.png"
  },
  {
    name: "Francesco Mantegna",
    title: "Postdoctoral Research Fellow",
    bio: "Francesco joined PNPL as a Postdoc in 2024 after receiving his PhD in Cognitive Psychology and Neuroscience from NYU under the supervision of David Poeppel. His interests include Brain Computer Interfaces (BCIs), Neurotechnology, and Speech Neuroprosthetics.",
    interests: ["Brain Computer Interfaces", "Neurotechnology", "Speech Neuroprosthetics", "Cognitive Psychology"],
    image: "/team/francesco.png"
  },
  {
    name: "Pratik Somaiya",
    title: "Software Engineer",
    bio: "Pratik joined the Oxford Robotics Institute (ORI) in May 2023 as a Robotics Software Engineer. Before that, he pursued an MSc by Research in Robotics at the Lincoln Centre for Autonomous Systems Research (L-CAS), University of Lincoln, UK. Prior to his Master's, he was a Research Assistant at L-CAS working in agri-robotics. Pratik also spent several years in the industry before joining L-CAS. During that time, he worked on developing robots for warehouse material handling and consumer robots such as vacuum cleaning robots.",
    website: "https://pratiksomaiya.in",
    twitter: "@I_m_PRS",
    interests: ["Robotics Software Engineering", "Agri-robotics", "Warehouse Automation", "Consumer Robotics"],
    image: "/team/pratik.jpg"
  },
  {
    name: "Dulhan Jayalath",
    title: "DPhil/PhD Student",
    bio: "Dulhan is a DPhil student in the Autonomous Intelligent Machines and Systems (AIMS) CDT. At PNPL, his work focuses on leveraging deep learning to find efficient representations of brain signals for downstream tasks (e.g. phoneme recognition from heard speech brain data). Prior to joining PNPL, he worked on multi-agent RL and reasoning with graph neural networks at the University of Cambridge. Before this, he completed his BSc in Computer Science at the University of Southampton, where he researched computer vision systems for visual navigation. He has worked on large language models at Speechmatics and developing assembly-level machine learning kernels for new hardware at Arm.",
    website: "https://dulhanjayalath.com",
    twitter: "@dulhanjay",
    interests: ["Deep Learning", "Brain Signal Processing", "Multi-agent RL", "Computer Vision"],
    image: "/team/dulhan.png"
  },
  {
    name: "Gilad D. Landau",
    title: "DPhil/PhD Student",
    bio: "Gilad is a D.Phil student currently working on decoding semantic content from the brain with AI. He is motivated by the prospect of merging brains with AI to deepen our understanding of both. His academic background is in Philosophy of Cognitive Science, where he applied a multi-disciplinary approach to explore how brains process representations. Prior to joining PNPL he worked as an applied AI researcher, developing industry-first AI systems in several domains and modalities.",
    interests: ["Semantic Decoding", "Philosophy of Cognitive Science", "Applied AI", "Neural Representations"],
    image: "/team/gilad.png"
  },
  {
    name: "Luisa Kurth",
    title: "DPhil/PhD Student",
    bio: "My motivation is to help improving people's lives through AI. Currently, I am mostly interested in the challenges of advancing machine learning for medical image analysis. The CDT in AIMS offers the perfect platform for this journey and I'm excited to connect with anyone sharing my interest. I hold a Bachelor's degree in Psychology from the University of Mannheim and a Master's degree from the University of Oxford's Internet Institute. During my time at Oxford, I participated in cutting-edge research on the societal and ethical aspects of AI. This experience fueled my fascination for machine learning, leading me to pursue a second Master's degree at the University of Tübingen, where I focused on the foundations of deep learning, large language models and explainable AI. Along the way, I've conducted brain research at the Max-Planck-Institute and worked as a policy researcher at the OECD. Outside of research, I enjoy reading, socializing with friends, and visiting art galleries.",
    interests: ["Medical Image Analysis", "Deep Learning", "Explainable AI", "AI Ethics"],
    image: "/team/luisa.jpg"
  },
  {
    name: "Miran Özdogan",
    title: "DPhil/PhD Student",
    bio: "Miran's work in PNPL has recently focused on the role of sequence models, such as state space models (e.g. S4 and Mamba) for BCIs. He is also working to establish new benchmarks and standards for neural decoding, in order to quantify and accelerate progress in the field.",
    interests: ["State Space Models", "Brain Computer Interfaces", "Neural Decoding", "Benchmarking"],
    image: "/team/miran.png"
  },
  {
    name: "John Kwon",
    title: "DPhil/PhD Student",
    bio: "To be added",
    interests: ["TODO"],
    image: "/team/john.jpeg"
  },
  {
    name: "Gereon Elvers",
    title: "Visiting Master's Student",
    bio: "Gereon is a Master's student from TU Munich. After initially joining PNPL remotely, he is currently visiting the lab in-person for six months. Besides working on the LibriBrain competition, he is working on the first practical applications of non-invasive speech decoding.",
    interests: ["TODO"],
    image: "/team/gereon.png"
  }
];

export default function Team() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layoutMasonry = () => {
      if (containerRef.current && window.innerWidth > 768) {
        const items = Array.from(containerRef.current.children) as HTMLElement[];
        const gap = 48; // 3rem
        const containerWidth = containerRef.current.offsetWidth;
        const itemWidth = (containerWidth - gap) / 2;
        
        let leftHeight = 0;
        let rightHeight = 0;
        
        items.forEach((item, index) => {
          item.style.position = 'absolute';
          item.style.width = `${itemWidth}px`;
          
          if (leftHeight <= rightHeight) {
            item.style.left = '0px';
            item.style.top = `${leftHeight}px`;
            leftHeight += item.offsetHeight + gap;
          } else {
            item.style.left = `${itemWidth + gap}px`;
            item.style.top = `${rightHeight}px`;
            rightHeight += item.offsetHeight + gap;
          }
        });
        
        containerRef.current.style.height = `${Math.max(leftHeight, rightHeight)}px`;
      } else if (containerRef.current) {
        // Reset styles for mobile
        const items = Array.from(containerRef.current.children) as HTMLElement[];
        items.forEach((item) => {
          item.style.position = 'static';
          item.style.width = '100%';
          item.style.left = 'auto';
          item.style.top = 'auto';
        });
        containerRef.current.style.height = 'auto';
      }
    };

    // Initial layout
    setTimeout(layoutMasonry, 100);
    
    const resizeObserver = new ResizeObserver(layoutMasonry);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <section 
      id="team"
      style={{
        minHeight: '100vh',
        padding: '6rem 2rem',
        background: 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)',
        borderTop: '1px solid #e5e5e5',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ marginBottom: '5rem', textAlign: 'center' as const }}>
          <div style={{ marginBottom: '1rem' }}>
            <span style={{ 
              fontSize: '12px', 
              letterSpacing: '0.15em', 
              textTransform: 'uppercase',
              color: '#666',
              fontWeight: 500 
            }}>
              Meet the group
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
            Team
          </h2>
          <p style={{ 
            fontSize: '20px',
            color: '#555',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: 1.6,
            fontWeight: 300
          }}>
            A multidisciplinary team of researchers, engineers, and students advancing the frontiers of neural processing and brain-computer interfaces.
          </p>
        </div>

        <div 
          ref={containerRef}
          style={{ 
            position: 'relative',
            width: '100%'
          }}
        >
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="team-card"
              style={{
                background: '#ffffff',
                border: '1px solid #e5e5e5',
                borderRadius: '12px',
                padding: '0',
                height: 'fit-content',
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                position: 'relative' as const,
                transition: 'all 0.3s ease',
                ...(member.featured && {
                  border: '2px solid #000',
                  boxShadow: '0 12px 48px rgba(0, 0, 0, 0.15)',
                })
              }}
            >
              {member.featured && (
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: '#000',
                  color: '#fff',
                  fontSize: '10px',
                  padding: '0.25rem 0.5rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  zIndex: 2
                }}>
                  Lead
                </div>
              )}
              
              <div style={{ display: 'flex', gap: '2rem', padding: '2.5rem' }}>
                {/* Image Section */}
                {member.image && (
                  <div style={{
                    width: '120px',
                    height: '120px',
                    background: '#f0f0f0',
                    position: 'relative',
                    overflow: 'hidden',
                    flexShrink: 0,
                    borderRadius: '8px'
                  }}>
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      style={{
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease, filter 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.filter = 'brightness(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.filter = 'brightness(1)';
                      }}
                    />
                  </div>
                )}
                
                {/* Content Section */}
                <div style={{ flex: 1 }}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{ 
                    fontSize: '22px', 
                    margin: 0,
                    lineHeight: 1.2,
                    fontWeight: 300,
                    letterSpacing: '-0.01em'
                  }}>
                    {member.name}
                  </h3>
                  <p style={{ 
                    fontSize: '14px', 
                    margin: '0.5rem 0 0 0',
                    color: '#666',
                    fontWeight: 500,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase'
                  }}>
                    {member.title}
                  </p>
                </div>
                
                <p style={{ 
                  fontSize: '15px', 
                  lineHeight: 1.6,
                  margin: '0 0 2rem 0',
                  color: '#555',
                  fontWeight: 300
                }}>
                  {member.bio}
                </p>
                
                <div style={{ marginBottom: '2rem' }}>
                  <h4 style={{ 
                    fontSize: '12px', 
                    margin: '0 0 1rem 0',
                    color: '#666',
                    fontWeight: 500,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase'
                  }}>
                    Research Interests
                  </h4>
                  <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: '0.5rem'
                  }}>
                    {member.interests.map((interest, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '12px',
                          background: '#f8f8f8',
                          border: '1px solid #e5e5e5',
                          borderRadius: '6px',
                          padding: '0.4rem 0.8rem',
                          color: '#666',
                          letterSpacing: '0.01em'
                        }}
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  gap: '1rem',
                  flexWrap: 'wrap'
                }}>
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="team-link"
                      style={{
                        fontSize: '12px',
                        color: '#000',
                        textDecoration: 'none',
                        border: '1px solid #000',
                        borderRadius: '6px',
                        padding: '0.5rem 1rem',
                        transition: 'all 0.2s ease',
                        letterSpacing: '0.02em',
                        textTransform: 'uppercase'
                      }}
                    >
                      Email
                    </a>
                  )}
                  
                  {member.website && (
                    <a
                      href={member.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="team-link"
                      style={{
                        fontSize: '12px',
                        color: '#000',
                        textDecoration: 'none',
                        border: '1px solid #000',
                        borderRadius: '6px',
                        padding: '0.5rem 1rem',
                        transition: 'all 0.2s ease',
                        letterSpacing: '0.02em',
                        textTransform: 'uppercase'
                      }}
                    >
                      Website
                    </a>
                  )}
                  
                  {member.twitter && (
                    <a
                      href={`https://twitter.com/${member.twitter.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="team-link"
                      style={{
                        fontSize: '12px',
                        color: '#000',
                        textDecoration: 'none',
                        border: '1px solid #000',
                        borderRadius: '6px',
                        padding: '0.5rem 1rem',
                        transition: 'all 0.2s ease',
                        letterSpacing: '0.02em',
                        textTransform: 'uppercase'
                      }}
                    >
                      Twitter
                    </a>
                  )}
                </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

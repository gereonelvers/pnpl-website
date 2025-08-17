export default function GetInTouch() {
  return (
    <section id="get-in-touch" style={{
      padding: 'clamp(4rem, 8vw, 6rem) clamp(1rem, 4vw, 2rem)',
      background: '#f9f9f9',
      borderTop: '1px solid #eee'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: 'clamp(28px, 6vw, 36px)',
          fontWeight: 300,
          marginBottom: '1.5rem',
          letterSpacing: '-0.02em',
          color: '#0a0a0a'
        }}>
          Get in Touch
        </h2>
        
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          fontSize: 'clamp(16px, 3vw, 18px)',
          lineHeight: 1.7,
          color: '#444',
          marginBottom: 'clamp(2rem, 5vw, 3rem)'
        }}>
          <p style={{ marginBottom: '2rem' }}>
            <strong>Potential doctoral candidates</strong> are encouraged to apply both to the{' '}
            <a
              href="https://www.ox.ac.uk/admissions/graduate/courses/dphil-engineering-science"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#0a0a0a',
                textDecoration: 'underline',
                fontWeight: 500
              }}
            >
              Department of Engineering Science
            </a>
            {' '}and to the{' '}
            <a
              href="https://aims.robots.ox.ac.uk/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#0a0a0a',
                textDecoration: 'underline',
                fontWeight: 500
              }}
            >
              AIMS programme
            </a>
            .
          </p>
          
          <p>
            <strong>Potential collaborators</strong> are encouraged to reach out directly to the PI,{' '}
            <a
              href="https://www.ori.ox.ac.uk/people/oiwi-parker-jones/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#0a0a0a',
                textDecoration: 'underline',
                fontWeight: 500
              }}
            >
              Oiwi Parker Jones
            </a>
            .
          </p>
        </div>

      </div>
    </section>
  );
}
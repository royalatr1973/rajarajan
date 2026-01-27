import ImagePlaceholder from './ImagePlaceholder'

function About() {
  return (
    <section id="about">
      <div className="container">
        <div className="section-header">
          <h2>Profile</h2>
        </div>
        <div className="about-content">
          <div className="about-main">
            <div className="about-intro">
              <div className="about-photo">
                <ImagePlaceholder
                  id="IMG-002"
                  label="About Photo"
                  description="Professional or working photo"
                />
              </div>
              <div className="about-text">
                <h3>Background</h3>
                <p>
                  With a foundation in Computer Science Engineering from Sri Venkateswara College of Engineering,
                  I have developed analytical capabilities through technical training while gaining exposure to
                  business problems through entrepreneurial initiatives and industry internships.
                </p>

                <h3>Motivation for Management Education</h3>
                <p>
                  My experiences leading a college venture, building a legal-technology product, and analyzing
                  market dynamics at Ashok Leyland have clarified the need for structured management training.
                  A Master in Management programme will address gaps in strategic thinking, cross-functional
                  management, and international business exposure.
                </p>

                <h3>Career Direction</h3>
                <p>
                  I am oriented toward roles in Product Management, Business Analytics, Strategy, or General
                  Management. My focus is on building operational competence across functions rather than
                  specializing early in consulting.
                </p>
              </div>
            </div>
          </div>

          <aside className="why-europe">
            <div className="why-europe-header">
              <div className="why-europe-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <h3>Why Europe</h3>
            </div>
            <ul>
              <li>Multicultural learning environment with diverse cohort perspectives</li>
              <li>Structured management education with strong academic rigour</li>
              <li>International exposure across multiple business contexts</li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default About

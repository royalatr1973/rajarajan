function Hero() {
  const scrollToAbout = (e) => {
    e.preventDefault()
    const element = document.getElementById('about')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="hero">
      <div className="hero-inner">
        <div className="hero-image">
          <div className="img-placeholder has-image">
            <img src="/images/img-001-profile.jpg" alt="Pooja T S R - Professional Photo" />
          </div>
        </div>
        <div className="hero-content">
          <p className="hero-subtitle">Master in Management Candidate</p>
          <h1 className="hero-name">Pooja T S R</h1>
          <p className="hero-tagline">
            Early-career professional bridging technology, analytics, and business decision-making.
          </p>
          <div className="hero-cta">
            <a
              href="/documents/Pooja_TSR_Resume.pdf"
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download CV (PDF)
            </a>
            <a href="#about" className="btn btn-secondary" onClick={scrollToAbout}>
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

function Contact() {
  return (
    <section id="contact">
      <div className="container">
        <div className="section-header">
          <h2>Contact</h2>
        </div>

        <div className="contact-content">
          <p>
            I welcome the opportunity to discuss my background and interest in management education.
          </p>

          <div className="contact-methods">
            <div className="contact-item">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <a href="mailto:pooja.tsr@email.com">pooja.tsr@email.com</a>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <span>Chennai, India</span>
            </div>
          </div>

          <div className="contact-cta">
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
              Download Resume (PDF)
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact

function Awards({ openModal }) {
  const awards = [
    {
      title: 'Outstanding NSS Volunteer Award',
      description: 'Recognition for service and leadership in National Service Scheme',
      proofContent: {
        title: 'Outstanding NSS Volunteer Award',
        description: 'Certificate of recognition for outstanding contribution to NSS activities. Document will be linked here.',
      },
    },
    {
      title: 'ISTE Best Student Award',
      description: 'Indian Society for Technical Education recognition',
      proofContent: {
        title: 'ISTE Best Student Award',
        description: 'Certificate from ISTE. Document will be linked here.',
      },
    },
    {
      title: 'NSS Debate Winner',
      description: 'First place in inter-college NSS debate competition',
      proofContent: {
        title: 'NSS Debate Winner',
        description: 'Certificate of first place. Document will be linked here.',
      },
    },
    {
      title: 'Verbattle Winner',
      description: 'Inter-college debate and public speaking competition',
      proofContent: {
        title: 'Verbattle Winner',
        description: 'Certificate of participation and winning. Document will be linked here.',
      },
    },
    {
      title: 'Battle of Wits Winner',
      description: 'Collegiate-level competitive speaking event',
      proofContent: {
        title: 'Battle of Wits Winner',
        description: 'Certificate of winning. Document will be linked here.',
      },
    },
  ]

  return (
    <section id="awards">
      <div className="container">
        <div className="section-header">
          <h2>Awards & Recognition</h2>
        </div>

        <div className="awards-grid">
          {awards.map((award, index) => (
            <div key={index} className="award-item">
              <div className="award-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="8" r="6" />
                  <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
                </svg>
              </div>
              <div className="award-content">
                <h4>{award.title}</h4>
                <p>{award.description}</p>
                {award.proofContent && (
                  <button
                    className="btn btn-link award-link"
                    onClick={() => openModal(award.proofContent)}
                  >
                    View Certificate →
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Awards

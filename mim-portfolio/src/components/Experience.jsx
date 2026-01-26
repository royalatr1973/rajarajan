function Experience({ openModal }) {
  const experiences = [
    {
      title: 'Business & Product Strategy',
      role: 'Founder',
      organization: 'Legal Pro AI',
      date: '2025',
      context: 'Conceptualized and developed a legal-technology platform for case-law research.',
      actions: [
        'Defined product requirements and user flows for legal research workflows',
        'Coordinated with a distributed technical team for platform development',
        'Collected structured feedback from practicing advocates to iterate on features',
        'Managed product roadmap through pilot stage deployment',
      ],
      outcomes: [
        'Processed 1 lakh+ queries within six months of pilot launch',
        'Gathered feedback from approximately 5 practicing advocates',
        'Received and evaluated a ₹3 lakh acquisition offer (declined to continue development)',
      ],
      metrics: [
        { label: 'Queries Processed', value: '1 Lakh+' },
        { label: 'Pilot Duration', value: '6 Months' },
        { label: 'Advocate Feedback', value: '~5' },
      ],
      proofLabel: 'View Platform',
      proofContent: {
        title: 'Legal Pro AI',
        description: 'A legal-technology platform designed for case-law research. The platform is currently in pilot stage. Certificate or demo link will be added here.',
      },
    },
    {
      title: 'Student Entrepreneur',
      role: 'Co-founder',
      organization: 'AAVIN (College Initiative)',
      date: '2023 – 2025',
      context: 'Co-led a student venture selected as the sole entrepreneurship initiative at the college.',
      actions: [
        'Led a 4-member founding team through ideation to operations',
        'Invested ₹30,000 as seed capital and managed financial planning',
        'Handled pricing strategy, supplier sourcing, and marketing',
        'Managed 1 full-time employee and day-to-day operations',
      ],
      outcomes: [
        'Generated approximately ₹2.5 lakh net profit over 18 months',
        'Scaled operations until paused due to lead-time constraints despite continued demand',
      ],
      metrics: [
        { label: 'Net Profit', value: '~₹2.5L' },
        { label: 'Duration', value: '18 Months' },
        { label: 'Team Size', value: '4+1' },
        { label: 'Seed Capital', value: '₹30K' },
      ],
      proofLabel: 'View Details',
      proofContent: {
        title: 'AAVIN Student Venture',
        description: 'A college-based entrepreneurship initiative. Documentation and financial records available upon request.',
      },
    },
    {
      title: 'Market & Digital Analytics Intern',
      role: 'Intern',
      organization: 'Ashok Leyland',
      date: '2024',
      context: 'Gained exposure to marketing analytics and competitive positioning in the automotive sector.',
      actions: [
        'Conducted competitive analysis across product segments',
        'Analyzed digital engagement metrics including CTR and bounce rates',
        'Contributed to marketing positioning discussions based on data insights',
      ],
      outcomes: [
        'Developed understanding of data-driven marketing decision-making',
        'Exposure to enterprise-scale digital analytics practices',
      ],
      metrics: [],
      proofLabel: 'View Certificate',
      proofContent: {
        title: 'Ashok Leyland Internship',
        description: 'Internship certificate will be added here. Summer 2024.',
      },
    },
  ]

  return (
    <section id="experience">
      <div className="container">
        <div className="section-header">
          <h2>Experience & Projects</h2>
          <p className="section-subtitle">
            Initiatives demonstrating product thinking, operational execution, and analytical exposure
          </p>
        </div>

        {experiences.map((exp, index) => (
          <article key={index} className="experience-item">
            <div className="experience-header">
              <div>
                <h3>{exp.title}</h3>
                <p className="experience-org">{exp.role} | {exp.organization}</p>
              </div>
              <span className="experience-date">{exp.date}</span>
            </div>

            <p className="experience-context">{exp.context}</p>

            <div className="experience-actions">
              <ul>
                {exp.actions.map((action, i) => (
                  <li key={i}>{action}</li>
                ))}
              </ul>
            </div>

            {exp.outcomes.length > 0 && (
              <div className="experience-outcomes">
                <ul>
                  {exp.outcomes.map((outcome, i) => (
                    <li key={i}>{outcome}</li>
                  ))}
                </ul>
              </div>
            )}

            {exp.metrics.length > 0 && (
              <div className="experience-metrics">
                {exp.metrics.map((metric, i) => (
                  <span key={i} className="metric">
                    <strong>{metric.value}</strong> {metric.label}
                  </span>
                ))}
              </div>
            )}

            {exp.proofContent && (
              <button
                className="btn btn-link"
                onClick={() => openModal(exp.proofContent)}
              >
                {exp.proofLabel} →
              </button>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}

export default Experience

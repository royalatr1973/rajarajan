import ImagePlaceholder from './ImagePlaceholder'

function Leadership({ openModal }) {
  const leadershipRoles = [
    {
      imageId: 'IMG-006',
      imageLabel: 'NSS Activities',
      imageDesc: 'Community service or volunteer photo',
      title: 'National Service Scheme',
      role: 'Lead Volunteer | 2022 – 2024',
      description:
        'Officially designated as Lead Volunteer, coordinating community engagement activities across education, safety, health, and environmental initiatives.',
      stats: [
        { value: '~200', label: 'Volunteers Led' },
        { value: '2 Years', label: 'Duration' },
      ],
      proofContent: {
        title: 'NSS Lead Volunteer',
        description: 'Official designation as Lead Volunteer. Certificate of Outstanding NSS Volunteer Award available.',
      },
    },
    {
      imageId: 'IMG-007',
      imageLabel: 'Speakers Forum',
      imageDesc: 'Mentoring or public speaking photo',
      title: 'Speakers Forum',
      role: 'Student Mentor | 2022 – 2025',
      description:
        'Mentored students in English communication and public speaking. Designed a specialized programme for Tamil-medium government school students. Several mentees progressed to become peer mentors.',
      stats: [
        { value: '30', label: 'Students Mentored' },
        { value: '3', label: 'Batches' },
      ],
      proofContent: {
        title: 'Speakers Forum Mentorship',
        description: 'Mentorship programme documentation and participant testimonials available upon request.',
      },
    },
    {
      imageId: 'IMG-008',
      imageLabel: 'AAVIN Team',
      imageDesc: 'Team or business operations photo',
      title: 'AAVIN Venture',
      role: 'Co-founder & Team Lead | 2023 – 2025',
      description:
        'Led a 4-member founding team for a college-based entrepreneurial venture. Sole selected initiative from the college. Managed end-to-end operations including hiring, finance, and supplier relations.',
      stats: [
        { value: '4', label: 'Team Members' },
        { value: '1', label: 'Employee Managed' },
      ],
      proofContent: {
        title: 'AAVIN Leadership',
        description: 'Financial records and team structure documentation available upon request.',
      },
    },
    {
      imageId: 'IMG-009',
      imageLabel: 'Legal Pro AI',
      imageDesc: 'Product or technology visual',
      title: 'Legal Pro AI',
      role: 'Founder | 2025',
      description:
        'Founded and led product development for a legal-technology platform. Coordinated distributed technical team while managing stakeholder feedback and product direction.',
      stats: [
        { value: '1 Lakh+', label: 'Queries' },
        { value: '~5', label: 'Advocates Consulted' },
      ],
      proofContent: {
        title: 'Legal Pro AI Leadership',
        description: 'Product documentation and stakeholder feedback records available upon request.',
      },
    },
  ]

  return (
    <section id="leadership">
      <div className="container">
        <div className="section-header">
          <h2>Leadership & Impact</h2>
          <p className="section-subtitle">
            Roles demonstrating responsibility, scale, and structured initiative
          </p>
        </div>

        <div className="leadership-grid">
          {leadershipRoles.map((role, index) => (
            <article key={index} className="leadership-card">
              <div className="leadership-image">
                <ImagePlaceholder
                  id={role.imageId}
                  label={role.imageLabel}
                  description={role.imageDesc}
                />
              </div>
              <div className="leadership-content">
                <h3>{role.title}</h3>
                <p className="leadership-role">{role.role}</p>
                <p>{role.description}</p>

                {role.stats.length > 0 && (
                  <div className="leadership-stats">
                    {role.stats.map((stat, i) => (
                      <div key={i} className="stat">
                        <span className="stat-value">{stat.value}</span>
                        <span className="stat-label">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                {role.proofContent && (
                  <button
                    className="btn btn-link"
                    onClick={() => openModal(role.proofContent)}
                  >
                    View Proof →
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Leadership

function Skills() {
  const skillCategories = [
    {
      title: 'Management & Strategy',
      skills: [
        'Leadership',
        'Strategic Thinking',
        'Negotiation',
        'Corporate Strategy',
      ],
    },
    {
      title: 'Analytics & Technical',
      skills: [
        'Data Analysis Basics',
        'Dashboard Development',
        'AI/ML Conceptual Understanding',
      ],
    },
    {
      title: 'Communication',
      skills: [
        'Public Speaking',
        'Mentoring',
        'English (Fluent)',
        'Tamil (Native)',
      ],
    },
  ]

  return (
    <section id="skills">
      <div className="container">
        <div className="section-header">
          <h2>Skills</h2>
        </div>

        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-category">
              <h3>{category.title}</h3>
              <ul className="skill-list">
                {category.skills.map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills

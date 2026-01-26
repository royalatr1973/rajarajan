function Academic() {
  return (
    <section id="academic">
      <div className="container">
        <div className="section-header">
          <h2>Academic & Test Profile</h2>
        </div>

        <div className="academic-content">
          {/* Test Score Highlight */}
          <div className="academic-highlight mb-xl">
            <h3>Management Aptitude</h3>
            <div className="score">98.9</div>
            <p className="score-sub">XAT 2026 Percentile</p>
          </div>

          {/* Higher Education */}
          <div className="academic-table">
            <table>
              <thead>
                <tr>
                  <th>Qualification</th>
                  <th>Institution</th>
                  <th>Year</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>B.E. Computer Science Engineering</td>
                  <td>Sri Venkateswara College of Engineering (SVCE)</td>
                  <td>2025</td>
                  <td>CGPA 8.3 / 10</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* School Education - Downplayed */}
          <div className="academic-table">
            <table>
              <thead>
                <tr>
                  <th colSpan="4" style={{ fontWeight: 400, color: 'var(--color-text-light)' }}>
                    School Education
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Class XII (CBSE)</td>
                  <td>P.S. Senior Secondary School</td>
                  <td>2021</td>
                  <td>—</td>
                </tr>
                <tr>
                  <td>Class X (CBSE)</td>
                  <td>P.S. Senior Secondary School</td>
                  <td>2019</td>
                  <td>—</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="school-note">
            School-level academics provided for completeness; emphasis is on undergraduate and test performance.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Academic

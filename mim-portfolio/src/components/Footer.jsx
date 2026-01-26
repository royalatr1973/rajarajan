function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <p>Pooja T S R | Master in Management Candidate | {currentYear}</p>
      </div>
    </footer>
  )
}

export default Footer

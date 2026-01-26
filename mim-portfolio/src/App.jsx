import { useState, useEffect } from 'react'
import './App.css'

// Components
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Leadership from './components/Leadership'
import Academic from './components/Academic'
import Skills from './components/Skills'
import Awards from './components/Awards'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Modal from './components/Modal'

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [modalContent, setModalContent] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'leadership', 'academic', 'skills', 'awards', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const openModal = (content) => {
    setModalContent(content)
  }

  const closeModal = () => {
    setModalContent(null)
  }

  return (
    <>
      <Navbar activeSection={activeSection} />
      <main>
        <Hero />
        <About />
        <Experience openModal={openModal} />
        <Leadership openModal={openModal} />
        <Academic />
        <Skills />
        <Awards openModal={openModal} />
        <Contact />
      </main>
      <Footer />
      {modalContent && <Modal content={modalContent} onClose={closeModal} />}
    </>
  )
}

export default App

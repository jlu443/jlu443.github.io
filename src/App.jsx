import { HashRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar.jsx'
import Hero from './components/Hero/Hero.jsx'
import Projects from './components/Projects/Projects.jsx'
import Skills from './components/Skills/Skills.jsx'
import Experience from './components/Experience/Experience.jsx'
import Publications from './components/Publications/Publications.jsx'
import Writeups from './components/Writeups/Writeups.jsx'
import Blog from './components/Blog/Blog.jsx'
import Contact from './components/Contact/Contact.jsx'
import Footer from './components/Footer/Footer.jsx'
import WriteupPage from './components/Writeups/WriteupPage.jsx'
import BlogPost from './components/Blog/BlogPost.jsx'
import styles from './App.module.css'

function MainPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <Hero />
        <Projects />
        <Skills />
        <Experience />
        <Publications />
        <Writeups />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/writeups/:slug" element={<WriteupPage />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </HashRouter>
  )
}

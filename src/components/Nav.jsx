import { useState, useEffect } from 'react'
import './Nav.css'

const links = ['About', 'Skills', 'Projects', 'Contact']

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scroll = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setActive(id)
  }

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <span className="nav__logo-dot" />
        Delphine
      </div>
      <ul className="nav__links">
        {links.map(l => (
          <li key={l}>
            <button className={`nav__link ${active === l ? 'nav__link--active' : ''}`} onClick={() => scroll(l)}>
              {l}
            </button>
          </li>
        ))}
      </ul>
      <button className="nav__cta" onClick={() => scroll('Contact')}>
        Me contacter
      </button>
    </nav>
  )
}

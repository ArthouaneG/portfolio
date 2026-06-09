import { useState } from 'react'
import './Contact.css'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    // Ici tu peux brancher Formspree, EmailJS, etc.
    setSent(true)
  }

  return (
    <section className="contact" id="contact">
      <div className="contact__inner">
        <div className="contact__info">
          <p className="about__label" style={{ color: 'var(--accent-2)' }}>Contact</p>
          <h2 className="section-title">Travaillons ensemble</h2>
          <p className="contact__desc">
            Tu as un projet en tête ? Une question ? N&apos;hésite pas à me contacter,
            je suis toujours ouverte à de nouvelles collaborations.
          </p>
          <div className="contact__socials">
            <a href="mailto:ton@email.com" className="contact__social">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              ton@email.com
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="contact__social">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
              LinkedIn
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="contact__social">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.57v-2c-3.34.72-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.48.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23A11.5 11.5 0 0 1 12 5.8c1.02 0 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub
            </a>
          </div>
        </div>

        <form className="contact__form" onSubmit={handleSubmit}>
          {sent ? (
            <div className="contact__success">
              <div className="contact__success-icon">✓</div>
              <h3>Message envoyé !</h3>
              <p>Je te répondrai dans les plus brefs délais.</p>
            </div>
          ) : (
            <>
              <div className="contact__row">
                <div className="contact__field">
                  <label htmlFor="name">Nom</label>
                  <input id="name" name="name" type="text" placeholder="Ton nom" value={form.name} onChange={handleChange} required />
                </div>
                <div className="contact__field">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" placeholder="ton@email.com" value={form.email} onChange={handleChange} required />
                </div>
              </div>
              <div className="contact__field">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows={5} placeholder="Ton message..." value={form.message} onChange={handleChange} required />
              </div>
              <button type="submit" className="contact__submit">
                Envoyer le message
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                </svg>
              </button>
            </>
          )}
        </form>
      </div>

      <footer className="footer">
        <p>Fait avec <span style={{ color: 'var(--accent)' }}>♥</span> par Delphine · {new Date().getFullYear()}</p>
      </footer>
    </section>
  )
}

import './About.css'

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about__inner">
        <div className="about__text">
          <p className="about__label">À propos</p>
          <h2 className="section-title">Qui suis-je ?</h2>
          <p className="about__desc">
            Ingénieur passionné par l&apos;électronique, les systèmes embarqués et l&apos;audio haute fidélité.
            J&apos;aime construire des objets qui combinent la précision de la machine et la chaleur du son —
            un pied dans le monde analogique, l&apos;autre dans le numérique.
          </p>
          <p className="about__desc">
            Entre projets hardware, firmware et interfaces web, je cherche toujours à créer
            quelque chose de concret, de fonctionnel et — autant que possible — de beau.
          </p>
          <div className="about__stats">
            <div className="about__stat">
              <span className="about__stat-num">3+</span>
              <span className="about__stat-label">Ans de projets</span>
            </div>
            <div className="about__stat">
              <span className="about__stat-num">15+</span>
              <span className="about__stat-label">Projets réalisés</span>
            </div>
            <div className="about__stat">
              <span className="about__stat-num">∞</span>
              <span className="about__stat-label">Curiosité</span>
            </div>
          </div>
        </div>
        <div className="about__card rivet-panel">
          <div className="about__avatar">
            <div className="about__avatar-glow" />
            <svg className="about__avatar-icon" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Stylized speaker/gear icon */}
              <circle cx="40" cy="40" r="22" stroke="#C17A2A" strokeWidth="2" fill="none"/>
              <circle cx="40" cy="40" r="12" stroke="#F5A623" strokeWidth="1.5" fill="none"/>
              <circle cx="40" cy="40" r="4"  fill="#C17A2A"/>
              <line x1="40" y1="10" x2="40" y2="18" stroke="#C17A2A" strokeWidth="2"/>
              <line x1="40" y1="62" x2="40" y2="70" stroke="#C17A2A" strokeWidth="2"/>
              <line x1="10" y1="40" x2="18" y2="40" stroke="#C17A2A" strokeWidth="2"/>
              <line x1="62" y1="40" x2="70" y2="40" stroke="#C17A2A" strokeWidth="2"/>
              <line x1="18.6" y1="18.6" x2="24.2" y2="24.2" stroke="#8B5A1A" strokeWidth="1.5"/>
              <line x1="55.8" y1="55.8" x2="61.4" y2="61.4" stroke="#8B5A1A" strokeWidth="1.5"/>
              <line x1="61.4" y1="18.6" x2="55.8" y2="24.2" stroke="#8B5A1A" strokeWidth="1.5"/>
              <line x1="24.2" y1="55.8" x2="18.6" y2="61.4" stroke="#8B5A1A" strokeWidth="1.5"/>
            </svg>
          </div>
          <div className="about__tags">
            {['ESP32 / Arduino', 'C / C++', 'Bluetooth Audio', 'PCB Design', 'React', 'Électronique analogique'].map(t => (
              <span key={t} className="about__tag">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

import './About.css'

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about__inner">
        <div className="about__text">
          <p className="about__label">À propos</p>
          <h2 className="section-title">Qui suis-je ?</h2>
          <p className="about__desc">
            Développeuse web passionnée par la création d&apos;expériences numériques engageantes.
            J&apos;aime combiner design moderne et technologie pour construire des interfaces qui
            impressionnent et qui sont agréables à utiliser.
          </p>
          <p className="about__desc">
            Curieuse et créative, je m&apos;intéresse particulièrement aux animations, à la 3D dans le navigateur,
            et à l&apos;accessibilité. Toujours en quête de nouveaux défis.
          </p>
          <div className="about__stats">
            <div className="about__stat">
              <span className="about__stat-num">3+</span>
              <span className="about__stat-label">Années d&apos;expérience</span>
            </div>
            <div className="about__stat">
              <span className="about__stat-num">20+</span>
              <span className="about__stat-label">Projets réalisés</span>
            </div>
            <div className="about__stat">
              <span className="about__stat-num">∞</span>
              <span className="about__stat-label">Curiosité</span>
            </div>
          </div>
        </div>
        <div className="about__card">
          <div className="about__avatar">
            <div className="about__avatar-glow" />
            <div className="about__avatar-initials">D</div>
          </div>
          <div className="about__tags">
            {['React', 'TypeScript', 'Three.js', 'Node.js', 'Figma', 'UX Design'].map(t => (
              <span key={t} className="about__tag">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

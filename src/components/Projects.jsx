import './Projects.css'

const projects = [
  {
    title: 'Enceinte Bluetooth à Microcontrôleur',
    desc: 'Conception complète d\'une enceinte Bluetooth sur mesure : firmware ESP32, circuit d\'amplification audio. Streaming audio BLE avec depuis un smartphone.',
    tags: ['ESP32', 'Bluetooth / BLE', 'C++', 'Amplification audio', 'CAO 3D'],
    color: '#C17A2A',
    link: '#',
    github: 'https://github.com/ArthouaneG/soundboard_esp',
    featured: true,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="4"/>
        <circle cx="12" cy="12" r="9" strokeDasharray="2 2"/>
        <path d="M12 3v2M12 19v2M3 12h2M19 12h2"/>
      </svg>
    ),
  },
  {
    title: 'Portfolio steampunk 3D',
    desc: 'Ce portfolio, construit avec React, Three.js (R3F) et du CSS custom. Scène 3D animée avec rendu cuivre/ambre, waveform audio et anneaux gyroscopiques. Déployé sur Vercel.',
    tags: ['React', 'Three.js', 'R3F', 'Vite', 'CSS'],
    color: '#F5A623',
    link: '#',
    github: 'https://github.com/ArthouaneG/portfolio',
    featured: true,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
]

function ProjectCard({ project }) {
  return (
    <div className={`project-card rivet-panel ${project.featured ? 'project-card--featured' : ''}`}>
      <div className="project-card__glow" style={{ '--color': project.color }} />
      <div className="project-card__top">
        <span className="project-card__icon" style={{ color: project.color }}>
          {project.icon}
        </span>
        {project.featured && <span className="project-card__badge">Featured</span>}
      </div>
      <h3 className="project-card__title">{project.title}</h3>
      <p className="project-card__desc">{project.desc}</p>
      <div className="project-card__tags">
        {project.tags.map(t => <span key={t} className="project-card__tag">{t}</span>)}
      </div>
      <div className="project-card__links">
        <a href={project.github} target="_blank" rel="noreferrer" className="project-card__link">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.57v-2c-3.34.72-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.48.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23A11.5 11.5 0 0 1 12 5.8c1.02 0 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          Code source
        </a>
        {project.link !== '#' && (
          <a href={project.link} target="_blank" rel="noreferrer" className="project-card__link project-card__link--primary" style={{ '--color': project.color }}>
            Voir le projet →
          </a>
        )}
      </div>
    </div>
  )
}

export default function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="projects__inner">
        <div className="projects__header">
          <h2 className="section-title">Projets</h2>
          <p className="section-sub">Du firmware au front-end, ce que j&apos;ai construit</p>
        </div>
        <div className="projects__grid">
          {projects.map(p => <ProjectCard key={p.title} project={p} />)}
        </div>
      </div>
    </section>
  )
}

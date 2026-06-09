import './Projects.css'

const projects = [
  {
    title: 'Portfolio 3D',
    desc: 'Ce portfolio — construit avec React, Three.js et R3F. Animations 3D, design sombre, déployé sur Vercel.',
    tags: ['React', 'Three.js', 'Vite', 'CSS'],
    color: '#7c3aed',
    link: '#',
    github: '#',
    featured: true,
  },
  {
    title: 'Dashboard Analytics',
    desc: 'Tableau de bord interactif avec visualisations de données en temps réel et filtres avancés.',
    tags: ['Next.js', 'TypeScript', 'Recharts', 'PostgreSQL'],
    color: '#06b6d4',
    link: '#',
    github: '#',
    featured: true,
  },
  {
    title: 'App Mobile Design',
    desc: 'Refonte UX/UI d\'une application mobile fintech avec système de design complet sous Figma.',
    tags: ['Figma', 'UX Research', 'Design System'],
    color: '#10b981',
    link: '#',
    github: '#',
    featured: false,
  },
  {
    title: 'API REST Node',
    desc: 'API REST robuste avec authentification JWT, rate limiting, et documentation Swagger.',
    tags: ['Node.js', 'Express', 'JWT', 'Swagger'],
    color: '#f59e0b',
    link: '#',
    github: '#',
    featured: false,
  },
]

function ProjectCard({ project }) {
  return (
    <div className={`project-card ${project.featured ? 'project-card--featured' : ''}`}>
      <div className="project-card__glow" style={{ '--color': project.color }} />
      <div className="project-card__top">
        <div className="project-card__dot" style={{ background: project.color, boxShadow: `0 0 12px ${project.color}` }} />
        {project.featured && <span className="project-card__badge">Featured</span>}
      </div>
      <h3 className="project-card__title">{project.title}</h3>
      <p className="project-card__desc">{project.desc}</p>
      <div className="project-card__tags">
        {project.tags.map(t => <span key={t} className="project-card__tag">{t}</span>)}
      </div>
      <div className="project-card__links">
        <a href={project.github} className="project-card__link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.57v-2c-3.34.72-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.48.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23A11.5 11.5 0 0 1 12 5.8c1.02 0 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          Code
        </a>
        <a href={project.link} className="project-card__link project-card__link--primary" style={{ '--color': project.color }}>
          Voir le projet →
        </a>
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
          <p className="section-sub">Une sélection de mes réalisations récentes</p>
        </div>
        <div className="projects__grid">
          {projects.map(p => <ProjectCard key={p.title} project={p} />)}
        </div>
      </div>
    </section>
  )
}

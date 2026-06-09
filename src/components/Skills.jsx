import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshWobbleMaterial } from '@react-three/drei'
import './Skills.css'

const skills = [
  { category: 'Frontend', items: [
    { name: 'React / Next.js', level: 90 },
    { name: 'TypeScript', level: 80 },
    { name: 'CSS / Animations', level: 88 },
    { name: 'Three.js / R3F', level: 70 },
  ]},
  { category: 'Backend', items: [
    { name: 'Node.js / Express', level: 75 },
    { name: 'PostgreSQL', level: 68 },
    { name: 'REST APIs', level: 82 },
    { name: 'Docker', level: 55 },
  ]},
  { category: 'Design & Outils', items: [
    { name: 'Figma', level: 85 },
    { name: 'Git / GitHub', level: 88 },
    { name: 'UX Research', level: 72 },
    { name: 'Accessibilité', level: 78 },
  ]},
]

function FloatingCube({ position, color, speed }) {
  const ref = useRef()
  useFrame((state) => {
    ref.current.rotation.x = state.clock.elapsedTime * speed * 0.7
    ref.current.rotation.y = state.clock.elapsedTime * speed
  })
  return (
    <Float speed={speed * 1.5} floatIntensity={0.5}>
      <mesh ref={ref} position={position}>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <MeshWobbleMaterial color={color} factor={0.2} speed={speed} roughness={0.1} metalness={0.5} />
      </mesh>
    </Float>
  )
}

function Scene3D() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#7c3aed" />
      <pointLight position={[-5, -5, 5]} intensity={0.6} color="#06b6d4" />
      <FloatingCube position={[-1.5, 0.5, 0]} color="#7c3aed" speed={0.4} />
      <FloatingCube position={[1.5, -0.5, -1]} color="#06b6d4" speed={0.6} />
      <FloatingCube position={[0, 1.5, -0.5]} color="#a78bfa" speed={0.3} />
      <FloatingCube position={[0.8, -1.5, 0.5]} color="#0891b2" speed={0.5} />
    </>
  )
}

function SkillBar({ name, level }) {
  const barRef = useRef()
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && barRef.current) {
        barRef.current.style.width = `${level}%`
      }
    }, { threshold: 0.3 })
    if (barRef.current) observer.observe(barRef.current)
    return () => observer.disconnect()
  }, [level])

  return (
    <div className="skill-bar">
      <div className="skill-bar__header">
        <span className="skill-bar__name">{name}</span>
        <span className="skill-bar__level">{level}%</span>
      </div>
      <div className="skill-bar__track">
        <div ref={barRef} className="skill-bar__fill" style={{ width: 0 }} />
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section className="skills" id="skills">
      <div className="skills__inner">
        <div className="skills__header">
          <h2 className="section-title">Compétences</h2>
          <p className="section-sub">Technologies que j&apos;utilise au quotidien</p>
        </div>
        <div className="skills__layout">
          <div className="skills__canvas-wrap">
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
              <Scene3D />
            </Canvas>
          </div>
          <div className="skills__groups">
            {skills.map(group => (
              <div key={group.category} className="skills__group">
                <h3 className="skills__group-title">{group.category}</h3>
                {group.items.map(s => <SkillBar key={s.name} {...s} />)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

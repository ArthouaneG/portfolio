import { useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import './Skills.css'

const skills = [
  { category: 'Systèmes embarqués', items: [
    { name: 'C / C++', level: 85 },
    { name: 'ESP32 / Arduino', level: 90 },
    { name: 'Protocoles (I²C, SPI, UART)', level: 78 },
    { name: 'Bluetooth / BLE', level: 80 },
  ]},
  { category: 'Électronique', items: [
    { name: 'Conception PCB (KiCad)', level: 72 },
    { name: 'Électronique analogique', level: 68 },
    { name: 'Amplification audio', level: 75 },
    { name: 'Soudure / Prototypage', level: 88 },
  ]},
  { category: 'Software & Web', items: [
    { name: 'React / JavaScript', level: 75 },
    { name: 'Python', level: 70 },
    { name: 'Git / GitHub', level: 85 },
    { name: 'Linux / Shell', level: 72 },
  ]},
]

/* Rotating gear-like torus knot */
function Gear({ position, speed, scale, color }) {
  const ref = useRef()
  useFrame((state) => {
    ref.current.rotation.z = state.clock.elapsedTime * speed
    ref.current.rotation.x = state.clock.elapsedTime * speed * 0.6
  })
  return (
    <Float speed={1.2} floatIntensity={0.35}>
      <mesh ref={ref} position={position} scale={scale}>
        <torusKnotGeometry args={[1, 0.28, 96, 8, 2, 3]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.95} emissive={color} emissiveIntensity={0.08} />
      </mesh>
    </Float>
  )
}

/* Oscilloscope-like waveform ring in the skills canvas */
function OscRing() {
  const count = 180
  const ref = useRef()
  const positions = useMemo(() => new Float32Array(count * 3), [])

  useFrame((state) => {
    const pos = ref.current.geometry.attributes.position
    const t = state.clock.elapsedTime
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const r = 2.8
      pos.setX(i, r * Math.cos(angle))
      pos.setY(i, Math.sin(angle * 6 + t * 1.8) * 0.35 + Math.sin(angle * 3 + t * 0.9) * 0.15)
      pos.setZ(i, r * Math.sin(angle))
    }
    pos.needsUpdate = true
    ref.current.rotation.y = t * 0.1
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.07} color="#F5A623" transparent opacity={0.9} sizeAttenuation />
    </points>
  )
}

function Scene3D() {
  return (
    <>
      <ambientLight intensity={0.2} color="#FFC060" />
      <pointLight position={[4, 4, 4]}   intensity={2.5} color="#C17A2A" />
      <pointLight position={[-4, -4, 4]} intensity={1.2} color="#7A4C17" />
      <Gear position={[-1.4,  0.6, 0]}  speed={0.35} scale={0.38} color="#8B5A1A" />
      <Gear position={[ 1.4, -0.5, -0.8]} speed={0.5}  scale={0.28} color="#C17A2A" />
      <Gear position={[ 0.2,  1.6, -0.4]} speed={0.28} scale={0.22} color="#F5A623" />
      <OscRing />
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
          <p className="section-sub">De la soudure au code — bout en bout</p>
        </div>
        <div className="skills__layout">
          <div className="skills__canvas-wrap rivet-panel">
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

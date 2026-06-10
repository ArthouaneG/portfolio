import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Float, MeshDistortMaterial } from '@react-three/drei'
import './Hero.css'

/* Central speaker/gyroscope core */
function SpeakerCore() {
  const outer = useRef()
  const inner = useRef()

  useFrame((state) => {
    outer.current.rotation.y = state.clock.elapsedTime * 0.25
    outer.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.18) * 0.12
    inner.current.rotation.y = -state.clock.elapsedTime * 0.4
    inner.current.rotation.z = state.clock.elapsedTime * 0.3
  })

  return (
    <Float speed={1.2} floatIntensity={0.5} rotationIntensity={0.1}>
      <group>
        {/* Solid copper icosahedron */}
        <mesh ref={outer} scale={1.9}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color="#8B5A1A"
            roughness={0.25}
            metalness={0.95}
            emissive="#4A2E08"
            emissiveIntensity={0.35}
          />
        </mesh>
        {/* Wireframe overlay */}
        <mesh ref={inner} scale={2.05}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color="#F5A623" wireframe opacity={0.18} transparent />
        </mesh>
      </group>
    </Float>
  )
}

/* Gyroscope rings — like speaker rings or clock gears */
function GyroRing({ radiusScale, thickness, tiltX, tiltZ, speed, color, opacity }) {
  const ref = useRef()
  useFrame((state) => {
    ref.current.rotation.z = tiltZ + state.clock.elapsedTime * speed
    ref.current.rotation.x = tiltX + Math.sin(state.clock.elapsedTime * 0.2) * 0.04
  })
  return (
    <mesh ref={ref} scale={radiusScale}>
      <torusGeometry args={[1, thickness, 16, 128]} />
      <meshStandardMaterial
        color={color}
        roughness={0.3}
        metalness={0.9}
        emissive={color}
        emissiveIntensity={0.08}
        opacity={opacity}
        transparent
      />
    </mesh>
  )
}

/* Waveform: particles arranged on a circle whose Y oscillates like audio */
function AudioWaveform() {
  const count = 280
  const ref = useRef()

  const basePositions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const r = 5.5
      arr[i * 3]     = r * Math.cos(angle)
      arr[i * 3 + 1] = 0
      arr[i * 3 + 2] = r * Math.sin(angle)
    }
    return arr
  }, [])

  const positions = useMemo(() => new Float32Array(basePositions), [basePositions])

  useFrame((state) => {
    const pos = ref.current.geometry.attributes.position
    const t = state.clock.elapsedTime
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      pos.setY(i, Math.sin(angle * 10 + t * 2.2) * 0.5 + Math.sin(angle * 4 + t * 1.1) * 0.25)
    }
    pos.needsUpdate = true
    ref.current.rotation.y = t * 0.06
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.055} color="#C17A2A" transparent opacity={0.85} sizeAttenuation />
    </points>
  )
}

/* Outer dust ring */
function DustRing() {
  const count = 160
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const r = 7 + (Math.random() - 0.5) * 1.5
      arr[i * 3]     = r * Math.cos(angle)
      arr[i * 3 + 1] = (Math.random() - 0.5) * 0.6
      arr[i * 3 + 2] = r * Math.sin(angle)
    }
    return arr
  }, [])

  const ref = useRef()
  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.025
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#7A4C17" transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero__canvas">
        <Canvas camera={{ position: [0, 0, 9], fov: 50 }} dpr={[1, 2]}>
          <ambientLight intensity={0.15} color="#FFC060" />
          <pointLight position={[8, 6, 6]}   intensity={2.5} color="#C17A2A" />
          <pointLight position={[-8, -4, -4]} intensity={1.2} color="#8B5A1A" />
          <pointLight position={[0, 8, 0]}    intensity={0.8} color="#F5A623" />
          <Stars radius={100} depth={60} count={2500} factor={2.5} saturation={0.2} fade speed={0.3} />
          <SpeakerCore />
          <GyroRing radiusScale={3.4} thickness={0.018} tiltX={Math.PI/2.2} tiltZ={0}    speed={ 0.09} color="#C17A2A" opacity={0.9} />
          <GyroRing radiusScale={4.2} thickness={0.010} tiltX={Math.PI/3.5} tiltZ={0.8}  speed={-0.06} color="#8B5A1A" opacity={0.7} />
          <GyroRing radiusScale={5.0} thickness={0.006} tiltX={Math.PI/5}   tiltZ={-0.5} speed={ 0.04} color="#F5A623" opacity={0.35} />
          <AudioWaveform />
          <DustRing />
        </Canvas>
      </div>

      <div className="hero__content">
        <div className="hero__badge">
          Étudiant &amp; Maker · Ouvert aux opportunités
        </div>
        <h1 className="hero__title">
          Bonjour, je suis<br />
          <span className="hero__name">Arthouane<br />Gillekens</span>
        </h1>
        <p className="hero__desc">
          Passionné d&apos;électronique, d&apos;audio et de code.<br />
          Je conçois des systèmes embarqués et des expériences qui résonnent.
        </p>
        <div className="hero__actions">
          <button className="hero__btn hero__btn--primary" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
            Voir mes projets
          </button>
          <button className="hero__btn hero__btn--ghost" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            Me contacter
          </button>
        </div>
      </div>

      <div className="hero__scroll">
        <div className="hero__scroll-line" />
        <span>scroll</span>
      </div>
    </section>
  )
}

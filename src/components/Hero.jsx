import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, MeshDistortMaterial, Float, Torus } from '@react-three/drei'
import * as THREE from 'three'
import './Hero.css'

function AnimatedSphere() {
  const mesh = useRef()
  useFrame((state) => {
    mesh.current.rotation.x = state.clock.elapsedTime * 0.15
    mesh.current.rotation.y = state.clock.elapsedTime * 0.2
  })
  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={mesh} scale={2.2}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#7c3aed"
          attach="material"
          distort={0.45}
          speed={2.5}
          roughness={0}
          metalness={0.2}
          emissive="#3b0764"
          emissiveIntensity={0.4}
        />
      </mesh>
    </Float>
  )
}

function Ring() {
  const ref = useRef()
  useFrame((state) => {
    ref.current.rotation.x = Math.PI / 2.5 + Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    ref.current.rotation.z = state.clock.elapsedTime * 0.08
  })
  return (
    <mesh ref={ref} scale={3.6}>
      <torusGeometry args={[1, 0.012, 16, 120]} />
      <meshBasicMaterial color="#06b6d4" opacity={0.5} transparent />
    </mesh>
  )
}

function Ring2() {
  const ref = useRef()
  useFrame((state) => {
    ref.current.rotation.x = Math.PI / 3 + Math.cos(state.clock.elapsedTime * 0.25) * 0.15
    ref.current.rotation.z = -state.clock.elapsedTime * 0.05
  })
  return (
    <mesh ref={ref} scale={4.8}>
      <torusGeometry args={[1, 0.006, 16, 120]} />
      <meshBasicMaterial color="#7c3aed" opacity={0.25} transparent />
    </mesh>
  )
}

function Particles() {
  const count = 200
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 4 + Math.random() * 6
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [])

  const ref = useRef()
  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.04
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#a78bfa" transparent opacity={0.7} sizeAttenuation />
    </points>
  )
}

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero__canvas">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }} dpr={[1, 2]}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#7c3aed" />
          <pointLight position={[-10, -5, -10]} intensity={0.8} color="#06b6d4" />
          <Stars radius={80} depth={50} count={3000} factor={3} saturation={0.5} fade speed={0.5} />
          <AnimatedSphere />
          <Ring />
          <Ring2 />
          <Particles />
        </Canvas>
      </div>

      <div className="hero__content">
        <div className="hero__badge">Disponible pour de nouvelles opportunités</div>
        <h1 className="hero__title">
          Bonjour, je suis<br />
          <span className="hero__name">Delphine</span>
        </h1>
        <p className="hero__desc">
          Développeuse passionnée par les interfaces modernes,<br />
          l&apos;expérience utilisateur et les animations 3D.
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

import { useRef, useState, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import './About.css'

/* ─── Casque 3D ─────────────────────────────────────────────── */
function Headset({ playing }) {
  const ringsL = useRef([])
  const ringsR = useRef([])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const ei = playing ? 0.14 + Math.sin(t * 3.5) * 0.07 : 0.04
    ;[...ringsL.current, ...ringsR.current].forEach(r => {
      if (r) r.material.emissiveIntensity = ei
    })
  })

  return (
    <group>
      {/* BANDEAU — double arche acier fine */}
      <mesh>
        <torusGeometry args={[1.12, 0.018, 8, 64, Math.PI]} />
        <meshStandardMaterial color="#888888" metalness={0.96} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0, 0.08]}>
        <torusGeometry args={[1.08, 0.018, 8, 64, Math.PI]} />
        <meshStandardMaterial color="#888888" metalness={0.96} roughness={0.1} />
      </mesh>

      {/* COUSSIN DE TÊTE — cuir noir, centre de l'arche */}
      <mesh position={[0, 1.06, 0.04]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.052, 0.056, 0.46, 12]} />
        <meshStandardMaterial color="#0C0907" metalness={0} roughness={0.92} />
      </mesh>

      {/* PIVOT GAUCHE — cuivre */}
      <mesh position={[-1.1, 0.08, 0.04]}>
        <boxGeometry args={[0.058, 0.18, 0.09]} />
        <meshStandardMaterial color="#B8752A" metalness={0.88} roughness={0.22} />
      </mesh>
      <mesh position={[-1.12, -0.01, 0.09]}>
        <sphereGeometry args={[0.038, 10, 10]} />
        <meshStandardMaterial color="#F5A623" metalness={0.95} roughness={0.12} />
      </mesh>

      {/* BRAS GAUCHE — métal fin */}
      <mesh position={[-1.1, -0.38, 0.04]} rotation={[0, 0, 0.04]}>
        <boxGeometry args={[0.038, 0.68, 0.05]} />
        <meshStandardMaterial color="#888888" metalness={0.95} roughness={0.1} />
      </mesh>

      {/* COQUE GAUCHE */}
      <mesh position={[-1.1, -0.72, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.46, 0.44, 0.3, 48]} />
        <meshStandardMaterial color="#1A1410" metalness={0.15} roughness={0.65} />
      </mesh>
      {/* Dos en noyer */}
      <mesh position={[-0.986, -0.72, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.43, 0.43, 0.014, 48]} />
        <meshStandardMaterial color="#2D1508" metalness={0} roughness={0.7} />
      </mesh>
      {/* Bague bois */}
      <mesh position={[-1.1, -0.72, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.44, 0.026, 6, 48]} />
        <meshStandardMaterial color="#3A1A07" metalness={0.02} roughness={0.75} />
      </mesh>
      {/* Liseré cuivre */}
      <mesh position={[-1.1, -0.72, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.445, 0.011, 6, 48]} />
        <meshStandardMaterial color="#C17A2A" metalness={0.92} roughness={0.18} />
      </mesh>
      {/* Coussin velours épais */}
      <mesh position={[-1.258, -0.72, 0]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.3, 0.128, 12, 48]} />
        <meshStandardMaterial color="#0C0A09" metalness={0} roughness={0.98} />
      </mesh>
      {/* Face driver */}
      <mesh position={[-1.26, -0.72, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.18, 0.18, 0.012, 32]} />
        <meshStandardMaterial color="#121010" metalness={0.2} roughness={0.8} />
      </mesh>
      {/* Anneaux concentriques cuivre (grille) */}
      {[0.065, 0.12, 0.17].map((r, i) => (
        <mesh key={i} ref={el => { ringsL.current[i] = el }}
          position={[-1.268, -0.72, 0]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[r, 0.0065, 4, 32]} />
          <meshStandardMaterial color="#C17A2A" metalness={0.9} roughness={0.2} emissive="#C17A2A" emissiveIntensity={0.04} />
        </mesh>
      ))}

      {/* PIVOT DROIT */}
      <mesh position={[1.1, 0.08, 0.04]}>
        <boxGeometry args={[0.058, 0.18, 0.09]} />
        <meshStandardMaterial color="#B8752A" metalness={0.88} roughness={0.22} />
      </mesh>
      <mesh position={[1.12, -0.01, 0.09]}>
        <sphereGeometry args={[0.038, 10, 10]} />
        <meshStandardMaterial color="#F5A623" metalness={0.95} roughness={0.12} />
      </mesh>

      {/* BRAS DROIT */}
      <mesh position={[1.1, -0.38, 0.04]} rotation={[0, 0, -0.04]}>
        <boxGeometry args={[0.038, 0.68, 0.05]} />
        <meshStandardMaterial color="#888888" metalness={0.95} roughness={0.1} />
      </mesh>

      {/* COQUE DROITE */}
      <mesh position={[1.1, -0.72, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.46, 0.44, 0.3, 48]} />
        <meshStandardMaterial color="#1A1410" metalness={0.15} roughness={0.65} />
      </mesh>
      <mesh position={[0.986, -0.72, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.43, 0.43, 0.014, 48]} />
        <meshStandardMaterial color="#2D1508" metalness={0} roughness={0.7} />
      </mesh>
      <mesh position={[1.1, -0.72, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.44, 0.026, 6, 48]} />
        <meshStandardMaterial color="#3A1A07" metalness={0.02} roughness={0.75} />
      </mesh>
      <mesh position={[1.1, -0.72, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.445, 0.011, 6, 48]} />
        <meshStandardMaterial color="#C17A2A" metalness={0.92} roughness={0.18} />
      </mesh>
      <mesh position={[1.258, -0.72, 0]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.3, 0.128, 12, 48]} />
        <meshStandardMaterial color="#0C0A09" metalness={0} roughness={0.98} />
      </mesh>
      <mesh position={[1.26, -0.72, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.18, 0.18, 0.012, 32]} />
        <meshStandardMaterial color="#121010" metalness={0.2} roughness={0.8} />
      </mesh>
      {[0.065, 0.12, 0.17].map((r, i) => (
        <mesh key={i} ref={el => { ringsR.current[i] = el }}
          position={[1.268, -0.72, 0]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[r, 0.0065, 4, 32]} />
          <meshStandardMaterial color="#C17A2A" metalness={0.9} roughness={0.2} emissive="#C17A2A" emissiveIntensity={0.04} />
        </mesh>
      ))}
    </group>
  )
}

/* ─── Projecteurs de scène ───────────────────────────────────── */
function StageLights({ playing }) {
  const l1 = useRef()
  const l2 = useRef()
  const l3 = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (l1.current) {
      l1.current.intensity = playing ? 5.5 + Math.sin(t * 2.1) * 2.5 : 0
      l1.current.position.x = Math.sin(t * 0.85) * 4
    }
    if (l2.current) {
      l2.current.intensity = playing ? 4.5 + Math.sin(t * 1.65 + 1.8) * 2 : 0
      l2.current.position.x = Math.cos(t * 0.72) * 4
    }
    if (l3.current) {
      l3.current.intensity = playing ? 3 + Math.sin(t * 3.1 + 0.5) * 1.2 : 0
    }
  })

  return (
    <>
      <pointLight ref={l1} position={[3, 3, 2.5]} intensity={0} color="#F5A623" distance={14} />
      <pointLight ref={l2} position={[-3, 3, 2.5]} intensity={0} color="#C17A2A" distance={14} />
      <pointLight ref={l3} position={[0, -2, 3]} intensity={0} color="#FF7A1A" distance={9} />
    </>
  )
}

/* ─── Fond qui s'illumine ───────────────────────────────────── */
function StageBg({ playing }) {
  const ref = useRef()

  useFrame((state) => {
    if (!ref.current) return
    ref.current.material.emissiveIntensity = playing
      ? 0.048 + Math.sin(state.clock.elapsedTime * 1.3) * 0.022
      : 0
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[9, 16, 16]} />
      <meshStandardMaterial color="#060503" emissive="#9B4A0A" emissiveIntensity={0} side={THREE.BackSide} />
    </mesh>
  )
}

/* ─── Étincelles montantes ──────────────────────────────────── */
function Sparks({ playing }) {
  const count = 48
  const ref = useRef()
  const positions = useMemo(() => new Float32Array(count * 3), [])
  const data = useMemo(() => Array.from({ length: count }, () => ({
    x: (Math.random() - 0.5) * 3.2,
    z: (Math.random() - 0.5) * 1.6,
    phase: Math.random() * Math.PI * 2,
    speed: 0.35 + Math.random() * 0.7,
  })), [])

  useFrame((state) => {
    if (!ref.current) return
    const pos = ref.current.geometry.attributes.position
    const t = state.clock.elapsedTime
    for (let i = 0; i < count; i++) {
      const s = data[i]
      if (playing) {
        const life = ((t * s.speed + s.phase) % (Math.PI * 2)) / (Math.PI * 2)
        pos.setXYZ(i, s.x + Math.sin(t * 2.5 + i) * 0.12, -1.6 + life * 4, s.z)
      } else {
        pos.setXYZ(i, 0, -100, 0)
      }
    }
    pos.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.032} color="#F5A623" transparent opacity={0.72} sizeAttenuation />
    </points>
  )
}

/* ─── Section About ─────────────────────────────────────────── */
export default function About() {
  const [playing, setPlaying] = useState(false)
  const playerRef = useRef(null)
  const ytContainerRef = useRef(null)

  useEffect(() => {
    function initPlayer() {
      if (!ytContainerRef.current || !window.YT?.Player) return
      playerRef.current = new window.YT.Player(ytContainerRef.current, {
        height: '0',
        width: '0',
        videoId: 'Tx9zMFodNtA',
        playerVars: { autoplay: 0, controls: 0, modestbranding: 1, playsinline: 1, loop: 1, playlist: 'Tx9zMFodNtA' },
      })
    }

    if (window.YT?.Player) {
      initPlayer()
    } else {
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const tag = document.createElement('script')
        tag.src = 'https://www.youtube.com/iframe_api'
        document.head.appendChild(tag)
      }
      const prev = window.onYouTubeIframeAPIReady
      window.onYouTubeIframeAPIReady = () => {
        if (prev) prev()
        initPlayer()
      }
    }

    return () => {
      try { playerRef.current?.stopVideo(); playerRef.current?.destroy() } catch (_) {}
      playerRef.current = null
    }
  }, [])

  const togglePlay = () => {
    const p = playerRef.current
    if (!p || typeof p.playVideo !== 'function') return
    if (playing) { p.pauseVideo() } else { p.playVideo() }
    setPlaying(s => !s)
  }

  return (
    <section className="about" id="about">
      <div className="about__inner">
        <div className="about__text">
          <p className="about__label">À propos</p>
          <h2 className="section-title">Qui suis-je ?</h2>
          <p className="about__desc">
            Étudiant passionné par l&apos;électronique, les systèmes embarqués et l&apos;audio haute fidélité.
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
          <div className={`about__headset-viewer ${playing ? 'about__headset-viewer--playing' : ''}`}>
            <Canvas camera={{ position: [0, 0.5, 4.8], fov: 44 }} dpr={[1, 2]}>
              <color attach="background" args={['#060503']} />
              <ambientLight intensity={0.18} color="#FFC060" />
              <pointLight position={[2.5, 2, 3]} intensity={3.5} color="#C17A2A" />
              <pointLight position={[-2, 1.5, 2]} intensity={1.8} color="#7A4C17" />
              <StageLights playing={playing} />
              <StageBg playing={playing} />
              <Sparks playing={playing} />
              <Headset playing={playing} />
              <OrbitControls
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.65}
                minDistance={3}
                maxDistance={9}
                target={[0, -0.1, 0]}
              />
            </Canvas>
          </div>

          <div className="about__card-content">
            <div className="about__controls">
              <button
                className={`about__play-btn ${playing ? 'about__play-btn--playing' : ''}`}
                onClick={togglePlay}
              >
                <span className="about__play-btn__icon">
                  {playing ? (
                    <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
                      <rect x="0" y="0" width="3.5" height="12" rx="1" />
                      <rect x="6.5" y="0" width="3.5" height="12" rx="1" />
                    </svg>
                  ) : (
                    <svg width="11" height="13" viewBox="0 0 11 13" fill="currentColor">
                      <path d="M0 0.5L11 6.5L0 12.5Z" />
                    </svg>
                  )}
                </span>
                <span className="about__play-btn__text">
                  {playing ? 'En écoute…' : 'Ambiance sonore'}
                </span>
              </button>
              <p className="about__headset-hint">Glisser · Molette pour zoomer</p>
            </div>
            <div className="about__tags">
              {['ESP32 / Arduino', 'C / C++', 'Bluetooth Audio', 'React', 'Électronique analogique'].map(t => (
                <span key={t} className="about__tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lecteur YouTube caché */}
      <div style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', visibility: 'hidden' }}>
        <div ref={ytContainerRef} />
      </div>
    </section>
  )
}

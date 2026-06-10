import { useRef, useState, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import './About.css'

/* ─── Casque 3D (style Meze 109 Pro) ────────────────────────── */
function Headset({ playing }) {
  const spokeRefs = useRef([])   // L spokes + R spokes

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const ei = playing ? 0.18 + Math.sin(t * 3.2) * 0.08 : 0.0
    spokeRefs.current.forEach(r => {
      if (r) r.material.emissiveIntensity = ei
    })
  })

  /* Helper: copper dome accent au centre de la face extérieure */
  const CopperDome = ({ x, y, z }) => (
    <mesh position={[x, y, z]}>
      <sphereGeometry args={[0.058, 16, 12]} />
      <meshStandardMaterial color="#C07840" metalness={0.93} roughness={0.17} />
    </mesh>
  )

  /* Helper: grille rayons + anneau noyer d'une coque */
  const CupOuterFace = ({ xFace, yc, sign, spokeOffset }) => (
    <>
      {/* Anneau noyer proéminent (cadre extérieur) */}
      <mesh position={[xFace, yc, 0]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.36, 0.08, 10, 48]} />
        <meshStandardMaterial color="#2A1306" metalness={0} roughness={0.68} />
      </mesh>
      {/* Fond grille sombre */}
      <mesh position={[xFace - sign * 0.005, yc, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.28, 0.28, 0.009, 48]} />
        <meshStandardMaterial color="#141210" metalness={0.25} roughness={0.55} />
      </mesh>
      {/* Rayons radiaux */}
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2
        const r = 0.14
        return (
          <mesh
            key={i}
            ref={el => { spokeRefs.current[spokeOffset + i] = el }}
            position={[xFace - sign * 0.006, yc + Math.cos(a) * r, Math.sin(a) * r]}
            rotation={[a, 0, 0]}
          >
            <boxGeometry args={[0.007, 0.28, 0.009]} />
            <meshStandardMaterial
              color="#C07840"
              metalness={0.85}
              roughness={0.3}
              emissive="#C07840"
              emissiveIntensity={0}
            />
          </mesh>
        )
      })}
      {/* Dôme cuivre central */}
      <CopperDome x={xFace - sign * 0.014} y={yc} z={0} />
    </>
  )

  return (
    <group>
      {/* ── SANGLE CUIR PLATE — 24 segments de box le long de l'arche ── */}
      {/* Local X = épaisseur cuir (radial), Local Y = longueur (tangent), Local Z = largeur courroie */}
      {Array.from({ length: 24 }, (_, i) => {
        const t = (i + 0.5) / 24 * Math.PI
        const segLen = (1.1 * Math.PI / 24) * 1.08
        return (
          <mesh key={i}
            position={[1.1 * Math.cos(t), 1.1 * Math.sin(t), 0]}
            rotation={[0, 0, t]}
          >
            <boxGeometry args={[0.016, segLen, 0.065]} />
            <meshStandardMaterial color="#1A1208" metalness={0} roughness={0.88} />
          </mesh>
        )
      })}

      {/* Coussin de tête épais — cuir noir */}
      <mesh position={[0, 1.04, 0.012]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.064, 0.068, 0.52, 12]} />
        <meshStandardMaterial color="#0E0C0A" metalness={0} roughness={0.9} />
      </mesh>

      {/* ── CÔTÉ GAUCHE ── */}

      {/* Étrier cuivre gauche */}
      <mesh position={[-1.06, 0.0, 0.032]}>
        <boxGeometry args={[0.048, 0.24, 0.075]} />
        <meshStandardMaterial color="#C07840" metalness={0.88} roughness={0.22} />
      </mesh>
      <mesh position={[-1.065, -0.16, 0.025]} rotation={[0.12, 0, 0]}>
        <boxGeometry args={[0.042, 0.13, 0.06]} />
        <meshStandardMaterial color="#A86830" metalness={0.88} roughness={0.26} />
      </mesh>
      <mesh position={[-1.07, -0.18, 0.042]}>
        <sphereGeometry args={[0.028, 10, 10]} />
        <meshStandardMaterial color="#E0A050" metalness={0.95} roughness={0.12} />
      </mesh>

      {/* Bras cuir gauche plat + rivets */}
      <mesh position={[-1.085, -0.38, 0.028]} rotation={[0, 0, 0.08]}>
        <boxGeometry args={[0.022, 0.64, 0.068]} />
        <meshStandardMaterial color="#1A1208" metalness={0} roughness={0.88} />
      </mesh>
      {[-0.25, -0.1, 0.06, 0.2].map((dy, i) => (
        <mesh key={i} position={[-1.085, -0.38 + dy, 0.065]} rotation={[0, Math.PI / 2, 0]}>
          <cylinderGeometry args={[0.011, 0.011, 0.005, 8]} />
          <meshStandardMaterial color="#C07840" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}

      {/* Coque gauche — boîtier */}
      <mesh position={[-1.1, -0.72, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.46, 0.44, 0.32, 48]} />
        <meshStandardMaterial color="#1A1410" metalness={0.12} roughness={0.68} />
      </mesh>
      {/* Bague cuivre sur le pourtour */}
      <mesh position={[-1.1, -0.72, 0]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.445, 0.012, 6, 48]} />
        <meshStandardMaterial color="#C07840" metalness={0.92} roughness={0.18} />
      </mesh>

      {/* Face EXTÉRIEURE gauche (noyer + grille rayons) */}
      <CupOuterFace xFace={-0.944} yc={-0.72} sign={-1} spokeOffset={0} />

      {/* Coussin velours épais (face intérieure) */}
      <mesh position={[-1.262, -0.72, 0]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.3, 0.128, 12, 48]} />
        <meshStandardMaterial color="#0C0A09" metalness={0} roughness={0.98} />
      </mesh>

      {/* ── CÔTÉ DROIT (symétrique) ── */}

      <mesh position={[1.06, 0.0, 0.032]}>
        <boxGeometry args={[0.048, 0.24, 0.075]} />
        <meshStandardMaterial color="#C07840" metalness={0.88} roughness={0.22} />
      </mesh>
      <mesh position={[1.065, -0.16, 0.025]} rotation={[-0.12, 0, 0]}>
        <boxGeometry args={[0.042, 0.13, 0.06]} />
        <meshStandardMaterial color="#A86830" metalness={0.88} roughness={0.26} />
      </mesh>
      <mesh position={[1.07, -0.18, 0.042]}>
        <sphereGeometry args={[0.028, 10, 10]} />
        <meshStandardMaterial color="#E0A050" metalness={0.95} roughness={0.12} />
      </mesh>

      <mesh position={[1.085, -0.38, 0.028]} rotation={[0, 0, -0.08]}>
        <boxGeometry args={[0.022, 0.64, 0.068]} />
        <meshStandardMaterial color="#1A1208" metalness={0} roughness={0.88} />
      </mesh>
      {[-0.25, -0.1, 0.06, 0.2].map((dy, i) => (
        <mesh key={i} position={[1.085, -0.38 + dy, 0.065]} rotation={[0, Math.PI / 2, 0]}>
          <cylinderGeometry args={[0.011, 0.011, 0.005, 8]} />
          <meshStandardMaterial color="#C07840" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}

      <mesh position={[1.1, -0.72, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.46, 0.44, 0.32, 48]} />
        <meshStandardMaterial color="#1A1410" metalness={0.12} roughness={0.68} />
      </mesh>
      <mesh position={[1.1, -0.72, 0]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.445, 0.012, 6, 48]} />
        <meshStandardMaterial color="#C07840" metalness={0.92} roughness={0.18} />
      </mesh>

      <CupOuterFace xFace={0.944} yc={-0.72} sign={1} spokeOffset={12} />

      <mesh position={[1.262, -0.72, 0]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.3, 0.128, 12, 48]} />
        <meshStandardMaterial color="#0C0A09" metalness={0} roughness={0.98} />
      </mesh>
    </group>
  )
}

/* ─── Projecteurs balayants ─────────────────────────────────── */
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

/* ─── Fond : clair au repos, s'assombrit + brille à l'écoute ── */
function StageBg({ playing }) {
  const ref = useRef()
  const playingColor = useMemo(() => new THREE.Color('#060503'), [])
  const idleColor    = useMemo(() => new THREE.Color('#1E1A14'), [])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.material.color.lerp(playing ? playingColor : idleColor, 0.04)
    ref.current.material.emissiveIntensity = playing
      ? 0.05 + Math.sin(t * 1.3) * 0.024
      : Math.max(0, ref.current.material.emissiveIntensity - 0.008)
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[9, 16, 16]} />
      <meshStandardMaterial color="#1E1A14" emissive="#9B4A0A" emissiveIntensity={0} side={THREE.BackSide} />
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
  const playerRef     = useRef(null)
  const ytContainerRef = useRef(null)

  useEffect(() => {
    function initPlayer() {
      if (!ytContainerRef.current || !window.YT?.Player) return
      playerRef.current = new window.YT.Player(ytContainerRef.current, {
        height: '0', width: '0',
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
      window.onYouTubeIframeAPIReady = () => { if (prev) prev(); initPlayer() }
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
            <Canvas camera={{ position: [0, 0.4, 5], fov: 42 }} dpr={[1, 2]}>
              <color attach="background" args={['#1E1A14']} />
              <ambientLight intensity={0.22} color="#FFD090" />
              <pointLight position={[2.5, 2, 3]} intensity={4} color="#C17A2A" />
              <pointLight position={[-2, 1.5, 2]} intensity={2} color="#7A4C17" />
              <StageLights playing={playing} />
              <StageBg    playing={playing} />
              <Sparks     playing={playing} />
              <Headset    playing={playing} />
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

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import './About.css'

function Headset() {
  return (
    <group>
      {/* HEADBAND — arch en laiton cuivré */}
      <mesh>
        <torusGeometry args={[1.1, 0.052, 10, 64, Math.PI]} />
        <meshStandardMaterial color="#9B6A1F" metalness={0.88} roughness={0.25} />
      </mesh>
      {/* Bande intérieure en bois */}
      <mesh position={[0, 0, 0.016]}>
        <torusGeometry args={[0.97, 0.03, 6, 48, Math.PI * 0.8]} />
        <meshStandardMaterial color="#3D1F08" metalness={0} roughness={0.82} />
      </mesh>
      {/* Liseré ambre sur le côté */}
      <mesh position={[0, 0, -0.058]}>
        <torusGeometry args={[1.1, 0.016, 8, 64, Math.PI]} />
        <meshStandardMaterial color="#F5A623" metalness={0.95} roughness={0.15} />
      </mesh>

      {/* BRAS GAUCHE */}
      <mesh position={[-1.07, -0.32, 0]} rotation={[0, 0, 0.08]}>
        <boxGeometry args={[0.065, 0.56, 0.065]} />
        <meshStandardMaterial color="#8B5A1A" metalness={0.85} roughness={0.3} />
      </mesh>

      {/* COQUE GAUCHE */}
      <mesh position={[-1.1, -0.65, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.4, 0.38, 0.22, 40]} />
        <meshStandardMaterial color="#C17A2A" metalness={0.92} roughness={0.18} />
      </mesh>
      {/* Face arrière */}
      <mesh position={[-0.99, -0.65, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.38, 0.38, 0.01, 40]} />
        <meshStandardMaterial color="#9B6A1F" metalness={0.85} roughness={0.25} />
      </mesh>
      {/* Bague bois */}
      <mesh position={[-1.1, -0.65, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.38, 0.042, 6, 40]} />
        <meshStandardMaterial color="#4A2510" metalness={0.05} roughness={0.78} />
      </mesh>
      {/* Coussin en cuir */}
      <mesh position={[-1.215, -0.65, 0]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.27, 0.085, 10, 40]} />
        <meshStandardMaterial color="#120903" metalness={0} roughness={0.95} />
      </mesh>
      {/* Face driver */}
      <mesh position={[-1.215, -0.65, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.17, 0.17, 0.012, 32]} />
        <meshStandardMaterial color="#2A1A0A" metalness={0.15} roughness={0.7} />
      </mesh>
      {/* Anneaux concentriques cuivre (style grille haut-parleur) */}
      {[0.055, 0.105, 0.15].map((r, i) => (
        <mesh key={i} position={[-1.222, -0.65, 0]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[r, 0.007, 4, 32]} />
          <meshStandardMaterial color="#C17A2A" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}

      {/* BRAS DROIT */}
      <mesh position={[1.07, -0.32, 0]} rotation={[0, 0, -0.08]}>
        <boxGeometry args={[0.065, 0.56, 0.065]} />
        <meshStandardMaterial color="#8B5A1A" metalness={0.85} roughness={0.3} />
      </mesh>

      {/* COQUE DROITE */}
      <mesh position={[1.1, -0.65, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.4, 0.38, 0.22, 40]} />
        <meshStandardMaterial color="#C17A2A" metalness={0.92} roughness={0.18} />
      </mesh>
      <mesh position={[0.99, -0.65, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.38, 0.38, 0.01, 40]} />
        <meshStandardMaterial color="#9B6A1F" metalness={0.85} roughness={0.25} />
      </mesh>
      <mesh position={[1.1, -0.65, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.38, 0.042, 6, 40]} />
        <meshStandardMaterial color="#4A2510" metalness={0.05} roughness={0.78} />
      </mesh>
      <mesh position={[1.215, -0.65, 0]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.27, 0.085, 10, 40]} />
        <meshStandardMaterial color="#120903" metalness={0} roughness={0.95} />
      </mesh>
      <mesh position={[1.215, -0.65, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.17, 0.17, 0.012, 32]} />
        <meshStandardMaterial color="#2A1A0A" metalness={0.15} roughness={0.7} />
      </mesh>
      {[0.055, 0.105, 0.15].map((r, i) => (
        <mesh key={i} position={[1.222, -0.65, 0]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[r, 0.007, 4, 32]} />
          <meshStandardMaterial color="#C17A2A" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}
    </group>
  )
}

export default function About() {
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
          <div className="about__headset-viewer">
            <Canvas camera={{ position: [0, 0.5, 4.8], fov: 44 }} dpr={[1, 2]}>
              <ambientLight intensity={0.3} color="#FFC060" />
              <pointLight position={[3, 3, 3]} intensity={5} color="#C17A2A" />
              <pointLight position={[-3, 2, 2]} intensity={2.5} color="#F5A623" />
              <pointLight position={[0, -3, 2]} intensity={1.5} color="#7A4C17" />
              <Headset />
              <OrbitControls
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.7}
                minDistance={3}
                maxDistance={9}
                target={[0, -0.1, 0]}
              />
            </Canvas>
          </div>
          <div className="about__card-content">
            <p className="about__headset-hint">Glisser · Molette pour zoomer</p>
            <div className="about__tags">
              {['ESP32 / Arduino', 'C / C++', 'Bluetooth Audio', 'React', 'Électronique analogique'].map(t => (
                <span key={t} className="about__tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

'use client';

import React, { useMemo, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, useGLTF, AsciiRenderer } from '@react-three/drei';
import * as THREE from 'three';
import Image from 'next/image';

type HeroAscii3DProps = {
  modelUrl?: string;
  rotationRPM?: number;
  tilt?: [number, number, number]; // degrees
  characters?: string;
  invert?: boolean;
  fontSize?: number;
  /** Target size (in world units) the model’s largest dimension should be scaled to. Increase to make it bigger. */
  fit?: number;
};

function LoadedModel({ url, fit = 2.8, onLoad }: { url: string; fit?: number; onLoad?: () => void }) {
  const { scene } = useGLTF(url);
  
  React.useEffect(() => {
    if (scene && onLoad) {
      // Small delay to ensure the model is fully processed
      const timer = setTimeout(() => {
        onLoad();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [scene, onLoad]);

  const boxed = useMemo(() => {
    const clone = scene.clone(true);
    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = fit / maxDim; // <— key change: fit controls overall size
    const center = new THREE.Vector3();
    box.getCenter(center);
    return { scale, center };
  }, [scene, fit]);

  return (
    <group
      scale={boxed.scale}
      position={[
        -boxed.center.x * boxed.scale,
        -boxed.center.y * boxed.scale,
        -boxed.center.z * boxed.scale,
      ]}
      dispose={null}
    >
      <primitive object={scene} />
    </group>
  );
}

function FallbackMesh() {
  return (
    <mesh>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial metalness={0.1} roughness={0.6} />
    </mesh>
  );
}

function SpinningRig({
  children,
  rotationRPM = 1.2,
  tilt = [35, 10, -10],
}: React.PropsWithChildren<{ rotationRPM?: number; tilt?: [number, number, number] }>) {
  const ref = useRef<THREE.Group>(null!);
  const axis = useMemo(() => {
    const [tx, ty, tz] = tilt.map((d) => THREE.MathUtils.degToRad(d));
    return new THREE.Vector3(0, 1, 0).applyEuler(new THREE.Euler(tx, ty, tz)).normalize();
  }, [tilt]);

  useFrame((_, dt) => {
    const rps = (rotationRPM * Math.PI * 2) / 60;
    const q = new THREE.Quaternion().setFromAxisAngle(axis, rps * dt);
    ref.current.quaternion.multiplyQuaternions(q, ref.current.quaternion);
  });

  return <group ref={ref}>{children}</group>;
}

export default function HeroAscii3D({
  modelUrl = '/model.glb',
  rotationRPM = 1.2,
  tilt = [35, 10, -10],
  characters = ' .:-=+*#%@',
  invert = false,
  fontSize = 9,
  fit = 3.2, // <— default bigger than before (was ~1.8)
}: HeroAscii3DProps) {
  const [isModelLoaded, setIsModelLoaded] = React.useState(false);
  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      {/* Background: ASCII-rendered 3D positioned slightly right */}
      <div 
        style={{ 
          position: 'absolute',
          top: 0,
          left: '20%',
          right: 0,
          bottom: 0,
          minHeight: '100vh',
          zIndex: 1,
          opacity: isModelLoaded ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
        }}
        className="ascii-background"
      >
        <Canvas
          gl={{ antialias: true, alpha: true }}
          camera={{ position: [0, 0, 2.6], fov: 25, near: 0.01, far: 100 }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.2} />
          <directionalLight position={[2, 3, 4]} intensity={1.6} />
          <directionalLight position={[-3, -2, 1]} intensity={0.5} />
          <Environment preset="studio" />

          <SpinningRig rotationRPM={rotationRPM} tilt={tilt}>
            <Suspense fallback={<FallbackMesh />}>
              <LoadedModel url={modelUrl} fit={fit} onLoad={() => setIsModelLoaded(true)} />
            </Suspense>
          </SpinningRig>

          <AsciiRenderer characters={characters} invert={invert} resolution={0.18} />
        </Canvas>

        {/* Keep ASCII huge, crisp, monospaced */}
        <style>{`
          canvas + pre, canvas + div {
            position: absolute !important;
            inset: 0 !important;
            pointer-events: none;
            background: transparent !important;
            color: currentColor !important;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace !important;
            font-size: ${fontSize}px !important;
            line-height: 1em !important;
            letter-spacing: 0.03em !important;
          }
        `}</style>
      </div>

      {/* Foreground: minimalist copy left-aligned with enhanced readability */}
      <div 
        style={{ 
          position: 'relative',
          zIndex: 2,
          display: 'flex', 
          alignItems: 'center', 
          minHeight: '100vh',
          padding: 'clamp(1.5rem, 5vw, 3rem)',
          maxWidth: '750px',
        }}
        className="hero-content"
      >
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          padding: 'clamp(1.5rem, 5vw, 3rem)',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        }}>
          <h1 style={{ 
            fontSize: 'clamp(26px, 4vw, 58px)', 
            margin: 0, 
            lineHeight: 1.1, 
            fontWeight: 100, 
            letterSpacing: '-0.03em',
            marginBottom: '1.5rem'
          }}>
            Decoding inner speech from the brain, <br />non-invasively
          </h1>
          <p style={{ 
            fontSize: '16px', 
            lineHeight: 1.6, 
            color: '#444',
            marginBottom: '2rem',
            fontWeight: 300
          }}>
            The Parker Jones Neural Processing Lab (PNPL; pronounced &apos;pineapple&apos;) is the newest group within the Oxford Robotics Institute, established through generous funding from the UK Research and Innovation&apos;s Medical Research Council (MRC). We are interested in brains, computers, language, and robotics – all core areas of natural and artificial intelligence. As such, our work spans foundational neuroscience, machine learning methods development, and systems applications such as Brain Computer Interfaces (BCIs).
          </p>
          <div 
            className="buttons-container"
            style={{ 
              marginTop: '2rem', 
              display: 'flex', 
              gap: 'clamp(0.5rem, 2vw, 1rem)', 
              flexWrap: 'wrap'
            }}
          >
            <a
              href="#publications"
              className="hero-button-primary"
              style={{
                fontSize: '12px',
                color: '#000',
                textDecoration: 'none',
                border: '1px solid #000',
                padding: '0.75rem 1.5rem',
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
                transition: 'all 0.2s ease',
                display: 'inline-block'
              }}
            >
              View Research
            </a>
            <a
              href="#team"
              className="hero-button-secondary"
              style={{
                fontSize: '12px',
                color: '#666',
                textDecoration: 'none',
                border: '1px solid #ccc',
                padding: '0.75rem 1.5rem',
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
                transition: 'all 0.2s ease',
                display: 'inline-block'
              }}
            >
              Meet the Team
            </a>
          </div>
          <div 
            className="logos-container"
            style={{
              marginTop: '2rem',
              paddingTop: '1rem',
              borderTop: '1px solid #eee',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 'clamp(0.5rem, 2vw, 1rem)',
              flexWrap: 'wrap'
            }}
          >
            <Image
              src="/pnpl-logo.png"
              alt="PNPL Logo"
              width={120}
              height={120}
              style={{
                objectFit: 'contain',
                opacity: 0.8,
                height: '80px'
              }}
            />
            <Image
              src="/ori-logo-color.png"
              alt="Oxford Robotics Institute"
              width={120}
              height={120}
              style={{
                objectFit: 'contain',
                opacity: 0.8,
                height: '80px'
              }}
            />
            <Image
              src="/oxford-logo-color.png"
              alt="University of Oxford"
              width={200}
              height={120}
              style={{
                objectFit: 'contain',
                opacity: 0.8,
                height: '80px'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

useGLTF.preload('/model.glb');

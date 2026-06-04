import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Cloud, Stars, Float, Sparkles, MeshDistortMaterial, Html } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// THEME CONFIGURATION
const THEME = {
  light: {
    bg: '#ffb6c1',
    caveFog: '#ff8da1',
    gardenFog: '#ffb6c1',
    ambient: '#fff0f5',
    directional: '#ffdfba',
    caveWall: '#ffb6c1',
    caveEmissive: '#2a0018',
    crystalEmissive: '#ff69b4',
    sparkles: '#ffdfba',
    blossom: '#ffc0cb',
    blossomEmissive: '#ffc0cb',
    cloud1: '#ffb6c1',
    cloud2: '#ffc0cb',
    centerpiece: '#ffb6c1',
    centerpieceEmissive: '#ff69b4'
  },
  dark: {
    bg: '#120518', // deep dark plum
    caveFog: '#1a0725', // dark violet fog
    gardenFog: '#120518',
    ambient: '#3a1f4a', // amethyst
    directional: '#ffd1dc', // soft rose gold moonlight
    caveWall: '#1f0d2b', // deep violet rock
    caveEmissive: '#0d0411', // almost black plum
    crystalEmissive: '#ff2a85', // glowing neon hot pink
    sparkles: '#ff85e0', // soft glowing pink fireflies
    blossom: '#d785ff', // glowing bright lilac
    blossomEmissive: '#d785ff',
    cloud1: '#261132', // dark violet nebula
    cloud2: '#1c0c26',
    centerpiece: '#3a1f4a',
    centerpieceEmissive: '#ff2a85'
  }
};

// Utility to cleanly lerp colors
function lerpColor(ref, targetHex, speed = 0.02) {
  if (ref && ref.current) {
    const target = new THREE.Color(targetHex);
    ref.current.lerp(target, speed);
  }
}

// --------------------------------------------------------
// 1. SCROLL CAMERA CONTROLLER
// --------------------------------------------------------
function ScrollCameraController({ introComplete, theme }) {
  const { camera, mouse, scene } = useThree();
  const cameraGroup = useRef();
  const progressRef = useRef({ val: 0 }); // To track scroll progress for fog interpolation
  
  useEffect(() => {
    if (introComplete) {
      cameraGroup.current.position.z = -100;
      progressRef.current.val = 1;
      return;
    }

    // Force initial position immediately
    if (cameraGroup.current) cameraGroup.current.position.z = 50;

    const st = ScrollTrigger.create({
      trigger: '#intro-zone',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        progressRef.current.val = self.progress;
        cameraGroup.current.position.z = THREE.MathUtils.lerp(50, -100, self.progress);
      }
    });
    return () => st.kill();
  }, [introComplete]);

  useFrame((state) => {
    // Cinematic subtle pan/float
    const time = state.clock.getElapsedTime();
    const targetX = mouse.x * 2 + Math.sin(time * 0.5) * 0.5;
    const targetY = mouse.y * 2 + Math.cos(time * 0.3) * 0.5;
    
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05);
    camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, -mouse.x * 0.05, 0.05);
    camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, mouse.y * 0.05, 0.05);

    // Smooth Theme Morphing for Scene Background & Fog
    if (scene.background) lerpColor({ current: scene.background }, THEME[theme].bg);
    if (scene.fog) {
      // The target fog color depends on scroll depth (cave vs garden) AND theme
      const caveFogTarget = new THREE.Color(THEME[theme].caveFog);
      const gardenFogTarget = new THREE.Color(THEME[theme].gardenFog);
      
      const currentTarget = new THREE.Color().lerpColors(caveFogTarget, gardenFogTarget, progressRef.current.val);
      scene.fog.color.lerp(currentTarget, 0.05);
    }
  });
  
  return (
    <group ref={cameraGroup}>
      <primitive object={camera} />
    </group>
  );
}

// --------------------------------------------------------
// 2. THE MAGICAL CAVE
// --------------------------------------------------------
function MagicalCave({ theme }) {
  const caveMat = useRef();
  const crystalMat = useRef();
  const light1 = useRef();
  const light2 = useRef();

  useFrame(() => {
    if (caveMat.current) {
      lerpColor({ current: caveMat.current.color }, THEME[theme].caveWall);
      lerpColor({ current: caveMat.current.emissive }, THEME[theme].caveEmissive);
    }
    if (crystalMat.current) {
      lerpColor({ current: crystalMat.current.emissive }, THEME[theme].crystalEmissive);
    }
    if (light1.current) lerpColor({ current: light1.current.color }, THEME[theme].crystalEmissive);
    if (light2.current) lerpColor({ current: light2.current.color }, THEME[theme].caveWall);
  });

  const curve = useMemo(() => new THREE.LineCurve3(new THREE.Vector3(0, 0, 60), new THREE.Vector3(0, 0, -5)), []);

  return (
    <group>
      <mesh>
        <tubeGeometry args={[curve, 64, 15, 32, false]} />
        <meshPhysicalMaterial ref={caveMat} roughness={0.8} metalness={0.1} side={THREE.BackSide} />
      </mesh>

      {/* Shared crystal material for performance */}
      <meshStandardMaterial ref={crystalMat} color="#fff" emissiveIntensity={2} />

      {Array.from({ length: 40 }).map((_, i) => {
        const z = 50 - (i * 1.5);
        const angle = Math.random() * Math.PI * 2;
        const radius = 14; 
        return (
          <Float key={i} speed={2} floatIntensity={0.5} rotationIntensity={0.5} position={[Math.cos(angle) * radius, Math.sin(angle) * radius, z]}>
            <mesh rotation={[Math.random(), Math.random(), Math.random()]} material={crystalMat.current}>
              <dodecahedronGeometry args={[Math.random() * 0.5 + 0.5]} />
            </mesh>
          </Float>
        );
      })}

      <Sparkles count={500} scale={[25, 25, 60]} position={[0, 0, 25]} size={4} speed={0.2} opacity={0.5} color={theme === 'dark' ? THEME.dark.sparkles : THEME.light.sparkles} />
      <pointLight ref={light1} position={[0, 0, 40]} intensity={2} distance={30} />
      <pointLight ref={light2} position={[0, 0, 20]} intensity={2} distance={30} />
    </group>
  );
}

// --------------------------------------------------------
// 3. THE MAGICAL GARDEN
// --------------------------------------------------------
function FloatingBlossoms({ theme }) {
  const count = 300;
  const mesh = useRef();
  const mat = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const blossoms = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 80;
      const y = (Math.random() - 0.5) * 80;
      const z = -10 - Math.random() * 120;
      const rotSpeed = Math.random() * 0.02;
      const scale = Math.random() * 0.5 + 0.2;
      temp.push({ x, y, z, rotSpeed, scale });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (mat.current) {
      lerpColor({ current: mat.current.color }, THEME[theme].blossom);
      lerpColor({ current: mat.current.emissive }, THEME[theme].blossomEmissive);
    }

    const time = state.clock.getElapsedTime();
    blossoms.forEach((b, i) => {
      b.x += Math.sin(time + i) * 0.01;
      b.y -= 0.02; 
      if (b.y < -40) b.y = 40; 
      
      dummy.position.set(b.x, b.y, b.z);
      dummy.rotation.set(time * b.rotSpeed, time * b.rotSpeed, 0);
      dummy.scale.setScalar(b.scale);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <coneGeometry args={[0.2, 0.5, 5]} />
      <meshStandardMaterial ref={mat} emissiveIntensity={0.5} side={THREE.DoubleSide} />
    </instancedMesh>
  );
}

function MagicalGarden({ theme }) {
  const ambLight = useRef();
  const dirLight = useRef();
  const centerMat = useRef();

  useFrame(() => {
    if (ambLight.current) lerpColor({ current: ambLight.current.color }, THEME[theme].ambient);
    if (dirLight.current) lerpColor({ current: dirLight.current.color }, THEME[theme].directional);
    if (centerMat.current) {
      lerpColor({ current: centerMat.current.color }, THEME[theme].centerpiece);
      lerpColor({ current: centerMat.current.emissive }, THEME[theme].centerpieceEmissive);
    }
  });

  return (
    <group>
      <ambientLight ref={ambLight} intensity={0.5} />
      <directionalLight ref={dirLight} position={[10, 20, -50]} intensity={1.5} />
      
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
        <Cloud opacity={0.6} speed={0.2} color={theme === 'dark' ? THEME.dark.cloud1 : THEME.light.cloud1} position={[20, 10, -20]} scale={5} />
        <Cloud opacity={0.5} speed={0.1} color={theme === 'dark' ? THEME.dark.cloud2 : THEME.light.cloud2} position={[-20, -5, -40]} scale={6} />
        <Cloud opacity={0.7} speed={0.3} color={theme === 'dark' ? THEME.dark.cloud1 : THEME.light.cloud1} position={[0, 15, -60]} scale={8} />
      </Float>

      <Sparkles count={1500} scale={[80, 80, 150]} position={[0, 0, -60]} size={6} speed={0.5} opacity={0.8} color={theme === 'dark' ? THEME.dark.sparkles : THEME.light.sparkles} />
      
      <Float speed={2} rotationIntensity={1} floatIntensity={1} position={[0, 2, -110]}>
        <mesh>
          <torusKnotGeometry args={[3, 0.8, 128, 32]} />
          <MeshDistortMaterial ref={centerMat} emissiveIntensity={1} clearcoat={1} distort={0.3} speed={2} />
        </mesh>
      </Float>

      <FloatingBlossoms theme={theme} />
    </group>
  );
}

export default function DreamWorldCanvas({ introComplete, theme }) {
  // Pre-initialize scene colors to avoid white flashes
  const bgInit = new THREE.Color(THEME[theme].bg);
  const fogInit = new THREE.Color(THEME[theme].caveFog);

  return (
    <Canvas camera={{ position: [0, 0, 0], fov: 60 }} gl={{ antialias: false }}>
      <color attach="background" args={[bgInit]} />
      <fog attach="fog" args={[fogInit, 0, 40]} />
      
      <ScrollCameraController introComplete={introComplete} theme={theme} />
      
      <MagicalCave theme={theme} />
      <MagicalGarden theme={theme} />
      
      {/* High-End Cinematic Post-Processing */}
      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={0.15} mipmapBlur intensity={1.5} radius={0.8} />
        <Vignette eskil={false} offset={0.1} darkness={0.6} />
      </EffectComposer>
    </Canvas>
  );
}

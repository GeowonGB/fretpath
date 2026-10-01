import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useSettingsStore } from '../../lib/settings';

export type OrbState = 'idle' | 'speaking' | 'listening' | 'thinking';

interface OrbRendererProps {
  orbState: OrbState;
}

export default function OrbRenderer({ orbState }: OrbRendererProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<OrbState>(orbState);
  const settings = useSettingsStore();

  // Keep the ref in sync with the prop
  useEffect(() => {
    stateRef.current = orbState;
  }, [orbState]);

  useEffect(() => {
    if (!mountRef.current || settings.reducedMotion) return;

    // Setup scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    // Cap pixel ratio as per requirements
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Get dimensions from parent container
    const size = mountRef.current.clientWidth || 100;
    renderer.setSize(size, size);
    mountRef.current.appendChild(renderer.domElement);

    // Create orb
    const geometry = new THREE.IcosahedronGeometry(1.2, 2);
    
    // Wireframe material for the tech/AI look
    const material = new THREE.MeshBasicMaterial({ 
      color: 0x06b6d4, // cyan
      wireframe: true,
      transparent: true,
      opacity: 0.6
    });
    
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Add glow effect using a slightly larger inner sphere
    const glowGeometry = new THREE.IcosahedronGeometry(1.15, 3);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0xf59e0b, // amber
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending
    });
    const glowSphere = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glowSphere);

    // Particles for 'thinking' state
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 40;
    const posArray = new Float32Array(particleCount * 3);
    for(let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 4;
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0xf59e0b,
      transparent: true,
      opacity: 0
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Animation variables
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      // Pause rendering if document is hidden to save performance
      if (document.hidden) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Base rotation
      sphere.rotation.y += 0.5 * delta;
      sphere.rotation.x += 0.2 * delta;
      glowSphere.rotation.y -= 0.3 * delta;

      // State-based animations
      const currentState = stateRef.current;
      
      if (currentState === 'idle') {
        const scale = 1 + Math.sin(time * 2) * 0.05;
        sphere.scale.set(scale, scale, scale);
        glowSphere.scale.set(1, 1, 1);
        particleMaterial.opacity = THREE.MathUtils.lerp(particleMaterial.opacity, 0, 0.1);
      } 
      else if (currentState === 'speaking') {
        // Aggressive pulse linked to time for a "talking" effect
        const scale = 1 + (Math.sin(time * 15) * 0.5 + 0.5) * 0.15 + Math.random() * 0.05;
        sphere.scale.set(scale, scale, scale);
        
        // Intensify glow
        glowSphere.scale.set(1.1 + Math.sin(time * 10) * 0.1, 1.1 + Math.sin(time * 10) * 0.1, 1.1 + Math.sin(time * 10) * 0.1);
        
        material.color.setHex(0xf59e0b); // amber when speaking
        particleMaterial.opacity = THREE.MathUtils.lerp(particleMaterial.opacity, 0, 0.1);
      }
      else if (currentState === 'thinking') {
        const scale = 1 + Math.sin(time * 4) * 0.02;
        sphere.scale.set(scale, scale, scale);
        material.color.setHex(0x06b6d4);
        
        // Orbit particles
        particles.rotation.y += 1 * delta;
        particleMaterial.opacity = THREE.MathUtils.lerp(particleMaterial.opacity, 0.6, 0.05);
      }
      else if (currentState === 'listening') {
        const scale = 1 + Math.sin(time * 8) * 0.1;
        sphere.scale.set(scale, scale, scale);
        material.color.setHex(0x10b981); // emerald
        particleMaterial.opacity = THREE.MathUtils.lerp(particleMaterial.opacity, 0, 0.1);
      }

      // Smoothly return color to cyan when not speaking/listening/thinking
      if (currentState === 'idle') {
        material.color.lerp(new THREE.Color(0x06b6d4), 0.05);
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!mountRef.current) return;
      const newSize = mountRef.current.clientWidth;
      renderer.setSize(newSize, newSize);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup (dispose all GL resources)
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      
      geometry.dispose();
      material.dispose();
      glowGeometry.dispose();
      glowMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      
      renderer.dispose();
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [settings.reducedMotion]);

  if (settings.reducedMotion) {
    // Fallback 2D canvas/CSS orb
    return (
      <div className="w-full h-full rounded-full bg-stone-900 border-2 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.3)] flex items-center justify-center overflow-hidden relative">
        <div className={`absolute inset-0 bg-amber-500/20 transition-opacity duration-1000 ${orbState === 'speaking' ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className="w-1/2 h-1/2 rounded-full bg-cyan-400/30 blur-md"></div>
      </div>
    );
  }

  return <div ref={mountRef} className="w-full h-full pointer-events-none" />;
}

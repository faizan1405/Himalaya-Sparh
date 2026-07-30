'use client';

import { useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';

export function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particle system
    const count = 600;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const speeds = new Float32Array(count);
    const phases = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 120;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60;
      sizes[i] = Math.random() * 2.5 + 0.5;
      speeds[i] = Math.random() * 0.3 + 0.1;
      phases[i] = Math.random() * Math.PI * 2;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Custom shader for soft, glowing particles
    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: renderer.getPixelRatio() },
        uColorA: { value: new THREE.Color('#4DA8FF') },
        uColorB: { value: new THREE.Color('#5ED6C2') },
      },
      vertexShader: `
        attribute float size;
        uniform float uTime;
        uniform float uPixelRatio;
        varying float vAlpha;
        varying float vMix;

        void main() {
          vec3 pos = position;
          pos.y += sin(uTime * 0.3 + position.x * 0.05) * 1.5;
          pos.x += cos(uTime * 0.2 + position.y * 0.04) * 1.0;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          gl_PointSize = size * uPixelRatio * (40.0 / -mvPosition.z);

          vAlpha = smoothstep(80.0, 10.0, -mvPosition.z) * 0.6;
          vMix = (sin(position.x * 0.1 + uTime * 0.15) + 1.0) * 0.5;
        }
      `,
      fragmentShader: `
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        varying float vAlpha;
        varying float vMix;

        void main() {
          float d = length(gl_PointCoord - 0.5);
          if (d > 0.5) discard;
          float alpha = smoothstep(0.5, 0.05, d) * vAlpha;
          vec3 color = mix(uColorA, uColorB, vMix);
          gl_FragColor = vec4(color, alpha);
        }
      `,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Floating light orbs (large, blurry spheres)
    const orbs = useMemo(() => {
      const orbData: any[] = [];
      const orbColors = [
        { color: '#4DA8FF', opacity: 0.04, scale: 18 },
        { color: '#5ED6C2', opacity: 0.035, scale: 15 },
        { color: '#4DA8FF', opacity: 0.03, scale: 20 },
        { color: '#5ED6C2', opacity: 0.025, scale: 12 },
      ];

      orbColors.forEach((cfg, i) => {
        const orbGeometry = new THREE.SphereGeometry(1, 16, 16);
        const orbMaterial = new THREE.MeshBasicMaterial({
          color: new THREE.Color(cfg.color),
          transparent: true,
          opacity: cfg.opacity,
        });
        const orb = new THREE.Mesh(orbGeometry, orbMaterial);
        orb.position.set(
          (Math.random() - 0.5) * 60,
          (Math.random() - 0.5) * 40,
          -15 - Math.random() * 20
        );
        orb.scale.setScalar(cfg.scale);
        orb.userData = {
          baseX: orb.position.x,
          baseY: orb.position.y,
          speed: 0.15 + Math.random() * 0.2,
          amplitude: 3 + Math.random() * 5,
          phase: Math.random() * Math.PI * 2,
        };
        scene.add(orb);
        orbData.push(orb);
      });

      return orbData;
    }, []);

    // Mouse tracking
    const mouse = useRef({ x: 0, y: 0 });
    const targetMouse = useRef({ x: 0, y: 0 });

    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse follow
      mouse.current.x += (targetMouse.current.x - mouse.current.x) * 0.03;
      mouse.current.y += (targetMouse.current.y - mouse.current.y) * 0.03;

      // Update particle uniforms
      material.uniforms.uTime.value = elapsed;

      // Rotate particle field subtly based on mouse
      points.rotation.y = elapsed * 0.02 + mouse.current.x * 0.15;
      points.rotation.x = mouse.current.y * 0.08;

      // Animate orbs
      orbs.forEach((orb) => {
        const ud = orb.userData;
        orb.position.x = ud.baseX + Math.sin(elapsed * ud.speed + ud.phase) * ud.amplitude;
        orb.position.y = ud.baseY + Math.cos(elapsed * ud.speed * 0.7 + ud.phase) * ud.amplitude * 0.6;
      });

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      orbs.forEach(orb => {
        orb.geometry.dispose();
        (orb.material as THREE.Material).dispose();
      });
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} id="bg-canvas" aria-hidden="true" />;
}

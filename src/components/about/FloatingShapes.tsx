"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type ShapeConfig = {
  geometry: () => THREE.BufferGeometry;
  color: string;
  position: [number, number, number];
  scale: number;
  speed: number;
};

const shapes: ShapeConfig[] = [
  {
    geometry: () => new THREE.IcosahedronGeometry(1, 1),
    color: "#ff8a3d",
    position: [-3.2, 1.4, 0],
    scale: 0.9,
    speed: 0.4,
  },
  {
    geometry: () => new THREE.TorusKnotGeometry(0.6, 0.22, 100, 16),
    color: "#3ddc97",
    position: [3.4, -0.8, -1],
    scale: 0.85,
    speed: 0.55,
  },
  {
    geometry: () => new THREE.SphereGeometry(0.9, 32, 32),
    color: "#ffb066",
    position: [2.6, 1.8, 1],
    scale: 0.6,
    speed: 0.3,
  },
  {
    geometry: () => new THREE.OctahedronGeometry(0.8, 0),
    color: "#8a5127",
    position: [-2.8, -1.6, 0.5],
    scale: 0.7,
    speed: 0.45,
  },
];

export default function FloatingShapes() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cleanup = () => {};

    try {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const getWidth = () => container.clientWidth || window.innerWidth;
      const getHeight = () => container.clientHeight || window.innerHeight;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        40,
        getWidth() / getHeight(),
        0.1,
        100
      );
      camera.position.set(0, 0, 9);

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "low-power",
      });
      renderer.setClearColor(0x000000, 0);
      renderer.setSize(getWidth(), getHeight());
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      container.appendChild(renderer.domElement);

      // lighting — soft key + fill, gives that toy-like matte 3D look
      const key = new THREE.DirectionalLight(0xffffff, 1.4);
      key.position.set(4, 5, 6);
      scene.add(key);

      const fill = new THREE.DirectionalLight(0x88aaff, 0.5);
      fill.position.set(-5, -2, 3);
      scene.add(fill);

      const ambient = new THREE.AmbientLight(0xffffff, 0.35);
      scene.add(ambient);

      const meshes = shapes.map((s) => {
        const geo = s.geometry();
        const mat = new THREE.MeshStandardMaterial({
          color: s.color,
          roughness: 0.35,
          metalness: 0.1,
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(...s.position);
        mesh.scale.setScalar(s.scale);
        scene.add(mesh);
        return { mesh, speed: s.speed, baseY: s.position[1] };
      });

      const handleResize = () => {
        const w = getWidth();
        const h = getHeight();
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };

      window.addEventListener("resize", handleResize);
      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(container);

      let raf = 0;
      const animate = (time: number) => {
        const t = time * 0.001;
        meshes.forEach(({ mesh, speed, baseY }, i) => {
          if (!prefersReducedMotion) {
            mesh.rotation.x = t * speed * 0.5;
            mesh.rotation.y = t * speed;
            mesh.position.y = baseY + Math.sin(t * speed + i) * 0.25;
          }
        });
        renderer.render(scene, camera);
        raf = requestAnimationFrame(animate);
      };
      raf = requestAnimationFrame(animate);

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", handleResize);
        resizeObserver.disconnect();
        meshes.forEach(({ mesh }) => {
          mesh.geometry.dispose();
          (mesh.material as THREE.Material).dispose();
        });
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("FloatingShapes failed to initialize:", err);
    }

    return () => cleanup();
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        width: "100%",
        height: "100%",
      }}
    />
  );
}
import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles"; 
import type { Engine } from "@tsparticles/engine";

export const ParticlesBackground = ({ theme }: { theme: string }) => {
  const [init, setInit] = useState(false);

  // Inicializar el motor de partículas una sola vez
  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      className="absolute inset-0 z-0"
      options={{
        background: {
          color: { value: "transparent" },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab",
            },
          },
          modes: {
            grab: {
              distance: 140,
              links: { opacity: 0.5 }
            },
          },
        },
        particles: {
          color: {
            value: theme === 'dark' ? "#00B8A0" : "#00B8A0",
          },
          links: {
            color: theme === 'dark' ? "#00B8A0" : "#00B8A0",
            distance: 150,
            enable: true,
            opacity: 0.3,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            outModes: { default: "out" },
          },
          number: {
            density: { enable: true },
            value: 100,
          },
          opacity: {
            value: 0.5,
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        detectRetina: true,
      }}
    />
  );
};
import { useEffect, useState, useRef } from "react";

export function useGamepadCursor() {
  const [gamepadActive, setGamepadActive] = useState(false);
  const lastMoveTime = useRef(0);

  useEffect(() => {
    let raf;

    const checkGamepad = () => {
      const pads = navigator.getGamepads?.() || [];
      const pad = Array.from(pads).find(p => p);

      if (pad) {
        const x = pad.axes[0];
        const y = pad.axes[1];

        const moved = Math.abs(x) > 0.2 || Math.abs(y) > 0.2;

        if (moved) {
          lastMoveTime.current = Date.now();
          setGamepadActive(true);
        }

        // désactive si inactif longtemps
        if (Date.now() - lastMoveTime.current > 2000) {
          setGamepadActive(false);
        }
      } else {
        setGamepadActive(false);
      }

      raf = requestAnimationFrame(checkGamepad);
    };

    raf = requestAnimationFrame(checkGamepad);

    return () => cancelAnimationFrame(raf);
  }, []);

  return gamepadActive;
}
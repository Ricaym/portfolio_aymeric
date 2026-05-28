import { useEffect, useRef, useState } from "react";

export function useGamepadNavigation() {
  const cursorRef = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  const [cursor, setCursor] = useState(cursorRef.current);
  const [pressed, setPressed] = useState({});

  useEffect(() => {
    let frame;

    const deadZone = 0.05;
    const speed = 12;

    let prevA = false;

    const loop = () => {
      const pads = navigator.getGamepads();
      const pad = pads[0];

      if (pad) {
        // --- STICK GAUCHE
        let x = pad.axes[0];
        let y = pad.axes[1];

        if (Math.abs(x) < deadZone) x = 0;
        if (Math.abs(y) < deadZone) y = 0;

        cursorRef.current.x += x * speed;
        cursorRef.current.y += y * speed;

        cursorRef.current.x = Math.max(
          0,
          Math.min(window.innerWidth, cursorRef.current.x)
        );
        cursorRef.current.y = Math.max(
          0,
          Math.min(window.innerHeight, cursorRef.current.y)
        );

        setCursor({ ...cursorRef.current });

        // --- BUTTONS
        const aPressed = pad.buttons[0].pressed;

        setPressed({
          a: aPressed,
          b: pad.buttons[1].pressed,
          x: pad.buttons[2].pressed,
          y: pad.buttons[3].pressed,
        });

        // --- CLICK A
        if (aPressed && !prevA) {
          const el = document.elementFromPoint(
            cursorRef.current.x,
            cursorRef.current.y
          );

          if (el) el.click();
        }

        prevA = aPressed;
      }

      frame = requestAnimationFrame(loop);
    };

    loop();

    return () => cancelAnimationFrame(frame);
  }, []);

  return { cursor, pressed };
}
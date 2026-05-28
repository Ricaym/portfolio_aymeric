import { useEffect, useRef, useState } from "react";

export function useHybridCursor() {
  const cursor = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  const [renderCursor, setRenderCursor] = useState(cursor.current);

  useEffect(() => {
    let frame;

    const deadZone = 0.15;
    const speed = 10;

    // --- MOUSE CONTROL (absolu)
    const onMouseMove = (e) => {
      cursor.current.x = e.clientX;
      cursor.current.y = e.clientY;
      setRenderCursor({ ...cursor.current });
    };

    window.addEventListener("mousemove", onMouseMove);

    const loop = () => {
      const pads = navigator.getGamepads();
      const pad = pads[0];

      if (pad) {
        let x = pad.axes[0];
        let y = pad.axes[1];

        if (Math.abs(x) < deadZone) x = 0;
        if (Math.abs(y) < deadZone) y = 0;

        // --- GAMEPAD CONTROL (relatif)
        cursor.current.x += x * speed;
        cursor.current.y += y * speed;

        // clamp écran
        cursor.current.x = Math.max(0, Math.min(window.innerWidth, cursor.current.x));
        cursor.current.y = Math.max(0, Math.min(window.innerHeight, cursor.current.y));

        setRenderCursor({ ...cursor.current });
      }

      frame = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return { cursor: renderCursor };
}
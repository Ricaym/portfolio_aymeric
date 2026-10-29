
import { useEffect, useRef, useState } from "react";

export function useGamepadNavigation(
    enabled = true,
    position,
    setPosition
) {
    const positionRef = useRef(position);
    const hoveredElementRef = useRef(null);
    const [pressed, setPressed] = useState({});

    useEffect(() => {
        positionRef.current = position;
    }, [position]);

    useEffect(() => {
        if (!enabled) {
            hoveredElementRef.current?.classList.remove("gamepad-hover");
            hoveredElementRef.current = null;
            setPressed({});
            return;
        }

        let frame;
        let prevA = false;
        let prevY = false;

        const deadZone = 0.15;
        const speed = 12;

        const loop = () => {
            const pad = Array.from(navigator.getGamepads()).find(
                (gamepad) => gamepad?.connected
            );

            if (pad) {
                let x = pad.axes[0] ?? 0;
                let y = pad.axes[1] ?? 0;

                if (Math.abs(x) < deadZone) x = 0;
                if (Math.abs(y) < deadZone) y = 0;

                if (x !== 0 || y !== 0) {
                    const next = {
                        x: Math.max(0, Math.min(
                            window.innerWidth - 1,
                            positionRef.current.x + x * speed
                        )),
                        y: Math.max(0, Math.min(
                            window.innerHeight - 1,
                            positionRef.current.y + y * speed
                        )),
                    };

                    positionRef.current = next;
                    setPosition(next);
                }

                const element = document.elementFromPoint(
                    positionRef.current.x,
                    positionRef.current.y
                );

                const hovered = element?.closest(
                    "button, div, a, [data-gamepad-hover]"
                );

                if (hovered !== hoveredElementRef.current) {
                    hoveredElementRef.current?.classList.remove(
                        "gamepad-hover"
                    );
                    hovered?.classList.add("gamepad-hover");
                    hoveredElementRef.current = hovered;
                }

                const aPressed = pad.buttons[0]?.pressed ?? false;
                const yPressed = pad.buttons[3]?.pressed ?? false;

                if (aPressed && !prevA) {
                    element?.click();
                }

                if (yPressed && !prevY) {
                    window.location.reload();
                }

                prevA = aPressed;
                prevY = yPressed;

                setPressed((prev) => {
                    const next = {
                        a: aPressed,
                        b: pad.buttons[1]?.pressed ?? false,
                        x: pad.buttons[2]?.pressed ?? false,
                        y: yPressed,
                    };

                    return Object.keys(next).every(
                        (key) => prev[key] === next[key]
                    ) ? prev : next;
                });
            }

            frame = requestAnimationFrame(loop);
        };

        frame = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(frame);
            hoveredElementRef.current?.classList.remove("gamepad-hover");
            hoveredElementRef.current = null;
        };
    }, [enabled, setPosition]);

    return { pressed };
}

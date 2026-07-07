import { useEffect, useRef, useState } from "react";

export function useGamepadNavigation(enabled = true) {
	const cursorRef = useRef({
		x: window.innerWidth / 2,
		y: window.innerHeight / 2,
	});

	const hoveredElementRef = useRef(null);

	const [cursor, setCursor] = useState(cursorRef.current);
	const [pressed, setPressed] = useState({});

	useEffect(() => {
		let frame;

		const deadZone = 0;
		const speed = 12;

		let prevA = false;
		let prevY = false;

		const loop = () => {
			const pads = navigator.getGamepads();
			const pad = pads[0];

			if (pad) {
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

				const elementUnderCursor = document.elementFromPoint(
					cursorRef.current.x,
					cursorRef.current.y
				);

				const hoveredElement = elementUnderCursor?.closest(
					"button, div, a, [data-gamepad-hover]"
				);

				if (hoveredElementRef.current !== hoveredElement) {
					if (hoveredElementRef.current) {
						hoveredElementRef.current.classList.remove(
							"gamepad-hover"
						);
					}

					if (hoveredElement) {
						hoveredElement.classList.add("gamepad-hover");
					}

					hoveredElementRef.current = hoveredElement;
				}

				const aPressed = pad.buttons[0]?.pressed || false;
				const yPressed = pad.buttons[3]?.pressed || false;

				setPressed({
					a: aPressed,
					b: pad.buttons[1]?.pressed || false,
					x: pad.buttons[2]?.pressed || false,
					y: yPressed,
				});

				if (aPressed && !prevA) {
					const el = document.elementFromPoint(
						cursorRef.current.x,
						cursorRef.current.y
					);

					if (el) el.click();
				}

				if (yPressed && !prevY) {
					window.location.reload();
				}

				prevA = aPressed;
				prevY = yPressed;
			}

			frame = requestAnimationFrame(loop);
		};

		loop();

		return () => {
			cancelAnimationFrame(frame);

			if (hoveredElementRef.current) {
				hoveredElementRef.current.classList.remove("gamepad-hover");
				hoveredElementRef.current = null;
			}
		};
	}, []);

	return { cursor, pressed };
}
import { useEffect, useRef, useState } from "react";

export function useHybridCursor() {
	const cursor = useRef({
		x: window.innerWidth / 2,
		y: window.innerHeight / 2,
	});

	const [renderCursor, setRenderCursor] = useState(cursor.current);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		let frame;

		const deadZone = 0;
		const speed = 10;

		const onMouseMove = (e) => {
			cursor.current.x = e.clientX;
			cursor.current.y = e.clientY;

			setVisible(true);
			setRenderCursor({ ...cursor.current });
		};

		const hideMouseCursor = () => {
			setVisible(false);
		};

		window.addEventListener("mousemove", onMouseMove);
		window.addEventListener("mouseleave", hideMouseCursor);
		document.addEventListener("mouseleave", hideMouseCursor);

		const loop = () => {
			const pads = navigator.getGamepads?.() || [];
			const pad = pads[0];

			if (pad) {
				let x = pad.axes[0] || 0;
				let y = pad.axes[1] || 0;

				if (Math.abs(x) < deadZone) x = 0;
				if (Math.abs(y) < deadZone) y = 0;

				const isMoving = x !== 0 || y !== 0;

				if (isMoving) {
					cursor.current.x += x * speed;
					cursor.current.y += y * speed;

					cursor.current.x = Math.max(
						0,
						Math.min(window.innerWidth, cursor.current.x)
					);

					cursor.current.y = Math.max(
						0,
						Math.min(window.innerHeight, cursor.current.y)
					);

					setVisible(true);
					setRenderCursor({ ...cursor.current });
				}
			}

			frame = requestAnimationFrame(loop);
		};

		loop();

		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener("mousemove", onMouseMove);
			window.removeEventListener("mouseleave", hideMouseCursor);
			document.removeEventListener("mouseleave", hideMouseCursor);
		};
	}, []);

	return { cursor: renderCursor, visible };
}
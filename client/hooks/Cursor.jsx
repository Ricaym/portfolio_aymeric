import { useEffect, useState } from "react";

export default function Cursor() {
	const [position, setPosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const moveCursor = (e) => {
		setPosition({
			x: e.clientX,
			y: e.clientY,
		});
		};

		window.addEventListener("mousemove", moveCursor);

		return () => {
		window.removeEventListener("mousemove", moveCursor);
		};
	}, []);

	return (
		<div className="Cursor" style={{left: position.x, top: position.y,}}/>
	);
}
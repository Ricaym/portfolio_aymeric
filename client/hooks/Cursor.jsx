import { useEffect, useState } from "react";

export default function Cursor() {
	const [position, setPosition] = useState(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const showCursor = (e) => {
			setPosition({
				x: e.clientX,
				y: e.clientY,
			});
			setIsVisible(true);
		};

		const hideCursor = () => {
			setIsVisible(false);
			setPosition(null);
		};

		const handleMouseOut = (e) => {
			// relatedTarget === null signifie que la souris quitte vraiment la fenêtre
			if (!e.relatedTarget) {
				hideCursor();
			}
		};

		window.addEventListener("mousemove", showCursor);
		window.addEventListener("mouseout", handleMouseOut);
		window.addEventListener("blur", hideCursor);
		document.addEventListener("mouseleave", hideCursor);

		return () => {
			window.removeEventListener("mousemove", showCursor);
			window.removeEventListener("mouseout", handleMouseOut);
			window.removeEventListener("blur", hideCursor);
			document.removeEventListener("mouseleave", hideCursor);
		};
	}, []);

	if (!isVisible || !position) return null;

	return (
		<div
			className="Cursor"
			style={{
				left: position.x,
				top: position.y,
			}}
		/>
	);
}
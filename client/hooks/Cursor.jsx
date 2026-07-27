import { useEffect, useState } from "react";

export default function Cursor() {
	const [position, setPosition] = useState(null);
	const [isVisible, setIsVisible] = useState(false);
	const [isPointer, setIsPointer] = useState(false);

	useEffect(() => {
		const handleMouseMove = (e) => {
			setPosition({
				x: e.clientX,
				y: e.clientY,
			});

			setIsVisible(true);

			const hoveredElement = e.target.closest(
				`
					a,
					button,
					input,
					select,
					textarea,
					[data-cursor-hover]
				`
			);

			setIsPointer(Boolean(hoveredElement));
		};

		const hideCursor = () => {
			setIsVisible(false);
			setPosition(null);
			setIsPointer(false);
		};

		const handleMouseOut = (e) => {
			if (!e.relatedTarget) {
				hideCursor();
			}
		};

		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("mouseout", handleMouseOut);
		window.addEventListener("blur", hideCursor);
		document.addEventListener("mouseleave", hideCursor);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mouseout", handleMouseOut);
			window.removeEventListener("blur", hideCursor);
			document.removeEventListener("mouseleave", hideCursor);
		};
	}, []);

	if (!isVisible || !position) return null;

	return (
		<div
			className={`Cursor ${isPointer ? "Cursor--pointer" : ""}`}
			style={{
				left: `${position.x}px`,
				top: `${position.y}px`,
			}}
		>
			{isPointer && <span className="Cursor__pointer"><div className="cursorPointer"></div></span>}
		</div>
	);
}
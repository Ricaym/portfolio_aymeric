export function GamepadCursor({ x, y }) {
	return (
		<div
			style={{
				position: "fixed",
				left: x,
				top: y,
				width: 60,
				height: 60,
				borderRadius: "50%",
				border: "3px solid rgba(255, 255, 255, 0.5)",
				backdropFilter: "blur(1px)",
				transform: "translate(-51%, -51%)",
				pointerEvents: "none",
				zIndex: 9999,
			}}
		/>
	);
}
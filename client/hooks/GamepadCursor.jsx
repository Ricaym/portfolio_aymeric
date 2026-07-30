export function GamepadCursor({ x, y }) {
	return (
		<div className="gamepadCursor"
			style={{ left: x, top: y }}
		/>
	);
}
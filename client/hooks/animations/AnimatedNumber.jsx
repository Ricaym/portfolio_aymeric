import { useEffect, useState } from "react";

export default function AnimatedNumber({ value, duration = 3000 }) {
	const finalValue = value.toString();
	const [display, setDisplay] = useState(finalValue);

	useEffect(() => {
		let frame;

		const start = performance.now();
		const length = finalValue.length;

		function update(now) {
			const progress = Math.min((now - start) / duration, 1);

			// Nombre de chiffres déjà verrouillés
			const locked = Math.floor(progress * length);

			let text = "";

			for (let i = 0; i < length; i++) {
				if (i < locked || progress === 1) {
					text += finalValue[i];
				} else {
					text += Math.floor(Math.random() * 10);
				}
			}

			setDisplay(text);

			if (progress < 1) {
				frame = requestAnimationFrame(update);
			}
		}

		frame = requestAnimationFrame(update);

		return () => cancelAnimationFrame(frame);
	}, [value, duration]);

	return <p className="CharacterId">{display}</p>;
}
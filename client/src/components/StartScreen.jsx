export default function StartScreen({ onStart }) {
	return (
		<div className="StartScreen" onClick={onStart}>
			<div className="overlay">
				<p className="subtitle">Appuyer pour commencer</p>
			</div>
		</div>
	);
}
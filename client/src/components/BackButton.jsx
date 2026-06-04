function BackButton({ onBack }) {
	return (
		<button type="button" onClick={onBack} className="BackButton">
			← Retour
		</button>
	);
}

export default BackButton;
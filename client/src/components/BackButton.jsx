function BackButton({ onBack }) {
	return (
		<button
			type="button"
			onClick={onBack}
			className="back-button"
		>
			← Retour
		</button>
	);
}

export default BackButton;
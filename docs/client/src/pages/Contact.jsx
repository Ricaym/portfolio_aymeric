export default function Contact() {
	return (
		<div className="text-white max-w-xl mx-auto">
			<legend>Me contacter</legend>

			<form className="flex flex-col gap-4">
				<input placeholder="Nom" />
				<input placeholder="Email" />
				<textarea/>
				<button>Envoyer</button>
			</form>
		</div>
	);
}
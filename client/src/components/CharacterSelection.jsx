import Companion from "./Companion";
import First from "/public/1.jpg";
import Second from "/public/2.jpg";
import Third from "/public/3.jpg";

export default function CharacterSelection({ onSelect }) {
	const characters = [
		{
			name: "A propos de moi !",
			image: First,
			destination: "myself",
		},
		{
			name: "Mes Projets",
			image: Second,
			destination: "projects",
		},
		{
			name: "Mes Contacts",
			image: Third,
			destination: "contacts",
		},
	];

	return (
		<div className="CharactersSelection">
			<Companion />

			<div className="CharactersClass">
				{characters.map((character) => (
					<div key={character.name} className="CharacterCard" onClick={() => onSelect(character)}>
						<p className="CharacterName">{character.name}</p>
						<img className="CharacterImage" src={character.image} alt={character.name} />
					</div>
				))}
			</div>
		</div>
	);
}
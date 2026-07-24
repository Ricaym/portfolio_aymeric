import Companion from "./Companion";
import First from "/public/1.png";
import Second from "/public/2.png";
import Third from "/public/3.png";

export default function CharacterSelection({ onSelect }) {
	const characters = [
		{
			name: "About me",
			image: First,
			destination: "myself",
		},
		{
			name: "My projects",
			image: Second,
			destination: "projects",
		},
		{
			name: "Contact me",
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
						<i class="fi fi-br-6"></i>
					</div>
				))}
			</div>
		</div>
	);
}
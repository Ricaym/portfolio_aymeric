
import Companion from "./Companion";
import Cursor from "../../hooks/Cursor";

export default function CharacterSelection({ onSelect }) {
	const characters = [
		{
			name: "Aymeric Chassagne",
			// image: hunter,
		},
		{
			name: "Aymeric Chassagne",
			// image: hunter,
		},
		{
			name: "Aymeric Chassagne",
			// image: hunter,
		},
	];

	return (
		<div className="CharactersSelection"><Cursor/>
			<Companion/>
			<div className="CharactersClass">
				{characters.map((character) => (
					<div key={character.name} className="CharacterCard" onClick={() => onSelect(character)}>
						<p className="CharacterName">{character.name}</p>
						<img className="CharacterImage" src={character.image}/>
					</div>
				))}
			</div>
		</div>
	);
}
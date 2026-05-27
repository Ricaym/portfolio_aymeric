import hunter from "../assets/logo_portfolio.png";
import Companion from "./Companion";

export default function CharacterSelection({ onSelect }) {
	const characters = [
		{
			name: "Aymeric Chassagne",
			image: hunter,
		},
		{
			name: "Aymeric Chassagne",
			image: hunter,
		},
		{
			name: "Aymeric Chassagne",
			image: hunter,
		},
	];

	return (
		<div className="CharactersSelection">
			<Companion/>
			<div className="CharactersClass">
				{characters.map((character) => (
					<div key={character.name} className="CharacterCard" onClick={() => onSelect(character)}>
						<img src={character.image} alt={character.name}/>
						<p className="CharacterName">{character.name}</p>
					</div>
				))}
			</div>
		</div>
	);
}
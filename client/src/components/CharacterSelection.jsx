import hunter from "../assets/logo_portfolio.png";
import titan from "../assets/logo_portfolio.png";
import warlock from "../assets/logo_portfolio.png";

export default function CharacterSelection({ onSelect }) {
	const characters = [
		{
			name: "Aymeric Chassagne",
			image: hunter,
		},
		{
			name: "Aymeric Chassagne",
			image: titan,
		},
		{
			name: "Aymeric Chassagne",
			image: warlock,
		},
	];

	return (
		<div className="CharactersSelection">
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
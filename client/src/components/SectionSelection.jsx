import Companion from "./Companion";
import First from "/public/1.jpg";
import Second from "/public/2.jpg";
import Third from "/public/3.jpg";

import AnimatedNumber from "../../hooks/animations/AnimatedNumber";

export default function SectionSelection({ onSelect }) {
	const characters = [
		{
			name: "About me",
			image: First,
			destination: "myself",
			id: "2806"
		},
		{
			name: "My projects",
			image: Second,
			destination: "projects",
			id: "0832"
		},
		{
			name: "Contact me",
			image: Third,
			destination: "contacts",
			id: "3306"
		},
	];

	return (
		<div className="CharactersSelection">
			<Companion />

			<div className="CharactersClass">
				{characters.map((character) => (
					<div key={character.name} className="CharacterCard" onClick={() => onSelect(character)} data-cursor-hover>
						<p className="CharacterName">{character.name}</p>
						<img className="CharacterImage" src={character.image} alt={character.name} />
						<AnimatedNumber value={character.id} duration={3500}/>
					</div>
				))}
			</div>
		</div>
	);
}
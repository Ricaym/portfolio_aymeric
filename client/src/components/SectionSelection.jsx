import Companion from "./Companion";
import First from "/public/1.png";
import Second from "/public/2.png";
import Third from "/public/3.png";

import AnimatedNumber from "../../hooks/animations/AnimatedNumber";

export default function SectionSelection({ onSelect }) {
	const characters = [
		{
			name: "About me",
			image: First,
			destination: "myself",
			id: "28/06"
		},
		{
			name: "My projects",
			image: Second,
			destination: "projects",
			id: "8/32"
		},
		{
			name: "Contact me",
			image: Third,
			destination: "contacts",
			id: "+33"
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
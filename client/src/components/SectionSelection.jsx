import Companion from "./Companion";
import AnimatedNumber from "../../hooks/animations/AnimatedNumber";

export default function SectionSelection({ onSelect }) {
	const characters = [
		{
			title: "About me",
			subtitle: "Aymeric Chassagne",
			destination: "myself",
			id: "2004"
		},
		{
			title: "My projects",
			subtitle: "Git Hub Projects",
			destination: "projects",
			id: "1040"
		},
		{
			title: "Contact me",
			subtitle: "aymeric.chassagne@proton.me",
			destination: "contacts",
			id: "3306"
		},
	];

	return (
		<div className="CharactersSelection">
			<Companion />

			<div className="CharactersClass">
				{characters.map((character) => (
					<div key={character.title} className="CharacterCard" onClick={() => onSelect(character)} data-cursor-hover>
						<div className="CharacterTitles">
							<p className="CharacterTitle">{character.title}</p>
							<p className="CharacterSubtitle">{character.subtitle}</p>
						</div>
						<AnimatedNumber value={character.id} duration={3500}/>
					</div>
				))}
			</div>
		</div>
	);
}
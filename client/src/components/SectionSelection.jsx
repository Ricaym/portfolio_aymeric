import Companion from "./Companion";
import Myself from "/emblemMyself.png"
import Projects from "/emblemProjects.png"
import Contact from "/emblemContact.png"

export default function SectionSelection({ onSelect }) {
	const characters = [
		{
			emblem: Myself,
			title: "About me",
			subtitle: "Aymeric Chassagne",
			destination: "myself",
			id: "2004"
		},
		{
			emblem: Projects,
			title: "My projects",
			subtitle: "Git Hub Projects",
			destination: "projects",
			id: "1040"
		},
		{
			emblem: Contact,
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
						<img className="sectionEmblem" src={character.emblem} />
						<div className="CharacterTitles">
							<p className="CharacterTitle">{character.title}</p>
							<p className="CharacterSubtitle">{character.subtitle}</p>
						</div>
						<p className="CharacterNumber">{character.id}</p>
					</div>
				))}
			</div>
		</div>
	);
}
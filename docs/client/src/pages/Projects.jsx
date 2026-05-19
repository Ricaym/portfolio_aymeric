import { useEffect, useState } from "react";

export default function Projects() {
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		setProjects([
			{ id: 1, title: "Portfolio", description: "Site perso moderne" },
			{ id: 2, title: "API Recettes", description: "Node + MongoDB" },
		]);
	}, []);

	return (
		<div>
			<h1>Mes projets</h1>

			<div>
				{projects.map(p => (
				<div key={p.id}>
					<h3>{p.title}</h3>
					<p>{p.description}</p>
				</div>
				))}
			</div>
		</div>
	);
}
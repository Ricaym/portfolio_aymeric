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
    <div className="text-white">
      <h1 className="text-3xl mb-8">Mes projets</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {projects.map(p => (
          <div
            key={p.id}
            className="bg-zinc-900 p-6 rounded-xl hover:scale-105 transition transform shadow-lg"
          >
            <h3 className="text-xl font-semibold">{p.title}</h3>
            <p className="text-gray-400 mt-2">{p.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
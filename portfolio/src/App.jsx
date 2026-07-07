import './App.css'

function App() {

	return (
		<>
			<div className='header'>
				<legend>aymeric <span className='dev'>.dev</span></legend>
				
				<div className='pages'>
					<a href="/">Projets</a>
					<a href="/">Stack</a>
					<a href="/">Contact</a>
					<button className='pages-github-link'>GitHub</button>
				</div>
			</div>
			
			<div className='homepage-profile'>
				<p>disponible pour de nouveaux projets</p>
				<div>
					<p>Je créer des projets de l'interface au backend.</p>
					<p>Développeur full-stack. Voici un aperçu de mes différents projets, directment synchronisé avec mon GitHub.</p>
				</div>
				<div className='homepage-profile-buttons'>
					<button>Voir mes projets</button>
					<button>Me contacter</button>
				</div>
				<div className='homepage-profile-stats'>
					<p>dépôts public</p>
					<p>étoiles cumulées</p>
					<p>followers</p>
				</div>
				<div className='profile-json'>
					<p>profile.json</p>
					
				</div>
			</div>

			<div className='footer'>
				<p>c 2026 Aymeric - Ricaym</p>
				<button>GitHub</button>
			</div>
		</>
	)
}

export default App

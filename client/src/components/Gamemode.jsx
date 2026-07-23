function Gamemode({ onSelectMode }) {
	return (
		<div className="Screen">
			{/* <div className="SelectModeRules">
				<p>
					Ceci est un portfolio récréatif, et a pour but de montrer l'ensemble de mes compétences liées au développement. <br />
					Découvrez cet univers inspiré de Destiny 2. <br />
					N'oubliez pas de faire F11 pour vous mettre en plein écran et profitez pleinement de votre expérience. <br />
					L'entiéreté de ce site à été produit et imaginé par Aymeric Chassagne (moi-même) exceptés les images. <br />
					Cette exprérience propose également une immersion à la manette. <br />
					Surtout n'oubliez pas de tout tester et de me dire ce que vous en avez pensé. <br />
					Merci à vous, bonne visite. <br />
				</p>
			</div> */}

			<div className="SelectMode">
				<p className="SelectModeTitle">
					Choisis ton mode
				</p>
				<div className="SelectModeButtons">
					<button onClick={() => onSelectMode("mouse")}>
						Mode Souris
					</button>
					<button
						className="controllerMode"
						onMouseMove={(e) => {
							document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
							document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
						}}
						onClick={() => onSelectMode("gamepad")}
					>
						Mode Manette
					</button>
				</div>
			</div>

			<div className="ControllerRules">
				<p>
					Appuyez sur <span className="A">A</span> ou <span class="ps-button ps-cross" aria-label="Croix"></span> pour sélectionner.
					Appuyez sur <span className="Y">Y</span> ou <span class="ps-button ps-triangle" aria-label="Triangle"></span> pour revenir ici.
					{/* <span class="ps-button ps-circle" aria-label="Rond"></span> */}
					{/* <span class="ps-button ps-square" aria-label="Carré"></span> */}
				</p>
			</div>
		</div>
	);
}

export default Gamemode;
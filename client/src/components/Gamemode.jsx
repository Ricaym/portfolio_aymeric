function Gamemode({ onSelectMode }) {
	return (
		<div className="Screen">

			<div className="SelectMode">
				<div className="SelectModeButtons">
					<button onClick={() => onSelectMode("mouse")}>
						Mouse
					</button>
					<button
						className="controllerMode"
						onMouseMove={(e) => {
							document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
							document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
						}}
						onClick={() => onSelectMode("gamepad")}
					>
						Controller
					</button>
				</div>
			</div>

			<div className="ControllerRules">
				<p>
					Appuyez sur <span className="A">A</span> ou <span className="ps-button ps-cross" aria-label="Croix"></span> pour sélectionner.
					Appuyez sur <span className="Y">Y</span> ou <span className="ps-button ps-triangle" aria-label="Triangle"></span> pour revenir ici.
					{/* <span className="ps-button ps-circle" aria-label="Rond"></span> */}
					{/* <span className="ps-button ps-square" aria-label="Carré"></span> */}
				</p>
			</div>
		</div>
	);
}

export default Gamemode;
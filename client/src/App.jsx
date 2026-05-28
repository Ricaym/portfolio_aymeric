import { useState } from "react";
import StartScreen from "./components/StartScreen";
import CharacterSelection from "./components/CharacterSelection";
import Portfolio from "./components/Portfolio";
import LoadingScreen from "./components/LoadingScreen";
import { useGamepadNavigation } from "../hooks/useGamepadNavigation";
import { GamepadCursor } from "../hooks/GamepadCursor";
import Cursor from "../hooks/Cursor";
import { div } from "three/src/nodes/math/OperatorNode.js";

function App() {
	const [step, setStep] = useState("modeSelect");

	// souris par défaut
	const [controlMode, setControlMode] = useState("mouse");

	const [selectedCharacter, setSelectedCharacter] = useState(null);
	const [nextStep, setNextStep] = useState(null);

	// Active uniquement en mode gamepad
	const { cursor } = useGamepadNavigation(
		controlMode === "gamepad"
	);

	const showLoadingThen = (destination) => {
		setNextStep(destination);
		setStep("loading");

		setTimeout(() => {
			setStep(destination);
		}, 2000);
	};

	// Sélection du mode
	const handleSelectMode = (mode) => {
		setControlMode(mode);

		// Cache la souris native en mode manette
		if (mode === "gamepad") {
			document.body.style.cursor = "none";
		} else {
			document.body.style.cursor = "default";
		}

		showLoadingThen("start");
	};

	const handleStart = () => {
		showLoadingThen("selection");
	};

	const handleCharacterSelect = (character) => {
		setSelectedCharacter(character);
		showLoadingThen("portfolio");
	};

	return (
		<>
			{/* Curseur souris par défaut */}
			{controlMode === "mouse" && <Cursor />}

			{/* Curseur manette uniquement en mode gamepad */}
			{controlMode === "gamepad" && (
				<GamepadCursor x={cursor.x} y={cursor.y} />
			)}

			{/* CHOIX DU MODE */}
			{step === "modeSelect" && (
				<div className="Screen">
					<div className="SelectMode">
						<p className="SelectModeTitle">
							Choisis ton mode
						</p>

						<div className="SelectModeButtons">
							<button
								onClick={() =>
									handleSelectMode("mouse")
								}
							>
								Mode Souris
							</button>

							<button
								onClick={() =>
									handleSelectMode("gamepad")
								}
							>
								Mode Controller
							</button>
						</div>
					</div>
				</div>
			)}

			{/* LOADING */}
			{step === "loading" && (
				<LoadingScreen nextStep={nextStep} />
			)}

			{/* START */}
			{step === "start" && (
				<StartScreen onStart={handleStart} />
			)}

			{/* SELECTION */}
			{step === "selection" && (
				<CharacterSelection
					onSelect={handleCharacterSelect}
				/>
			)}

			{/* PORTFOLIO */}
			{step === "portfolio" && (
				<Portfolio character={selectedCharacter} />
			)}
		</>
	);
}

export default App;
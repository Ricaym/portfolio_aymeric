import { useState, useEffect } from "react";
import StartScreen from "./components/StartScreen";
import CharacterSelection from "./components/CharacterSelection";
import Portfolio from "./components/Portfolio";
import LoadingScreen from "./components/LoadingScreen";
import { useGamepadNavigation } from "../hooks/useGamepadNavigation";
import { GamepadCursor } from "../hooks/GamepadCursor";
import Cursor from "../hooks/Cursor";

function App() {
	// Détection mobile portrait
	const [isMobilePortrait, setIsMobilePortrait] = useState(
		window.innerHeight > window.innerWidth
	);

	// Si téléphone portrait → StartScreen
	// Sinon → choix du mode
	const [step, setStep] = useState(
		window.innerHeight > window.innerWidth
			? "start"
			: "modeSelect"
	);

	const [controlMode, setControlMode] = useState("mouse");
	const [selectedCharacter, setSelectedCharacter] =
		useState(null);
	const [nextStep, setNextStep] = useState(null);

	useEffect(() => {
		const handleResize = () => {
			const portrait =
				window.innerHeight > window.innerWidth;

			setIsMobilePortrait(portrait);

			// Si on arrive sur mobile portrait depuis le modeSelect
			if (portrait && step === "modeSelect") {
				setStep("start");
			}
		};

		window.addEventListener("resize", handleResize);

		return () =>
			window.removeEventListener(
				"resize",
				handleResize
			);
	}, [step]);

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

	const handleSelectMode = (mode) => {
		setControlMode(mode);

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
			{/* Curseur souris uniquement hors mode gamepad */}
			{controlMode === "mouse" && !isMobilePortrait && <Cursor />}

			{/* Curseur manette */}
			{controlMode === "gamepad" && (
				<GamepadCursor x={cursor.x} y={cursor.y} />
			)}

			{/* Choix du mode uniquement sur desktop/paysage */}
			{!isMobilePortrait &&
				step === "modeSelect" && (
					<div className="Screen">
						<div className="SelectMode">
							<p className="SelectModeTitle">
								Choisis ton mode
							</p>

							<div className="SelectModeButtons">
								<button
									onClick={() =>
										handleSelectMode(
											"mouse"
										)
									}
								>
									Mode Souris
								</button>

								<button
									onClick={() =>
										handleSelectMode(
											"gamepad"
										)
									}
								>
									Mode Controller
								</button>
							</div>
						</div>
					</div>
				)}

			{step === "loading" && (
				<LoadingScreen nextStep={nextStep} />
			)}

			{step === "start" && (
				<StartScreen onStart={handleStart} />
			)}

			{step === "selection" && (
				<CharacterSelection
					onSelect={handleCharacterSelect}
				/>
			)}

			{step === "portfolio" && (
				<Portfolio character={selectedCharacter} />
			)}
		</>
	);
}

export default App;
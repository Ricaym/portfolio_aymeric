import { useState } from "react";
import StartScreen from "./components/StartScreen";
import CharacterSelection from "./components/CharacterSelection";
import Portfolio from "./components/Portfolio";
import LoadingScreen from "./components/LoadingScreen";
// import { useGamepadNavigation } from "../hooks/useGamepadNavigation";
// import { GamepadCursor } from "../hooks/GamepadCursor";
import Cursor from "../hooks/Cursor";

function App() {
	const [step, setStep] = useState("start");
	const [selectedCharacter, setSelectedCharacter] = useState(null);
	const [nextStep, setNextStep] = useState(null);

	// --- CURSEUR GLOBAL
	// const { cursor } = useGamepadNavigation();

	const showLoadingThen = (destination) => {
		setNextStep(destination);
		setStep("loading");

		setTimeout(() => {
			setStep(destination);
		}, 2000);
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
			{/* CURSEUR GLOBAL (toutes les pages) */}
			<Cursor/>
			{/* <GamepadCursor x={cursor.x} y={cursor.y} /> */}

			{step === "start" && (
				<StartScreen onStart={handleStart} />
			)}

			{step === "loading" && (
				<LoadingScreen nextStep={nextStep} />
			)}

			{step === "selection" && (
				<CharacterSelection onSelect={handleCharacterSelect} />
			)}

			{step === "portfolio" && (
				<Portfolio character={selectedCharacter} />
			)}
		</>
	);
}

export default App;
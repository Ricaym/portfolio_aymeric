import { useState } from "react";
import StartScreen from "./components/StartScreen";
import CharacterSelection from "./components/CharacterSelection";
import Portfolio from "./components/Portfolio";


function App() {
	const [step, setStep] = useState("start");
	const [selectedCharacter, setSelectedCharacter] = useState(null);
	const handleStart = () => {

		setStep("selection");
	};
	const handleCharacterSelect = (character) => {
		setSelectedCharacter(character);

		setTimeout(() => {
			setStep("portfolio");
		}, 250);
	};

	return (
		<>
			{step === "start" && (
				<StartScreen onStart={handleStart} />
			)}

			{step === "selection" && (
				<CharacterSelection onSelect={handleCharacterSelect}/>
			)}

			{step === "portfolio" && (
				<Portfolio character={selectedCharacter} />
			)}
		</>
	);
}

export default App;
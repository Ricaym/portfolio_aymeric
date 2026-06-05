import { useState, useEffect, useRef } from "react";
import music from "./assets/music.mp3";

import Gamemode from "./components/Gamemode";
import StartScreen from "./components/StartScreen";
import CharacterSelection from "./components/CharacterSelection";
import Myself from "./components/Myself";
import Projects from "./components/Projects";
import Contacts from "./components/Contacts";
import LoadingScreen from "./components/LoadingScreen";
import { useGamepadNavigation } from "../hooks/useGamepadNavigation";
import { GamepadCursor } from "../hooks/GamepadCursor";
import Cursor from "../hooks/Cursor";

function App() {
	const audioRef = useRef(null);
	const [musicStarted, setMusicStarted] = useState(false);

	const [isMobilePortrait, setIsMobilePortrait] = useState(
		window.innerHeight > window.innerWidth
	);

	const [step, setStep] = useState(
		window.innerHeight > window.innerWidth
			? "start"
			: "modeSelect"
	);

	const [controlMode, setControlMode] = useState("mouse");
	const [selectedCharacter, setSelectedCharacter] =
		useState(null);
	const [nextStep, setNextStep] = useState(null);
	const [history, setHistory] = useState([]);

	const startMusic = () => {
		if (musicStarted) return;

		audioRef.current
			?.play()
			.then(() => {
				setMusicStarted(true);
			})
			.catch((err) => {
				console.log("Musique bloquée par le navigateur :", err);
			});
	};

	useEffect(() => {
		const handleResize = () => {
			const portrait =
				window.innerHeight > window.innerWidth;

			setIsMobilePortrait(portrait);

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

	useEffect(() => {
		document.body.style.cursor =
			controlMode === "gamepad" ? "none" : "default";

		return () => {
			document.body.style.cursor = "default";
		};
	}, [controlMode]);

	useEffect(() => {
		if (step === "start") {
			startMusic();
		}
	}, [step]);

	const { cursor } = useGamepadNavigation(
		controlMode === "gamepad"
	);

	const showLoadingThen = (destination, addToHistory = true) => {
		if (addToHistory) {
			setHistory((prev) => [...prev, step]);
		}

		setNextStep(destination);
		setStep("loading");

		setTimeout(() => {
			setStep(destination);
		}, 0);
	};

	const goBack = () => {
		setHistory((prev) => {
			if (prev.length === 0) return prev;

			const previousStep = prev[prev.length - 1];

			setNextStep(null);
			setStep(previousStep);

			return prev.slice(0, -1);
		});
	};

	const handleSelectMode = (mode) => {
		setControlMode(mode);
		showLoadingThen("start");
	};

	const handleStart = () => {
		startMusic();
		showLoadingThen("selection");
	};

	const handleCharacterSelect = (character) => {
		setSelectedCharacter(character);
		showLoadingThen(character.destination);
	};

	return (
		<>
			<audio ref={audioRef} src={music} loop />

			{controlMode === "mouse" && !isMobilePortrait && <Cursor />}

			{controlMode === "gamepad" && (
				<GamepadCursor x={cursor.x} y={cursor.y} visible={true} />
			)}

			{!isMobilePortrait && step === "modeSelect" && (
				<Gamemode onSelectMode={handleSelectMode} />
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

			{step === "myself" && (
				<Myself
					character={selectedCharacter}
					onBack={goBack}
				/>
			)}

			{step === "projects" && (
				<Projects
					character={selectedCharacter}
					onBack={goBack}
				/>
			)}

			{step === "contacts" && (
				<Contacts
					character={selectedCharacter}
					onBack={goBack}
				/>
			)}
		</>
	);
}

export default App;
import {
	useState,
	useEffect,
	useRef,
} from "react";

import music from "./assets/music.mp3";
import clickSound from "./assets/click.mp3";

import Gamemode from "./components/Gamemode";
import StartScreen from "./components/StartScreen";
import CharacterSelection from "./components/CharacterSelection";
import Myself from "./components/Myself";
import Projects from "./components/Projects";
import Contacts from "./components/Contacts";
import LoadingScreen from "./components/LoadingScreen";
import EscapeMenu from "./components/EscapeMenu";

import { useGamepadNavigation } from "../hooks/useGamepadNavigation";
import { GamepadCursor } from "../hooks/GamepadCursor";
import Cursor from "../hooks/Cursor";

function App() {
	const audioRef = useRef(null);
	const clickAudioRef = useRef(null);

	const [musicStarted, setMusicStarted] =
		useState(false);

	const [isEscapeMenuOpen, setIsEscapeMenuOpen] =
		useState(false);

	const [isMobilePortrait, setIsMobilePortrait] =
		useState(
			window.innerHeight > window.innerWidth
		);

	const [step, setStep] = useState(
		window.innerHeight > window.innerWidth
			? "start"
			: "modeSelect"
	);

	const [controlMode, setControlMode] =
		useState("mouse");

	const [selectedCharacter, setSelectedCharacter] =
		useState(null);

	const [nextStep, setNextStep] = useState(null);
	const [history, setHistory] = useState([]);

	const playClick = () => {
		if (!clickAudioRef.current) return;

		clickAudioRef.current.currentTime = 0;

		clickAudioRef.current
			.play()
			.catch(() => {});
	};

	const startMusic = () => {
		if (musicStarted) return;

		audioRef.current
			?.play()
			.then(() => {
				setMusicStarted(true);
			})
			.catch((err) => {
				console.log(
					"Musique bloquée par le navigateur :",
					err
				);
			});
	};

	useEffect(() => {
		const handleEscape = (event) => {
			if (event.key !== "Escape") return;

			event.preventDefault();

			/*
				On évite d'ouvrir le menu pendant
				l'écran de chargement.
			*/
			if (step === "loading") return;

			setIsEscapeMenuOpen(
				(previousValue) => !previousValue
			);
		};

		window.addEventListener(
			"keydown",
			handleEscape
		);

		return () => {
			window.removeEventListener(
				"keydown",
				handleEscape
			);
		};
	}, [step]);

	useEffect(() => {
		document.body.style.overflow =
			isEscapeMenuOpen ? "hidden" : "";

		return () => {
			document.body.style.overflow = "";
		};
	}, [isEscapeMenuOpen]);

	useEffect(() => {
		const handleResize = () => {
			const portrait =
				window.innerHeight >
				window.innerWidth;

			setIsMobilePortrait(portrait);

			if (
				portrait &&
				step === "modeSelect"
			) {
				setStep("start");
			}
		};

		window.addEventListener(
			"resize",
			handleResize
		);

		return () => {
			window.removeEventListener(
				"resize",
				handleResize
			);
		};
	}, [step]);

	useEffect(() => {
		const shouldHideNativeCursor =
			!isMobilePortrait &&
			(controlMode === "mouse" || controlMode === "gamepad");

		document.body.style.cursor = shouldHideNativeCursor
			? "none"
			: "default";

		return () => {
			document.body.style.cursor = "default";
		};
	}, [controlMode, isMobilePortrait]);

	useEffect(() => {
		if (step === "start") {
			startMusic();
		}
	}, [step]);

	const { cursor } = useGamepadNavigation(
		controlMode === "gamepad"
	);

	const showLoadingThen = (
		destination,
		addToHistory = true
	) => {
		if (addToHistory) {
			setHistory((prev) => [
				...prev,
				step,
			]);
		}

		setIsEscapeMenuOpen(false);
		setNextStep(destination);
		setStep("loading");

		setTimeout(() => {
			setStep(destination);
		}, 2000);
	};

	const goBack = () => {
		playClick();

		setHistory((prev) => {
			if (prev.length === 0) {
				return prev;
			}

			const previousStep =
				prev[prev.length - 1];

			setNextStep(null);
			setStep(previousStep);

			return prev.slice(0, -1);
		});
	};

	const goToHome = () => {
		playClick();

		setIsEscapeMenuOpen(false);
		setHistory([]);
		setNextStep(null);
		setSelectedCharacter(null);
		setStep("start");
	};

	const handleControlModeChange = (mode) => {
		playClick();
		setControlMode(mode);
	};

	const handleSelectMode = (mode) => {
		playClick();
		setControlMode(mode);
		showLoadingThen("start");
	};

	const handleStart = () => {
		playClick();
		startMusic();
		showLoadingThen("selection");
	};

	const handleCharacterSelect = (
		character
	) => {
		playClick();
		setSelectedCharacter(character);
		showLoadingThen(
			character.destination
		);
	};

	return (
		<>
			<audio
				ref={audioRef}
				src={music}
				loop
			/>

			<audio
				ref={clickAudioRef}
				src={clickSound}
				preload="auto"
			/>

			{controlMode === "mouse" &&
				!isMobilePortrait && (
					<Cursor />
				)}

			{controlMode === "gamepad" && (
				<GamepadCursor
					x={cursor.x}
					y={cursor.y}
					visible={!isEscapeMenuOpen}
				/>
			)}

			{!isMobilePortrait &&
				step === "modeSelect" && (
					<Gamemode
						onSelectMode={
							handleSelectMode
						}
					/>
				)}

			{step === "loading" && (
				<LoadingScreen
					nextStep={nextStep}
				/>
			)}

			{step === "start" && (
				<StartScreen
					onStart={handleStart}
				/>
			)}

			{step === "selection" && (
				<CharacterSelection
					onSelect={
						handleCharacterSelect
					}
				/>
			)}

			{step === "myself" && (
				<Myself
					character={
						selectedCharacter
					}
					onBack={goBack}
				/>
			)}

			{step === "projects" && (
				<Projects
					character={
						selectedCharacter
					}
					onBack={goBack}
				/>
			)}

			{step === "contacts" && (
				<Contacts
					character={
						selectedCharacter
					}
					onBack={goBack}
				/>
			)}

			<EscapeMenu
				isOpen={isEscapeMenuOpen}
				onClose={() =>
					setIsEscapeMenuOpen(false)
				}
				onHome={goToHome}
				controlMode={controlMode}
				onControlModeChange={
					handleControlModeChange
				}
			/>
		</>
	);
}

export default App;
import {
	Gamepad2,
	House,
	MousePointer2,
	Play,
	X,
} from "lucide-react";

export default function EscapeMenu({
	isOpen,
	onClose,
	onHome,
	controlMode,
	onControlModeChange,
}) {
	if (!isOpen) return null;

	return (
		<div
			className="escapeMenuOverlay"
			onMouseDown={onClose}
		>
			<div
				className="escapeMenu"
				role="dialog"
				aria-modal="true"
				aria-label="Menu pause"
				onMouseDown={(event) =>
					event.stopPropagation()
				}
			>
				<header className="escapeMenuHeader">
					<div>
						<span className="escapeMenuLabel">
							PAUSE
						</span>

						<h2>Menu</h2>
					</div>

					<button
						type="button"
						className="escapeMenuClose"
						onClick={onClose}
						aria-label="Fermer le menu"
					>
						<X size={22} />
					</button>
				</header>

				<div className="escapeMenuContent">
					<button
						type="button"
						className="escapeMenuAction"
						onClick={onClose}
					>
						<Play size={22} />

						<span>
							<strong>Reprendre</strong>
							<small>
								Retourner à l’écran actuel
							</small>
						</span>
					</button>

					<button
						type="button"
						className="escapeMenuAction"
						onClick={onHome}
					>
						<House size={22} />

						<span>
							<strong>
								Retour à l’accueil
							</strong>

							<small>
								Revenir à l’écran de démarrage
							</small>
						</span>
					</button>

					<div className="escapeMenuSection">
						<span className="escapeMenuSectionTitle">
							Mode de contrôle
						</span>

						<div className="escapeMenuModeGrid">
							<button
								type="button"
								className={`escapeMenuMode ${
									controlMode === "mouse"
										? "active"
										: ""
								}`}
								onClick={() =>
									onControlModeChange(
										"mouse"
									)
								}
							>
								<MousePointer2 size={24} />
								<span>Souris</span>
							</button>

							<button
								type="button"
								className={`escapeMenuMode ${
									controlMode === "gamepad"
										? "active"
										: ""
								}`}
								onClick={() =>
									onControlModeChange(
										"gamepad"
									)
								}
							>
								<Gamepad2 size={24} />
								<span>Manette</span>
							</button>
						</div>
					</div>
				</div>

				<footer className="escapeMenuFooter">
					Appuie sur <kbd>Échap</kbd> pour fermer
				</footer>
			</div>
		</div>
	);
}
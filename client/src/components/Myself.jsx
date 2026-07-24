import "../index.css";
import BackButton from "./BackButton";

export default function Portfolio({ onBack }) {
	return (
		<div className="MyselfSection">
			<header className="myselfHeader">
				<BackButton onBack={onBack} />
				<h1 className="myselfTitle">About me !</h1>
			</header>

			<div className="myselfCardContainer">
				<div className="myselfCard">
					{/* Face avant */}
					<div className="myselfCardFace myselfCardFront">
						
						<h2>Aymeric Chassagne</h2>
						<p>Développeur full-stack</p>
					</div>

					{/* Face arrière */}
					<div className="myselfCardFace myselfCardBack">
						<h2>Informations</h2>
						<div className="informationsCard">
							<div className="profilePicture"></div>
							<p className="description_paragraph">
								Name : <span className="wheat">Aymeric</span><br />
								Lastname : <span className="wheat">Chassagne</span><br />
								Date of birth : <span className="wheat">28/06/2004</span><br />
								Mail :{" "}<a className="wheat" href="mailto:aymeric.chassagne@proton.me">aymeric.chassagne@proton.me</a><br />
								Phone number :{" "}<a className="wheat" href="tel:+33652804044">+33 6 52 80 40 44</a><br />
								Address :{" "}<span className="wheat">07130 Auvergne-Rhône-Alpes, France</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
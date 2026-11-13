import "../index.css";
import BackButton from "./BackButton";
import profilePicture from "../assets/profile.png";
import cv from "../assets/CV.pdf";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiFileText } from "react-icons/fi";

export default function Portfolio({ onBack }) {
	return (
		<div className="MyselfSection">
			<header className="myselfHeader">
				<BackButton onBack={onBack} />
				<h1 className="sectionTitle">About me !</h1>
			</header>

			<div className="myselfPage">
				<div className="myselfCard">

					<div className="myselfPicture">
						<img
							src={profilePicture}
							alt="Aymeric Chassagne"
						/>
					</div>

					<div className="myselfContent">
						<h2 className="myselfName">
							Aymeric <span>Chassagne</span>
						</h2>

						<p className="myselfDescription">
							Full-stack developer. Turning UI into experiences.
						</p>

						<div className="myselfInformations">
							<div className="myselfInfo">
								<span>Birth date</span>
								<p>June 2004</p>
							</div>

							<div className="myselfInfo">
								<span>Education</span>
								<p>ESTIAM Lyon</p>
							</div>

							<div className="myselfInfo">
								<span>Degree</span>
								<p>Master's - Full-Stack, Data sciences & AI</p>
							</div>

							<div className="myselfInfo">
								<span>Company</span>
								<p>Novvan</p>
							</div>
						</div>

						<div className="myselfLinks">
							<a
								href="https://github.com/Ricaym"
								target="_blank"
								rel="noopener noreferrer"
								className="myselfLink"
								aria-label="GitHub"
								title="GitHub"
							>
								<FaGithub />
							</a>

							<a
								href="https://www.linkedin.com/in/aymeric-chassagne-a0383a170/"
								target="_blank"
								rel="noopener noreferrer"
								className="myselfLink"
								aria-label="LinkedIn"
								title="LinkedIn"
							>
								<FaLinkedin />
							</a>

							<a
								href={cv}
								target="_blank"
								rel="noopener noreferrer"
								className="myselfLink"
								aria-label="Voir mon CV"
								title="Voir mon CV"
							>
								<FiFileText />
							</a>
						</div>
					</div>

				</div>
			</div>
		</div>
	);
}



import { useState } from "react";
import BackButton from "./BackButton";
import { FaLinkedin } from "react-icons/fa";
import { FiMail, FiSend, FiCopy, FiCheck, FiExternalLink } from "react-icons/fi";

const EMAIL = "aymeric.chassagne@proton.me";
const LINKEDIN = "https://www.linkedin.com/in/aymeric-chassagne-a0383a170/";

export default function Portfolio({ onBack }) {
	const [copied, setCopied] = useState(false);
	const [form, setForm] = useState({
		name: "",
		email: "",
		subject: "",
		message: ""
	});

	const copyEmail = async () => {
		try {
			await navigator.clipboard.writeText(EMAIL);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch {
			setCopied(false);
		}
	};

	const handleChange = (e) => {
		setForm((prev) => ({
			...prev,
			[e.target.name]: e.target.value
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const subject = encodeURIComponent(
			form.subject || `Contact portfolio - ${form.name}`
		);

		const body = encodeURIComponent(
			`Nom : ${form.name}\n` +
			`Email : ${form.email}\n\n` +
			`${form.message}`
		);

		window.location.href =
			`mailto:${EMAIL}?subject=${subject}&body=${body}`;
	};

	return (
		<div className="contactSection">
			<header className="contactHeader">
				<BackButton onBack={onBack} />
				<h1 className="sectionTitle">Contact me !</h1>
			</header>

			<main className="contactPage">
				<div className="contactIntro">
					<span className="contactEyebrow">CONTACT / 03</span>
					<h2>Let's talk<span>.</span></h2>
					<p>
						Une question, un projet ou une opportunité ?
						N'hésite pas à me contacter.
					</p>
				</div>

				<div className="contactGrid">
					<aside className="contactInfo">
						<div className="contactInfoCard">
							<div className="contactCardHeading">
								<FiMail />
								<span>EMAIL</span>
							</div>

							<p className="contactEmail">{EMAIL}</p>

							<button
								type="button"
								className="contactTextAction"
								onClick={copyEmail}
							>
								{copied ? <FiCheck /> : <FiCopy />}
								{copied ? "Copié !" : "Copier l'adresse"}
							</button>
						</div>

						<div className="contactInfoCard">
							<div className="contactCardHeading">
								<FaLinkedin />
								<span>LINKEDIN</span>
							</div>

							<h3>Mon profil professionnel</h3>
							<p>
								Retrouve mon parcours, mes expériences
								et mon réseau professionnel.
							</p>

							<a
								href={LINKEDIN}
								target="_blank"
								rel="noopener noreferrer"
								className="contactTextAction"
							>
								Voir mon profil <FiExternalLink />
							</a>
						</div>
					</aside>

					<form className="contactForm" onSubmit={handleSubmit}>
						<div className="contactFormTitle">
							<h3>Envoyer un message</h3>
							<FiSend />
						</div>

						<div className="contactField">
							<label htmlFor="contactName">VOTRE NOM</label>
							<input
								id="contactName"
								name="name"
								type="text"
								placeholder="John Doe"
								value={form.name}
								onChange={handleChange}
								required
							/>
						</div>

						<div className="contactField">
							<label htmlFor="contactEmail">VOTRE EMAIL</label>
							<input
								id="contactEmail"
								name="email"
								type="email"
								placeholder="john@example.com"
								value={form.email}
								onChange={handleChange}
								required
							/>
						</div>

						<div className="contactField">
							<label htmlFor="contactSubject">OBJET</label>
							<input
								id="contactSubject"
								name="subject"
								type="text"
								placeholder="Une opportunité..."
								value={form.subject}
								onChange={handleChange}
							/>
						</div>

						<div className="contactField">
							<label htmlFor="contactMessage">MESSAGE</label>
							<textarea
								id="contactMessage"
								name="message"
								placeholder="Votre message..."
								rows="5"
								value={form.message}
								onChange={handleChange}
								required
							/>
						</div>

						<button type="submit" className="contactSubmit">
							<FiSend />
							SEND MESSAGE
						</button>
					</form>
				</div>

				<footer className="contactFooter">
					<span>OPEN TO OPPORTUNITIES</span>
					<span>© {new Date().getFullYear()}</span>
				</footer>
			</main>
		</div>
	);
}

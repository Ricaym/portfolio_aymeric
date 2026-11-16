import "../index.css";
import BackButton from './BackButton';

export default function Portfolio({ onBack }) {

	return (
		<div className="ContactSection">
			<header className="contactHeader">
				<BackButton onBack={onBack} />
				<h1 className="headerTitle">Contact me !</h1>
			</header>
		</div>
	);
}
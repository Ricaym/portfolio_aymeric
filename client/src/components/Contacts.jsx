import "../index.css";
import BackButton from './BackButton';

export default function Portfolio({ onBack }) {

	return (
		// <div className="MyselfSection">
		// 	<header className="contactHeader">
		// 		<BackButton onBack={onBack} />
		// 		<h1 className="myselfTitle">Mes contacts !</h1>
		// 	</header>
		// </div>
		<div className="ContactSection">
			<header className="contactHeader">
				<BackButton onBack={onBack} />
				<h1 className="sectionTitle">Contact me !</h1>
			</header>
		</div>
	);
}
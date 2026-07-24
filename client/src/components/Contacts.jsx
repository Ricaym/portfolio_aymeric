import "../index.css";
import BackButton from './BackButton';

export default function Portfolio({ onBack }) {

	return (
		<div className="MyselfSection">
			<header className="contactHeader">
				<BackButton onBack={onBack} />
				<h1 className="myselfTitle">À propos de moi !</h1>
			</header>
		</div>
	);
}
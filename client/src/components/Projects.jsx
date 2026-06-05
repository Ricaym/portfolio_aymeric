import "../index.css";
import BackButton from './BackButton';

export default function Portfolio({ onBack }) {

	return (
		<div className="ProjectSection">
            <BackButton onBack={onBack} />
			<legend>Mes projets !</legend>

			<div className="ListProjets">
			</div>
		</div>
	);
}
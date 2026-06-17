import "../index.css";
import BackButton from './BackButton';

export default function Portfolio({ onBack }) {

	return (
		<div className="ContactSection">
            <BackButton onBack={onBack} />
			<legend>Mes contacts !</legend>

			<div className="ContactList">
				<div className="description">
					<p className="description_paragraph">
						Si vous souhaitez me contacter vou pouvez le faire via mes différents réseaux <br/><br/>
					</p>
				</div>
			</div>
		</div>
	);
}
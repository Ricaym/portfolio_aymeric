import "../index.css";
import BackButton from './BackButton';

export default function Portfolio() {

	return (
		<div className="page">
            <BackButton />
			<legend>Mes contacts !</legend>

			<div className="myselfCard">
				<div className="profilePicture"></div>
				<div className="description">
					<p className="description_paragraph">
						Hello, my name is Aymeric Chasssagne.<br/><br/>
						I am a web developer for Conduent Business Solutions France.<br/>
					</p>
				</div>
			</div>
		</div>
	);
}
import "../index.css";
import BackButton from './BackButton';

export default function Portfolio({ onBack }) {

	return (
		<div className="MyselfSection">
            <BackButton onBack={onBack} />
			<legend>Contact me</legend>

			<div className="myselfCard">
				<div className="profilePicture"></div>
				<div className="description">
					<p className="description_paragraph">
						Here are my different contacts.
					</p>
				</div>
			</div>
		</div>
	);
}
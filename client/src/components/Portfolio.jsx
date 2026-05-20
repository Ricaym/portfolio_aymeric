import "../index.css";

export default function Portfolio() {

	return (
		<div className="page">
			<legend>Aymeric Chassagne</legend>

			<div className="myselfCard">
				<div className="profilePicture">
					<p className="name_card">Aymeric Chassagne</p>
					<p className="title_card">Web App Developer</p>
				</div>
				<div className="description">
					<p className="description_paragraph">
						Hello, my name is Aymeric Chasssagne.<br/><br/>
						I am a web developer for Conduent Business Solutions France.<br/>
					</p>
				</div>
			</div>

			{/* <div className="profilePicture_phone">
				<p className="phone">Aymeric Chassagne</p>
				<p className="phone">Développeur Web App.</p>
			</div> */}
		</div>
	);
}
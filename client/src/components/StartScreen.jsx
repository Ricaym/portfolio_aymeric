

export default function StartScreen({ onStart }) {

	return (
		<div className="StartScreen" onClick={onStart}>
			<div className="overlay">
				<img className="logoStartScreen" src="/portfolio_aymeric/logo_portfolio.png"/>
				<p className="title">Portfolio Aymeric Chassagne</p>
				<p className="subtitle">Appuyer pour commencer</p>
			</div>
		</div>
	);
}
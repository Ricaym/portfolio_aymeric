export default function StartScreen({ onStart }) {

	return (
		<div className="StartScreen" onClick={onStart}>
				<img className="startScreenLogo" src="/portfolio_aymeric/logo_portfolio.png"/>
				<p className="startScreenTitle">Portfolio Aymeric Chassagne</p>
				<p className="startScreenSubtitle">Appuyer pour commencer</p>
		</div>
	);
}
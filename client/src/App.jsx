import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Myself from "./pages/Myself";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

function App() {
	return (
		<div>
			<Header />

			<div style={{ padding: "40px" }}>
				<Routes>
					<Route path="/" element={<Myself />} />
					<Route path="/projects" element={<Projects />} />
					<Route path="/contact" element={<Contact />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
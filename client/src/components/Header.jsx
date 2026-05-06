import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-black text-white flex justify-between items-center px-10 py-4 shadow-lg sticky top-0 z-50">
      <h1 className="text-xl font-bold">Jack.dev</h1>

      <nav className="flex gap-6">
        <Link to="/" className="hover:text-gray-400 transition">Myself</Link>
        <Link to="/projects" className="hover:text-gray-400 transition">GitHub</Link>
        <Link to="/contact" className="hover:text-gray-400 transition">Contact</Link>
      </nav>
    </header>
  );
}
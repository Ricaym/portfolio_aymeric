export default function Contact() {
  return (
    <div className="text-white max-w-xl mx-auto">
      <h1 className="text-3xl mb-6">Contact</h1>

      <form className="flex flex-col gap-4">
        <input className="p-3 bg-zinc-900 rounded" placeholder="Nom" />
        <input className="p-3 bg-zinc-900 rounded" placeholder="Email" />
        <textarea className="p-3 bg-zinc-900 rounded" placeholder="Message" />

        <button className="bg-white text-black py-3 rounded hover:bg-gray-300 transition">
          Envoyer
        </button>
      </form>
    </div>
  );
}
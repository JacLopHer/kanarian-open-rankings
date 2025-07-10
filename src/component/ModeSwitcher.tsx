  export function ModeSwitcher({ mode, setMode }: { mode: string; setMode: (m: string) => void }) {
  return (
    <button
      onClick={() => setMode(mode === "ranking" ? "versus" : "ranking")}
      className="absolute top-4 right-4 bg-gray-800 text-white px-3 py-1 rounded"
    >
      {mode === "ranking" ? "Modo Versus" : "Ver Ranking"}
    </button>
  );
}
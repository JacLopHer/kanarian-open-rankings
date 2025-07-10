type Props = {
  mode: "ranking" | "versus";
  setMode: (m: "ranking" | "versus") => void;
};

const ModeSwitcher = ({ mode, setMode }: Props) => (
  <button
    onClick={() => setMode(mode === "ranking" ? "versus" : "ranking")}
    className="absolute top-4 right-4 bg-gray-800 text-white px-3 py-1 rounded z-10"
  >
    {mode === "ranking" ? "Modo Versus" : "Ver Ranking"}
  </button>
);

export default ModeSwitcher;

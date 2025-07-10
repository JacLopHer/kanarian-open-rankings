type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar = ({ value, onChange }: Props) => (
  <div className="mb-6 text-center">
    <input
      type="text"
      placeholder="Buscar jugador o facción..."
      className="w-full max-w-md px-4 py-2 border border-canary.lightgreen rounded-lg focus:outline-none focus:ring-2 focus:ring-canary.accent bg-white text-canary.darkgreen"
      value={value}
      onChange={onChange}
    />
  </div>
);

export default SearchBar;

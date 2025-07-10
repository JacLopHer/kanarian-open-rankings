import React from "react";

type Player = {
    id: string;
    name: string;
    rating: number;
    mainFaction: string;
    matches: number;
    matchesWon: number;
    matchesLost: number;
    position: number;
};

type Props = {
    players: Player[];
    startIndex?: number; // nueva prop opcional
};

function getWinrateColor(winrate: number) {
  const colors = [
    "#ff0000", // rojo chillón
    "#ff3300",
    "#ff6600",
    "#ff9900",
    "#ffcc00", // amarillo chillón
    "#ccff00",
    "#99ff00",
    "#66ff00",
    "#33ff00", // verde chillón fuerte
  ];
  // Limitar winrate entre 0 y 100 para evitar valores fuera de rango
  const clampedWinrate = Math.min(Math.max(winrate, 0), 100);
  // Calcular índice entre 0 y 8
  const index = Math.floor((clampedWinrate / 100) * (colors.length - 1));
  return colors[index];
}

function getRatingTextColor(rating: number) {
  if (rating >= 2000) {
    return "text-yellow-400 font-bold"; // dorado
  } else if (rating >= 1700) {
    return "text-gray-400 font-semibold"; // plata
  } else if (rating >= 1400) {
    return "text-yellow-800 font-semibold"; // bronce
  } else {
    return "text-pink-300 font-semibold"; // rosa pálido
  }
}



const RankingTable: React.FC<Props> = ({ players, startIndex = 0 }) => {
    return (
        <div className="overflow-x-auto rounded-xl border border-canary-darkgreen shadow-md font-sans">
            <table className="min-w-full divide-y divide-canary-darkgreen text-sm">
                <thead className="bg-canary-darkgreen text-canary-white">
                    <tr>
                        <th className="px-4 py-3 text-left font-semibold">#</th>
                        <th className="px-4 py-3 text-left font-semibold">Jugador</th>
                        <th className="px-4 py-3 text-left font-semibold">Facción</th>
                        <th className="px-4 py-3 text-center font-semibold">Rating</th>
                        <th className="px-4 py-3 text-center font-semibold">Ganados</th>
                        <th className="px-4 py-3 text-center font-semibold">Perdidos</th>
                        <th className="px-4 py-3 text-center font-semibold">Empatados</th>
                        <th className="px-4 py-3 text-center font-semibold">Winrate</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-canary-darkgreen">
                    {players.map((player, index) => {
                        const matchesDecided = player.matchesWon + player.matchesLost;
                        const matchesDraw = player.matches - matchesDecided;
                        const totalPoints = player.matchesWon + matchesDraw * 0.5;
                        const winrate = player.matches > 0
                            ? ((totalPoints / player.matches) * 100).toFixed(1)
                            : "0.0";
                        const isOdd = index % 2 === 1;

                        return (
                            <tr
                                key={player.id}
                                className={`transition-colors duration-200 hover:bg-canary-lightgreen/40 ${isOdd ? "bg-canary-white" : "bg-canary-background"
                                    }`}
                            >
                                <td className="px-4 py-2 text-canary-accent font-medium text-left">
                                    {player.position}
                                </td>
                                <td className="px-4 py-2 text-canary-accent text-left">{player.name}</td>
                                <td className="px-4 py-2 text-canary-accent text-left">{player.mainFaction}</td>
                                <td className={`px-4 py-2 font-semibold text-center ${getRatingTextColor(player.rating)}`}>{player.rating.toFixed(1)}</td>
                                <td className="px-4 py-2 text-canary-accent text-center text-green-600 font-semibold">{player.matchesWon}</td>
                                <td className="px-4 py-2 text-canary-accent text-center text-red-600 font-semibold">{player.matchesLost}</td>
                                <td className="px-4 py-2 text-canary-accent text-center text-yellow-500 font-semibold">{matchesDraw}</td>
                                <td className="px-4 py-2 text-canary-accent text-center font-semibold"  style={{ color: getWinrateColor(parseFloat(winrate)),backgroundColor: "rgba(0,0,0,0.6)"}}>{winrate}%</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};


export default RankingTable;

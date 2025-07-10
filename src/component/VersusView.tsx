// src/components/VersusView.tsx
import React, { useState } from "react";
import { simulateMatchProbabilities } from "../hooks/SimulateMatches.ts";

type Player = {
  id: string;
  name: string;
  rating: number;
  mainFaction: string;
  matches: number;
  matchesWon: number;
  matchesLost: number;
  rd: number;
};

interface Props {
  players: Player[];
}

const colors = {
  canary: {
    darkgreen: "#1d250f",
    lightgreen: "#81857a",
    white: "#ffffff",
    background: "#fffffe",
    accent: "#131a04",
  },
};

const VersusView: React.FC<Props> = ({ players }) => {
  const [playerA, setPlayerA] = useState<Player | null>(null);
  const [playerB, setPlayerB] = useState<Player | null>(null);
  const [queryA, setQueryA] = useState("");
  const [queryB, setQueryB] = useState("");
  const [showSuggestionsA, setShowSuggestionsA] = useState(false);
  const [showSuggestionsB, setShowSuggestionsB] = useState(false);
  const [probabilities, setProbabilities] = React.useState<{ probAwin: number; probBwin: number } | null>(null);

  const handleSimulate = () => {
  if (!playerA || !playerB) return;

  const result = simulateMatchProbabilities(playerA, playerB);

  if (result.winner === "A") {
    setProbabilities({
      probAwin: result.probability,
      probBwin: 100 - result.probability,
    });
  } else {
    setProbabilities({
      probAwin: 100 - result.probability,
      probBwin: result.probability,
    });
  }
};


  const handleSelectPlayer = (player: Player, side: "A" | "B") => {
    if (side === "A") {
      setPlayerA(player);
      setQueryA(player.name);
      setShowSuggestionsA(false);
    } else {
      setPlayerB(player);
      setQueryB(player.name);
      setShowSuggestionsB(false);
    }
  };

  const filterPlayers = (query: string) =>
    players.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );

  const renderPlayerCard = (player: Player | null) => {
    if (!player) {
      return (
        <div style={{
          width: "45%",
          maxWidth: "45%",
          backgroundColor: colors.canary.white,
          border: `1px solid ${colors.canary.lightgreen}`,
          borderRadius: "1rem",
          padding: "1rem",
          boxShadow: `0 0 10px ${colors.canary.lightgreen}`,
          textAlign: "center",
          color: colors.canary.lightgreen,
          fontWeight: "500",
          userSelect: "none"
        }}>
          Selecciona un jugador
        </div>
      );
    }

    return (
      <div style={{
        width: "45%",
        maxWidth: "45%",
        backgroundColor: colors.canary.white,
        border: `1px solid ${colors.canary.darkgreen}`,
        borderRadius: "1rem",
        padding: "1.25rem",
        boxShadow: `0 4px 10px ${colors.canary.darkgreen}`,
        transition: "box-shadow 0.3s",
        color: colors.canary.darkgreen,
      }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 20px ${colors.canary.accent}`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 10px ${colors.canary.darkgreen}`;
        }}
      >
        <h3 style={{
          fontSize: "1.5rem",
          fontWeight: "800",
          color: colors.canary.darkgreen,
          marginBottom: "0.75rem",
          textAlign: "center",
          userSelect: "none"
        }}>
          {player.name}
        </h3>
        <div style={{
          lineHeight: 1.5,
          color: colors.canary.darkgreen,
          fontSize: "1rem",
          fontWeight: "500",
        }}>
          <p><span style={{ fontWeight: "700" }}>Facción:</span> {player.mainFaction}</p>
          <p><span style={{ fontWeight: "700" }}>Rating:</span> {player.rating.toFixed(2)}</p>
          <p><span style={{ fontWeight: "700" }}>Partidas:</span> {player.matches}</p>
          <p><span style={{ fontWeight: "700" }}>Ganadas:</span> {player.matchesWon}</p>
          <p><span style={{ fontWeight: "700" }}>Perdidas:</span> {player.matchesLost}</p>
        </div>
      </div>
    );
  };

  return (
    <div style={{
      maxWidth: "48rem",
      margin: "0 auto",
      padding: "1.5rem",
      backgroundColor: colors.canary.background,
      color: colors.canary.darkgreen,
      fontFamily: "system-ui, sans-serif",
    }}>
      {/* Inputs con Autocompletado */}
      <div style={{
        display: "flex",
        flexDirection: "",
        gap: "1.5rem",
        marginBottom: "2.5rem",
      }}>
        {/* Jugador A */}
        <div style={{ position: "relative", width: "100%" }}>
          <label style={{
            display: "block",
            marginBottom: "0.5rem",
            fontWeight: "700",
            userSelect: "none",
            color: colors.canary.darkgreen,
          }}>
            Jugador A
          </label>
          <input
            type="text"
            value={queryA}
            onChange={(e) => {
              setQueryA(e.target.value);
              setShowSuggestionsA(true);
            }}
            onFocus={() => setShowSuggestionsA(true)}
            onBlur={() => setTimeout(() => setShowSuggestionsA(false), 200)}
            placeholder="Escribe un nombre..."
            style={{
              width: "100%",
              padding: "0.75rem",
              border: `1px solid ${colors.canary.lightgreen}`,
              borderRadius: "0.5rem",
              backgroundColor: colors.canary.white,
              color: colors.canary.darkgreen,
              fontWeight: "600",
              outline: "none",
              boxShadow: showSuggestionsA ? `0 0 6px ${colors.canary.accent}` : "none",
            }}
          />
          {showSuggestionsA && (
            <ul style={{
              position: "absolute",
              zIndex: 20,
              width: "100%",
              backgroundColor: colors.canary.white,
              border: `1px solid ${colors.canary.lightgreen}`,
              borderRadius: "0.5rem",
              boxShadow: `0 4px 8px rgba(0,0,0,0.1)`,
              marginTop: "0.25rem",
              maxHeight: "12rem",
              overflowY: "auto",
              color: colors.canary.darkgreen,
              fontWeight: "600",
              listStyle: "none",
              padding: 0,
            }}>
              {filterPlayers(queryA).map((player) => (
                <li
                  key={player.id}
                  onClick={() => handleSelectPlayer(player, "A")}
                  style={{
                    padding: "0.5rem 1rem",
                    cursor: "pointer",
                    userSelect: "none",
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = colors.canary.lightgreen}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = colors.canary.white}
                >
                  {player.name}
                </li>
              ))}
              {filterPlayers(queryA).length === 0 && (
                <li style={{ padding: "0.5rem 1rem", color: colors.canary.lightgreen, userSelect: "none", fontSize: "0.875rem" }}>
                  Sin resultados
                </li>
              )}
            </ul>
          )}
        </div>

        {/* Jugador B */}
        <div style={{ position: "relative", width: "100%" }}>
          <label style={{
            display: "block",
            marginBottom: "0.5rem",
            fontWeight: "700",
            userSelect: "none",
            color: colors.canary.darkgreen,
          }}>
            Jugador B
          </label>
          <input
            type="text"
            value={queryB}
            onChange={(e) => {
              setQueryB(e.target.value);
              setShowSuggestionsB(true);
            }}
            onFocus={() => setShowSuggestionsB(true)}
            onBlur={() => setTimeout(() => setShowSuggestionsB(false), 200)}
            placeholder="Escribe un nombre..."
            style={{
              width: "100%",
              padding: "0.75rem",
              border: `1px solid ${colors.canary.lightgreen}`,
              borderRadius: "0.5rem",
              backgroundColor: colors.canary.white,
              color: colors.canary.darkgreen,
              fontWeight: "600",
              outline: "none",
              boxShadow: showSuggestionsB ? `0 0 6px ${colors.canary.accent}` : "none",
            }}
          />
          {showSuggestionsB && (
            <ul style={{
              position: "absolute",
              zIndex: 20,
              width: "100%",
              backgroundColor: colors.canary.white,
              border: `1px solid ${colors.canary.lightgreen}`,
              borderRadius: "0.5rem",
              boxShadow: `0 4px 8px rgba(0,0,0,0.1)`,
              marginTop: "0.25rem",
              maxHeight: "12rem",
              overflowY: "auto",
              color: colors.canary.darkgreen,
              fontWeight: "600",
              listStyle: "none",
              padding: 0,
            }}>
              {filterPlayers(queryB).map((player) => (
                <li
                  key={player.id}
                  onClick={() => handleSelectPlayer(player, "B")}
                  style={{
                    padding: "0.5rem 1rem",
                    cursor: "pointer",
                    userSelect: "none",
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = colors.canary.lightgreen}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = colors.canary.white}
                >
                  {player.name}
                </li>
              ))}
              {filterPlayers(queryB).length === 0 && (
                <li style={{ padding: "0.5rem 1rem", color: colors.canary.lightgreen, userSelect: "none", fontSize: "0.875rem" }}>
                  Sin resultados
                </li>
              )}
            </ul>
          )}
        </div>
      </div>

      {/* Cartas jugadores */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "1rem",
        marginBottom: "2rem",
      }}>
        {renderPlayerCard(playerA)}
        {renderPlayerCard(playerB)}
      </div>

      {/* Botón simular */}
      <button
        onClick={handleSimulate}
        disabled={!playerA || !playerB}
        style={{
          width: "100%",
          backgroundColor: colors.canary.accent,
          color: colors.canary.white,
          fontWeight: "700",
          fontSize: "1.25rem",
          padding: "1rem",
          border: "none",
          borderRadius: "1rem",
          cursor: (!playerA || !playerB) ? "not-allowed" : "pointer",
          opacity: (!playerA || !playerB) ? 0.6 : 1,
          userSelect: "none",
        }}
        title={(!playerA || !playerB) ? "Selecciona dos jugadores" : "Simular partida"}
      >
        Simular partida
      </button>

      {/* Resultados */}
      {probabilities && (
        <div
          style={{
            marginTop: "2rem",
            fontWeight: "700",
            fontSize: "1.5rem",
            textAlign: "center",
            userSelect: "none",
            color: colors.canary.accent,
          }}
        >
          {console.log(probabilities.probAwin)}
          {probabilities.probAwin > probabilities.probBwin
            ? `Ganador probable: ${playerA?.name} (${probabilities.probAwin.toFixed(2)}%)`
            : `Ganador probable: ${playerB?.name} (${probabilities.probBwin.toFixed(2)}%)`}
        </div>
      )}
    </div>
  );
};

export default VersusView;

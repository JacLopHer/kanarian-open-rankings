// src/components/VersusView.tsx
import React, { useState } from "react";
import { Player } from "../types/Player.ts";
import { simulateMatchProbabilities } from "../hooks/SimulateMatches.ts";
import { PlayerSelector } from "./PlayerSelector.tsx";
import { PlayerCard } from "./PlayerCard.tsx";
import { colors } from "../styles/colors.ts";

interface Props {
  players: Player[];
}

export const VersusView: React.FC<Props> = ({ players }) => {
  const [playerA, setPlayerA] = useState<Player | null>(null);
  const [playerB, setPlayerB] = useState<Player | null>(null);
  const [queryA, setQueryA] = useState("");
  const [queryB, setQueryB] = useState("");
  const [probabilities, setProbabilities] = useState<{ probAwin: number; probBwin: number } | null>(null);

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

  return (
    <div style={{
      maxWidth: "48rem",
      margin: "0 auto",
      padding: "1.5rem",
      backgroundColor: colors.background,
      color: colors.darkgreen,
      fontFamily: "system-ui, sans-serif",
    }}>
      <div style={{
        display: "flex",
        gap: "1.5rem",
        marginBottom: "2.5rem",
      }}>
        <PlayerSelector
          label="Jugador A"
          query={queryA}
          onQueryChange={setQueryA}
          players={players}
          onSelect={(p) => {
            setPlayerA(p);
            setQueryA(p.name);
          }}
        />
        <PlayerSelector
          label="Jugador B"
          query={queryB}
          onQueryChange={setQueryB}
          players={players}
          onSelect={(p) => {
            setPlayerB(p);
            setQueryB(p.name);
          }}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2rem" }}>
        <PlayerCard player={playerA} />
        <PlayerCard player={playerB} />
      </div>

      <button
        onClick={handleSimulate}
        style={{
          width: "100%",
          padding: "1rem",
          backgroundColor: colors.darkgreen,
          color: colors.white,
          border: "none",
          borderRadius: "0.5rem",
          fontWeight: "700",
          fontSize: "1.2rem",
          cursor: "pointer"
        }}
        disabled={!playerA || !playerB}
      >
        Simular enfrentamiento
      </button>

      {probabilities && (
        <div style={{ marginTop: "2rem", textAlign: "center", fontWeight: "700" }}>
          <p>Probabilidad de victoria:</p>
          <p>{playerA?.name}: {probabilities.probAwin.toFixed(2)}%</p>
          <p>{playerB?.name}: {probabilities.probBwin.toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
};

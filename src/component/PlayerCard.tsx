// src/components/PlayerCard.tsx
import React from "react";
import { Player } from "../types/Player.ts";
import { colors } from "../styles/colors.ts";

interface Props {
  player: Player | null;
}

export const PlayerCard: React.FC<Props> = ({ player }) => {
  if (!player) {
    return (
      <div style={{
        width: "45%",
        maxWidth: "45%",
        backgroundColor: colors.white,
        border: `1px solid ${colors.lightgreen}`,
        borderRadius: "1rem",
        padding: "1rem",
        boxShadow: `0 0 10px ${colors.lightgreen}`,
        textAlign: "center",
        color: colors.lightgreen,
        fontWeight: "500",
        userSelect: "none"
      }}>
        Selecciona un jugador
      </div>
    );
  }

  return (
    <div
      style={{
        width: "45%",
        maxWidth: "45%",
        backgroundColor: colors.white,
        border: `1px solid ${colors.darkgreen}`,
        borderRadius: "1rem",
        padding: "1.25rem",
        boxShadow: `0 4px 10px ${colors.darkgreen}`,
        transition: "box-shadow 0.3s",
        color: colors.darkgreen,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 20px ${colors.accent}`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 10px ${colors.darkgreen}`;
      }}
    >
      <div style={{ maxHeight: "80vh", overflowY: "auto" }}>
        <h3 style={{
          fontSize: "1.5rem",
          fontWeight: "800",
          color: colors.darkgreen,
          marginBottom: "0.75rem",
          textAlign: "center",
          userSelect: "none"
        }}>
          {player.name}
        </h3>
        <div style={{
          lineHeight: 1.5,
          fontSize: "1rem",
          fontWeight: "500",
        }}>
          <p><strong>Facción:</strong> {player.mainFaction}</p>
          <p><strong>Rating:</strong> {player.rating.toFixed(2)}</p>
          <p><strong>Partidas:</strong> {player.matches}</p>
          <p><strong>Ganadas:</strong> {player.matchesWon}</p>
          <p><strong>Perdidas:</strong> {player.matchesLost}</p>
        </div>
      </div>
    </div>
  );
};

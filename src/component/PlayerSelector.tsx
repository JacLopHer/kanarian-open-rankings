// src/components/PlayerSelector.tsx
import React, { useState } from "react";
import { Player } from "../types/Player.ts";
import { colors } from "../styles/colors.ts";

interface Props {
  label: string;
  query: string;
  onQueryChange: (value: string) => void;
  players: Player[];
  onSelect: (player: Player) => void;
}

export const PlayerSelector: React.FC<Props> = ({
  label,
  query,
  onQueryChange,
  players,
  onSelect,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredPlayers = players.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <label style={{
        display: "block",
        marginBottom: "0.5rem",
        fontWeight: "700",
        userSelect: "none",
        color: colors.darkgreen,
      }}>
        {label}
      </label>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          onQueryChange(e.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        placeholder="Escribe un nombre..."
        style={{
          width: "100%",
          padding: "0.75rem",
          border: `1px solid ${colors.lightgreen}`,
          borderRadius: "0.5rem",
          backgroundColor: colors.white,
          color: colors.darkgreen,
          fontWeight: "600",
          outline: "none",
          boxShadow: showSuggestions ? `0 0 6px ${colors.accent}` : "none",
        }}
      />
      {showSuggestions && (
        <ul style={{
          position: "absolute",
          zIndex: 20,
          width: "100%",
          backgroundColor: colors.white,
          border: `1px solid ${colors.lightgreen}`,
          borderRadius: "0.5rem",
          boxShadow: `0 4px 8px rgba(0,0,0,0.1)`,
          marginTop: "0.25rem",
          maxHeight: "12rem",
          overflowY: "auto",
          listStyle: "none",
          padding: 0,
        }}>
          {filteredPlayers.map((player) => (
            <li
              key={player.id}
              onClick={() => {
                onSelect(player);
                setShowSuggestions(false);
              }}
              style={{
                padding: "0.5rem 1rem",
                cursor: "pointer",
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = colors.lightgreen}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = colors.white}
            >
              {player.name}
            </li>
          ))}
          {filteredPlayers.length === 0 && (
            <li style={{ padding: "0.5rem 1rem", color: colors.lightgreen, fontSize: "0.875rem" }}>
              Sin resultados
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

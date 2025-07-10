import React, { useEffect, useState } from "react";
import RankingTable from "./RankingTable.tsx";
import { VersusView } from "./VersusView.tsx";
import ModeSwitcher from "./ModeSwitcher.tsx";
import SearchBar from "./SearchBar.tsx";
import FactionTabs from "./FactionTabs.tsx";
import Pagination from "./Pagination.tsx";

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

const PAGE_SIZE = 20;

const KanarianOpenRankings: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<"40k" | "aos" | "tow">("40k");
  const [mode, setMode] = useState<"ranking" | "versus">("ranking");

  useEffect(() => {
    const path = `./data/${activeTab}_rankings.json`;
    fetch(path)
      .then((res) => res.json())
      .then((data: Player[]) => {
        const sorted = [...data]
          .sort((a, b) => b.rating - a.rating)
          .map((player, index) => ({
            ...player,
            position: index + 1,
          }));
        setPlayers(sorted);
      })
      .catch(console.error);
  }, [activeTab]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleTabChange = (tab: "40k" | "aos" | "tow") => {
    setActiveTab(tab);
    setCurrentPage(1);
    setSearch("");
  };


  const filteredPlayers = players.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.mainFaction.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPlayers.length / PAGE_SIZE);
  const playersPage = filteredPlayers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="min-h-screen bg-canary.background text-canary.darkgreen font-sans px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <header className="text-center">
          <img
            src="./media/logo-kanarian-open.jpeg"
            alt="Kanarian Open Logo"
            className="mx-auto mb-4 w-100 h-32"
          />
        </header>

        <ModeSwitcher mode={mode} setMode={setMode} />
        <FactionTabs activeTab={activeTab} onTabChange={handleTabChange} />

        {mode === "ranking" && (
          <SearchBar value={search} onChange={handleSearchChange} />
        )}

        {players.length > 0 ? (
          mode === "ranking" ? (
            <>
              <div className="overflow-x-auto">
                <RankingTable players={playersPage} startIndex={(currentPage - 1) * PAGE_SIZE} />
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          ) : (
            <VersusView players={players} />
          )
        ) : (
          <p className="text-center text-canary.lightgreen">Cargando datos...</p>
        )}
      </div>
    </div>
  );
};

export default KanarianOpenRankings;

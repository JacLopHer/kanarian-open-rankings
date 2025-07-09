import React, { useEffect, useState } from "react";
import RankingTable from "./RankingTable.tsx";
import RankingsTabs from "./RankingTabs.tsx";

type Player = {
  id: string;
  name: string;
  rating: number;
  mainFaction: string;
  matches: number;
  matchesWon: number;
  matchesLost: number;
};

const PAGE_SIZE = 20;

const KanarianOpenRankings: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<"40k" | "aos" | "tow">("40k");

  // Cargar rankings según la pestaña seleccionada
  useEffect(() => {
    const path = `./kanarian-open-rankings/data/${activeTab}_rankings.json`;
    fetch(path)
      .then((res) => res.json())
      .then(setPlayers)
      .catch(console.error);
  }, [activeTab]);

  const handleTabChange = (tab: "40k" | "aos" | "tow") => {
    setActiveTab(tab);
    setCurrentPage(1);
    setSearch("");
  };

  const filteredPlayers = players
    .filter(
      (p) =>
        p.name?.toLowerCase().includes(search.toLowerCase()) ||
        p.mainFaction?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => b.rating - a.rating);

  const totalPages = Math.ceil(filteredPlayers.length / PAGE_SIZE);

  const playersPage = filteredPlayers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen bg-canary.background text-canary.darkgreen font-sans px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <header className="text-center">
          <img
            src="./kanarian-open-rankings/media/logo-kanarian-open.jpeg"
            alt="Kanarian Open Logo"
            className="mx-auto mb-4 w-72 h-auto"
          />
        </header>

        {/* Tabs */}
        <div className="flex justify-center  border-canary-darkgreen">
          {[
            { id: "40k", src: "./kanarian-open-rankings/media/40k-logo.png", alt: "Warhammer 40K" },
            { id: "aos", src: "./kanarian-open-rankings/media/aos-logo.png", alt: "Age of Sigmar" },
            { id: "tow", src: "./kanarian-open-rankings/media/tow-logo.png", alt: "The Old World" },
          ].map((tab) => (
            <div
              key={tab.id}
              onClick={() => handleTabChange(tab.id as "40k" | "aos" | "tow")}
              className={`w-48 h-32 cursor-pointer flex items-center justify-center transition-all duration-300
    ${activeTab === tab.id ? "scale-110 opacity-100" : "opacity-70 hover:opacity-100"}
  `}
            >
              <img
                src={tab.src}
                alt={tab.alt}
                className="max-w-full max-h-full"
              />
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="mb-6 text-center">
          <input
            type="text"
            placeholder="Buscar jugador o facción..."
            className="w-full max-w-md px-4 py-2 border border-canary.lightgreen rounded-lg focus:outline-none focus:ring-2 focus:ring-canary.accent bg-white text-canary.darkgreen"
            value={search}
            onChange={handleSearchChange}
          />
        </div>

        {players.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <RankingTable players={playersPage} startIndex={(currentPage - 1) * PAGE_SIZE} />
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6 space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-canary.accent text-canary.white rounded disabled:opacity-50"
              >
                Anterior
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(
                  (page) =>
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 2 && page <= currentPage + 2)
                )
                .map((page, i, arr) => {
                  if (i > 0 && page - arr[i - 1] > 1) {
                    return (
                      <span
                        key={`dots-${page}`}
                        className="px-2 py-1 text-canary.lightgreen"
                      >
                        ...
                      </span>
                    );
                  }
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-1 rounded ${page === currentPage
                        ? "bg-canary.darkgreen text-canary.white font-bold"
                        : "bg-canary.accent text-canary.white"
                        }`}
                    >
                      {page}
                    </button>
                  );
                })}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-canary.accent text-canary.white rounded disabled:opacity-50"
              >
                Siguiente
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-canary.lightgreen">
            Cargando datos...
          </p>
        )}
      </div>
    </div>
  );
};

export default KanarianOpenRankings;

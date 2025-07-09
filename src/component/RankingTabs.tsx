import React, { useState } from "react";
import RankingTable from "./RankingTable";

type Player = {
  id: string;
  name: string;
  rating: number;
  mainFaction: string;
  matches: number;
  matchesWon: number;
  matchesLost: number;
};

type Props = {
  ranking40k: Player[];
  rankingAos: Player[];
  rankingTow: Player[];
};

const RankingsTabs: React.FC<Props> = ({ ranking40k, rankingAos, rankingTow }) => {
  const [activeTab, setActiveTab] = useState<"40k" | "aos" | "tow">("40k");

  const tabs = [
    { id: "40k", image: "/media/40k_logo.png", alt: "Warhammer 40K" },
    { id: "aos", image: "/media/aos_logo.png", alt: "Age of Sigmar" },
    { id: "tow", image: "/media/tow_logo.png", alt: "The Old World" },
  ];

  const getTabClass = (tabId: string) =>
    `w-32 h-20 sm:w-36 sm:h-24 px-2 py-2 rounded-t-lg transition-colors duration-300 flex items-center justify-center
     ${activeTab === tabId
       ? "bg-canary-darkgreen shadow"
       : "bg-canary-lightgreen/50 hover:bg-canary-lightgreen"}`;

  return (
    <div className="w-full max-w-5xl mx-auto font-sans">
      <div className="flex gap-2 justify-center border-b border-canary-darkgreen mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={getTabClass(tab.id)}
            onClick={() => setActiveTab(tab.id as "40k" | "aos" | "tow")}
          >
            <img
              src={tab.image}
              alt={tab.alt}
              className={`max-h-full max-w-full object-contain transition-transform duration-300 ${
                activeTab === tab.id
                  ? "scale-105"
                  : "opacity-80 hover:opacity-100"
              }`}
            />
          </button>
        ))}
      </div>

      <div className="animate-fade-in">
        {activeTab === "40k" && <RankingTable players={ranking40k} />}
        {activeTab === "aos" && <RankingTable players={rankingAos} />}
        {activeTab === "tow" && <RankingTable players={rankingTow} />}
      </div>
    </div>
  );
};

export default RankingsTabs;

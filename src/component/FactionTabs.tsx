type Props = {
  activeTab: "40k" | "aos" | "tow";
  onTabChange: (tab: "40k" | "aos" | "tow") => void;
};

const tabs = [
  { id: "40k", src: "./media/40k-logo.png", alt: "Warhammer 40K" },
  { id: "aos", src: "./media/aos-logo.png", alt: "Age of Sigmar" },
  { id: "tow", src: "./media/tow-logo.png", alt: "The Old World" },
];

const FactionTabs = ({ activeTab, onTabChange }: Props) => (
  <div className="flex justify-center mb-6">
    {tabs.map((tab) => (
      <div
        key={tab.id}
        onClick={() => onTabChange(tab.id as "40k" | "aos" | "tow")}
        className={`w-48 h-32 cursor-pointer flex items-center justify-center transition-all duration-300
          ${activeTab === tab.id ? "scale-110 opacity-100" : "opacity-70 hover:opacity-100"}
        `}
      >
        <img src={tab.src} alt={tab.alt} className="max-w-full max-h-full" />
      </div>
    ))}
  </div>
);

export default FactionTabs;

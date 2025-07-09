import React from "react";

const ImageTest: React.FC = () => {
  return (
    <div className="p-8">
      <img
        src="/media/40k_logo.png"
        alt="Test logo"
        className="h-32 w-auto object-contain border"
      />
    </div>
  );
};

export default ImageTest;
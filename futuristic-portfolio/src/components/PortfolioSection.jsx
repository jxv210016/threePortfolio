import React from "react";

export const PortfolioSection = ({ currentFace }) => {
  const faceContent = [
    "Jay Vanam",
    "Projects",
    "Skills",
    "Experience",
    "Education",
    "Contact",
  ];

  return (
    <div className="portfolio-section">
      <h1>{faceContent[currentFace]}</h1>
    </div>
  );
};

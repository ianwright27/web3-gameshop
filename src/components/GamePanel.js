import React from "react";
import GameEmbed from "./GameEmbed";

const GamePanel = ({ seed, handleScoreUpdate }) => {
  return <GameEmbed onScoreUpdate={handleScoreUpdate} seed={seed} />;
};

export default GamePanel;

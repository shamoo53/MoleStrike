"use client";

import React, { useState } from "react";
import { ScoreBoard } from "@/components/game/ScoreBoard";
import { Timer } from "@/components/game/Timer";
import { GameControls } from "@/components/game/GameControls";
import { GameGrid } from "@/components/game/GameGrid";
import { GameModal } from "@/components/game/GameModal";
import { CustomCursor } from "@/components/game/CustomCursor";
import { useWhackAMole } from "@/hooks/useWhackAMole";

export default function GamePage() {
  const {
    score,
    timeLeft,
    moles,
    gameActive,
    hitMoles,
    moleHits,
    showModal,
    finalScore,
    startGame,
    whackMole,
  } = useWhackAMole();

  const [isHitting, setIsHitting] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleWhack = (index: number) => {
    setIsHitting(true);
    setTimeout(() => setIsHitting(false), 150);
    whackMole(index);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className="min-h-screen cursor-none"
      onMouseMove={handleMouseMove}
      style={{
        background: "#4CAF50",
      }}
    >
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <ScoreBoard score={score} />
            <GameControls
              gameActive={gameActive}
              timeLeft={timeLeft}
              onStart={startGame}
            />
            <Timer timeLeft={timeLeft} />
          </div>

          <GameGrid
            moles={moles}
            moleHits={moleHits}
            hitMoles={hitMoles}
            gameActive={gameActive}
            onWhack={handleWhack}
          />

          <GameModal
            show={showModal}
            finalScore={finalScore}
            onPlayAgain={startGame}
          />

          <CustomCursor position={cursorPosition} isHitting={isHitting} />
        </div>
      </div>
    </div>
  );
}

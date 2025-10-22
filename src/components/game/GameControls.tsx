interface GameControlsProps {
  gameActive: boolean;
  timeLeft: number;
  onStart: () => void;
}

export const GameControls = ({
  gameActive,
  timeLeft,
  onStart,
}: GameControlsProps) => {
  if (gameActive) {
    return <div className="h-10"></div>;
  }

  return (
    <button
      onClick={onStart}
      className="bg-[#8B4513] hover:bg-[#654321] text-white font-bold py-3 px-8 rounded-lg border-4 border-[#654321] text-2xl transform hover:scale-105 transition-transform"
    >
      {timeLeft === 30 ? "Start Game" : "Play Again"}
    </button>
  );
};

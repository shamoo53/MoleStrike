interface GameModalProps {
  show: boolean;
  finalScore: number;
  onPlayAgain: () => void;
}

export const GameModal = ({
  show,
  finalScore,
  onPlayAgain,
}: GameModalProps) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg text-center">
        <h2 className="text-3xl font-bold mb-4">Game Over!</h2>
        <p className="text-xl mb-4">Final Score: {finalScore}</p>
        <button
          onClick={onPlayAgain}
          className="bg-[#8B4513] hover:bg-[#654321] text-white font-bold py-2 px-4 rounded"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

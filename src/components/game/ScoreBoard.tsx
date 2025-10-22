import { Trophy } from "lucide-react";

interface ScoreBoardProps {
  score: number;
}

export const ScoreBoard = ({ score }: ScoreBoardProps) => {
  return (
    <div className="flex items-center gap-4 bg-[#8B4513] px-6 py-2 rounded-lg border-4 border-[#654321]">
      <Trophy className="text-yellow-400 w-8 h-8" />
      <span className="text-4xl font-bold text-yellow-400">{score}</span>
    </div>
  );
}; 
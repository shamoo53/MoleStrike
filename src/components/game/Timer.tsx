import { Timer as TimerIcon } from "lucide-react";

interface TimerProps {
  timeLeft: number;
}

export const Timer = ({ timeLeft }: TimerProps) => {
  return (
    <div className="flex items-center gap-4 bg-[#8B4513] px-6 py-2 rounded-lg border-4 border-[#654321]">
      <TimerIcon className="text-yellow-400 w-8 h-8" />
      <span className="text-4xl font-bold text-yellow-400">{timeLeft}s</span>
    </div>
  );
}; 
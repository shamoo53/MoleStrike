import { motion } from "framer-motion";
import { Mole } from "./Mole";

interface GameGridProps {
  moles: boolean[];
  moleHits: boolean[];
  hitMoles: boolean[];
  gameActive: boolean;
  onWhack: (index: number) => void;
}

export const GameGrid = ({
  moles,
  moleHits,
  hitMoles,
  gameActive,
  onWhack,
}: GameGridProps) => {
  return (
    <div className="grid grid-cols-3 gap-2 max-w-xl mx-auto">
      {moles.map((isUp, index) => (
        <div key={index} className="relative aspect-square">
          <div className="relative aspect-square">
            <Mole
              isUp={isUp}
              isHit={moleHits[index]}
              gameActive={gameActive}
              onWhack={() => onWhack(index)}
            />
          </div>

          {hitMoles[index] && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center z-50 pointer-events-none"
              initial={{ opacity: 1, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold text-yellow-400 drop-shadow-lg">
                  +1
                </span>
              </div>
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
};

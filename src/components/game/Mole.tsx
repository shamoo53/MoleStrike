import { motion } from "framer-motion";

interface MoleProps {
  isUp: boolean;
  isHit: boolean;
  onWhack: () => void;
  gameActive: boolean;
}

export const Mole = ({ isUp, isHit, onWhack, gameActive }: MoleProps) => {
  return (
    <svg
      viewBox="0 0 500 300"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      {/* Hole shape with animation */}
      <ellipse
        className="hole animate-wave"
        cx="250"
        cy="200"
        rx="100"
        ry="50"
        fill="#5D4037"
        stroke="#8B4513"
        strokeWidth="8"
      />

      {/* Mole */}
      {isUp && (
        <motion.g
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={(e) => {
            e.stopPropagation();
            if (gameActive && isUp && !isHit) {
              onWhack();
            }
          }}
          className="cursor-pointer"
        >
          {/* Mole Body */}
          <circle cx="250" cy="180" r="60" fill="#8B4513" />
          {/* Eyes */}
          <circle cx="225" cy="160" r="10" fill="white" />
          <circle cx="275" cy="160" r="10" fill="white" />
          <circle cx="225" cy="160" r="5" fill="black" />
          <circle cx="275" cy="160" r="5" fill="black" />
          {/* Nose */}
          <circle cx="250" cy="180" r="12" fill="#D2691E" />
          {/* Mouth */}
          <ellipse cx="250" cy="200" rx="20" ry="8" fill="#A0522D" />
        </motion.g>
      )}
    </svg>
  );
};

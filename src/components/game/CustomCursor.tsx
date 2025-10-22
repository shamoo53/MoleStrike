import { motion } from "framer-motion";

interface CustomCursorProps {
  position: { x: number; y: number };
  isHitting: boolean;
}

export const CustomCursor = ({ position, isHitting }: CustomCursorProps) => {
  return (
    <motion.div
      className="fixed pointer-events-none z-50"
      animate={{
        x: position.x - 32,
        y: position.y - 32,
        rotate: isHitting ? 45 : 0,
      }}
      transition={{ duration: 0, rotate: { duration: 0.1 } }}
    >
      <div className="w-16 h-16">
        <img src="/hammer.svg" alt="Hammer Cursor" className="w-full h-full" />
      </div>
    </motion.div>
  );
};

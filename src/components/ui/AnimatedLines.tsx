import React from "react";

export function AnimatedLines() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Generate multiple lines with different animations */}
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute w-[2px] h-[200px] bg-gradient-to-b from-white/40 to-transparent"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            transform: "rotate(-45deg)",
            animation: `falling ${2 + Math.random() * 3}s linear ${
              Math.random() * 2
            }s infinite`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes falling {
          0% {
            transform: rotate(-45deg) translateX(-100%) translateY(-100%);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: rotate(-45deg) translateX(200%) translateY(200%);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

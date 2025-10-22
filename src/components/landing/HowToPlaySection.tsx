import {
  UserPlus,
  Calendar,
  Trophy,
  Coins,
  Gamepad2,
  Bitcoin,
  Target,
  Wallet,
} from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

const steps = [
  {
    number: 1,
    title: "Sign Up",
    description:
      "Create your account and connect your StarkNet wallet to get started.",
    icon: UserPlus,
    bgColor: "bg-purple-900/20",
    iconColor: "text-purple-400",
    numberColor: "bg-purple-900",
  },
  {
    number: 2,
    title: "Daily Challenges",
    description:
      "Participate in daily Whack-a-Mole challenges to earn rewards and points.",
    icon: Calendar,
    bgColor: "bg-cyan-900/20",
    iconColor: "text-cyan-400",
    numberColor: "bg-cyan-900",
  },
  {
    number: 3,
    title: "Leaderboards",
    description:
      "Compete with other players and climb the global leaderboards.",
    icon: Trophy,
    bgColor: "bg-yellow-900/20",
    iconColor: "text-yellow-400",
    numberColor: "bg-yellow-900",
  },
  {
    number: 4,
    title: "Rewards",
    description:
      "Collect your rewards and track your progress on the blockchain.",
    icon: Coins,
    bgColor: "bg-green-900/20",
    iconColor: "text-green-400",
    numberColor: "bg-green-900",
  },
];

export function HowToPlaySection() {
  return (
    <section id="how-to-play" className="py-24 bg-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            How to Play
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Getting started with MoleStrike is easy. Follow these simple steps to
            begin your decentralized Whack-a-Mole adventure.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {steps.map((step) => (
              <div
                key={step.number}
                className={`flex items-start gap-4 p-6 rounded-xl transition-all duration-300 ${step.bgColor} hover:translate-x-2`}
              >
                <div
                  className={`${step.numberColor} w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shrink-0`}
                >
                  {step.number}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <step.icon className={`w-5 h-5 ${step.iconColor}`} />
                    <h3 className="text-xl font-semibold text-white">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-visible p-4">
              {/* Animated Balls Container - Moved outside the group */}
              <div className="absolute inset-4 overflow-visible">
                {/* Top Balls */}
                <div
                  className="w-8 h-8 rounded-full animate-ball-1"
                  style={{
                    position: "absolute",
                    left: "5%",
                    top: "15%",
                    animation: "moveBall1 4s linear infinite",
                  }}
                ></div>
                <div
                  className="w-8 h-8 rounded-full animate-ball-2"
                  style={{
                    position: "absolute",
                    right: "15%",
                    top: "15%",
                    animation: "moveBall2 4s linear infinite",
                  }}
                ></div>
                {/* Bottom Balls */}
                <div
                  className="w-8 h-8 rounded-full animate-ball-3"
                  style={{
                    position: "absolute",
                    left: "5%",
                    bottom: "15%",
                    animation: "moveBall3 4s linear infinite",
                  }}
                ></div>
                <div
                  className="w-8 h-8 rounded-full animate-ball-4"
                  style={{
                    position: "absolute",
                    right: "15%",
                    bottom: "15%",
                    animation: "moveBall4 4s linear infinite",
                  }}
                ></div>
              </div>
              {/* Mole Character */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/20 to-transparent rounded-2xl transform group-hover:scale-105 transition-transform duration-500"></div>
                <div className="relative max-w-[400px] mx-auto animate-float">
                  <img
                    src="/cute-mole.png.jpg"
                    alt="Cute Mole Character"
                    className="w-full h-auto rounded-2xl relative z-10 transform group-hover:scale-105 transition-transform duration-500"
                    style={{
                      filter: "drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2))",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes moveBall1 {
          0% {
            transform: translate(0, 50%);
            background-color: #ff6b6b;
          }
          25% {
            transform: translate(0, 0);
            background-color: #ff6b6b;
          }
          50% {
            transform: translate(50%, 0);
            background-color: #4fd1c5;
          }
          75% {
            transform: translate(0, 100%);
            background-color: #4fd1c5;
          }
          100% {
            transform: translate(0, 50%);
            background-color: #9f7aea;
          }
        }
        @keyframes moveBall2 {
          0% {
            transform: translate(100%, 50%);
            background-color: #ff6b6b;
          }
          25% {
            transform: translate(100%, 0);
            background-color: #ff6b6b;
          }
          50% {
            transform: translate(50%, 0);
            background-color: #4fd1c5;
          }
          75% {
            transform: translate(100%, 100%);
            background-color: #4fd1c5;
          }
          100% {
            transform: translate(100%, 50%);
            background-color: #9f7aea;
          }
        }
        @keyframes moveBall3 {
          0% {
            transform: translate(0, 100%);
            background-color: #ff6b6b;
          }
          25% {
            transform: translate(0, 50%);
            background-color: #ff6b6b;
          }
          50% {
            transform: translate(50%, 100%);
            background-color: #4fd1c5;
          }
          75% {
            transform: translate(0, 0);
            background-color: #4fd1c5;
          }
          100% {
            transform: translate(0, 100%);
            background-color: #9f7aea;
          }
        }
        @keyframes moveBall4 {
          0% {
            transform: translate(100%, 100%);
            background-color: #ff6b6b;
          }
          25% {
            transform: translate(100%, 50%);
            background-color: #ff6b6b;
          }
          50% {
            transform: translate(50%, 100%);
            background-color: #4fd1c5;
          }
          75% {
            transform: translate(100%, 0);
            background-color: #4fd1c5;
          }
          100% {
            transform: translate(100%, 100%);
            background-color: #9f7aea;
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-ball-1 {
          position: absolute;
          left: 0;
          top: 0;
          animation: moveBall1 4s linear infinite;
        }
        .animate-ball-2 {
          position: absolute;
          right: 0;
          top: 0;
          animation: moveBall2 4s linear infinite;
        }
        .animate-ball-3 {
          position: absolute;
          left: 0;
          bottom: 0;
          animation: moveBall3 4s linear infinite;
        }
        .animate-ball-4 {
          position: absolute;
          right: 0;
          bottom: 0;
          animation: moveBall4 4s linear infinite;
        }
      `}</style>
    </section>
  );
}

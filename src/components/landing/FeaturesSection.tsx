import { FeatureCard } from "./FeatureCard";
import { Gamepad2, Coins, Trophy, Shield, Users, Wallet } from "lucide-react";

const features = [
  {
    icon: Gamepad2,
    title: "Daily Challenges",
    description:
      "Engage in daily Whack-a-Mole challenges that test your reflexes and strategic thinking. Each day brings new challenges with varying difficulty levels.",
    iconBgColor: "bg-purple-900",
    iconTextColor: "text-purple-300",
    delay: 100,
  },
  {
    icon: Coins,
    title: "On-Chain Rewards",
    description:
      "Earn rewards for your performance in the form of digital assets and tokens. All rewards are recorded on the blockchain, ensuring transparency.",
    iconBgColor: "bg-blue-900",
    iconTextColor: "text-blue-300",
    delay: 200,
  },
  {
    icon: Trophy,
    title: "Decentralized Leaderboards",
    description:
      "Compete with players from around the world on decentralized leaderboards. Track your progress and see how you stack up against others in real-time.",
    iconBgColor: "bg-green-900",
    iconTextColor: "text-green-300",
    delay: 300,
  },
  {
    icon: Shield,
    title: "Blockchain Security",
    description:
      "Enjoy the security and transparency of blockchain technology. All game data, scores, and rewards are secured on the StarkNet blockchain.",
    iconBgColor: "bg-yellow-900",
    iconTextColor: "text-yellow-300",
    delay: 400,
  },
  {
    icon: Users,
    title: "Community Features",
    description:
      "Connect with other players through in-game social features. Share your achievements and compete for top spots on the global leaderboards.",
    iconBgColor: "bg-red-900",
    iconTextColor: "text-red-300",
    delay: 500,
  },
  {
    icon: Wallet,
    title: "StarkNet Integration",
    description:
      "Seamlessly connect your StarkNet wallet to play, earn, and track your rewards. Experience the future of gaming with blockchain technology.",
    iconBgColor: "bg-indigo-900",
    iconTextColor: "text-indigo-300",
    delay: 600,
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="w-full max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-16 animate-fadeIn">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-cyan-300">
          Key Features
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          MoleStrike brings the excitement of Whack-a-Mole into the decentralized
          era, offering a unique blend of fun, competition, and blockchain
          technology.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </section>
  );
};

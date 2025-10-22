import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay: number;
  iconBgColor: string;
  iconTextColor: string;
}

export const FeatureCard = ({
  icon: Icon,
  title,
  description,
  delay,
  iconBgColor,
  iconTextColor,
}: FeatureCardProps) => {
  return (
    <div
      className={`bg-gray-800 border-gray-700 animate-slideInUp animate-delay-${delay} relative overflow-hidden rounded-lg p-6`}
    >
      <div
        className="absolute inset-0 border-2 border-transparent"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #ffd700 25%, #ff3333 50%, #ffd700 75%, transparent 100%) 0% 0% / 400% 100%",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          animation: "border-slide 3s linear infinite",
        }}
      ></div>
      <div className="pb-2">
        <div
          className={`w-14 h-14 ${iconBgColor} rounded-full flex items-center justify-center mb-4 animate-float`}
        >
          <Icon className={`w-7 h-7 ${iconTextColor}`} />
        </div>
        <h3 className="text-xl font-bold text-cyan-300">{title}</h3>
      </div>
      <div>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  );
};

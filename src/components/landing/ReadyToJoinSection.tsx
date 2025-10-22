import { Button } from "@/components/ui/button";

interface ReadyToJoinSectionProps {
  onPlayNow: () => void;
}

export function ReadyToJoinSection({ onPlayNow }: ReadyToJoinSectionProps) {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-blue-900 to-blue-800"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-300 to-cyan-400 bg-clip-text text-transparent">
            Ready to Join the Game?
          </h2>
          
          <p className="text-xl text-gray-200">
            Start your MoleStrike adventure today and experience the future of gaming on the blockchain.
          </p>

          <Button
            onClick={onPlayNow}
            className="bg-purple-500/80 hover:bg-purple-500 text-white px-12 py-6 text-lg rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Play Now
          </Button>
        </div>
      </div>
    </section>
  );
} 
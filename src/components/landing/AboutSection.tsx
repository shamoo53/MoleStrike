import { Button } from "@/components/ui/button";
import Image from "next/image";

export function AboutSection() {
  return (
    <section className="py-24 bg-[#1a1a2e]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <Image
              src="/blockchain-network.jpg"
              alt="Blockchain Network Visualization"
              width={800}
              height={600}
              className="rounded-2xl w-full transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-transparent to-transparent"></div>
          </div>

          <div className="space-y-6">
            <h2 className="text-5xl font-bold text-[#5FE6F4]">
              About MoleStrike
            </h2>

            <div className="space-y-4">
              <p className="text-gray-300 text-lg leading-relaxed">
                MoleStrike was created by a team of passionate gamers and
                blockchain enthusiasts who wanted to bring the fun of classic
                arcade games to the decentralized world.
              </p>

              <p className="text-gray-300 text-lg leading-relaxed">
                Built on StarkNet, MoleStrike leverages the power of Layer 2
                scaling to provide a seamless, fast, and low-cost gaming
                experience while maintaining all the benefits of blockchain
                technology.
              </p>

              <p className="text-gray-300 text-lg leading-relaxed">
                Our mission is to bridge the gap between traditional gaming and
                blockchain technology, creating experiences that are both fun
                and rewarding.
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="mt-8 bg-transparent border-2 border-[#5FE6F4] text-[#5FE6F4] hover:bg-[#5FE6F4]/10 hover:text-white transition-colors"
            >
              Learn More About StarkNet
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

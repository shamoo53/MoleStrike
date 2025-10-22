import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useState } from "react";

interface LeaderboardPlayer {
  rank: number;
  username: string;
  level: number;
  points: number;
}

const topPlayers: LeaderboardPlayer[] = [
  {
    rank: 1,
    username: "MoleKing",
    level: 24,
    points: 2456,
  },
  {
    rank: 2,
    username: "WhackMaster",
    level: 22,
    points: 2189,
  },
  {
    rank: 3,
    username: "MoleMaster99",
    level: 20,
    points: 1987,
  },
  {
    rank: 4,
    username: "BlockChampion",
    level: 19,
    points: 1845,
  },
  {
    rank: 5,
    username: "StarkWhacker",
    level: 18,
    points: 1756,
  },
];

const PlayerAvatar = ({
  username,
  rank,
}: {
  username: string;
  rank: number;
}) => {
  const [avatarUrl, setAvatarUrl] = useState<string>("");

  useEffect(() => {
    const getAvatarUrl = () => {
      let style = "adventurer";
      let options = [];

      if (username === "WhackMaster") {
        style = "lorelei";
        options.push("backgroundColor=ff5733");
      } else if (username === "MoleMaster99") {
        style = "fun-emoji";
        options.push("backgroundColor=4B0082");
      } else {
        switch (rank) {
          case 1:
            style = "adventurer";
            options.push("backgroundColor=ffd700");
            break;
          case 2:
            style = "pixel-art";
            options.push("backgroundColor=c0c0c0");
            break;
          case 4:
            style = "shapes";
            options.push("backgroundColor=0066cc");
            break;
          case 5:
            style = "bottts";
            options.push("backgroundColor=800080");
            break;
        }
      }

      const seed = encodeURIComponent(username);
      const baseUrl = `https://api.dicebear.com/7.x/${style}/svg`;
      const queryParams = `seed=${seed}&${options.join("&")}`;

      return `${baseUrl}?${queryParams}`;
    };

    setAvatarUrl(getAvatarUrl());
  }, [username, rank]);

  return (
    <div className="relative">
      <Avatar className="w-12 h-12 border-2 border-white/20">
        <AvatarImage src={avatarUrl} alt={username} className="object-cover" />
        <AvatarFallback className="bg-gray-700">
          {username.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></div>
    </div>
  );
};

export function LeaderboardSection() {
  return (
    <section className="py-24 bg-[#1E1533]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4 text-[#5FE6F4]">
            Global Leaderboard
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            See the top players from around the world and compete to claim your
            spot at the top.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {topPlayers.map((player) => (
              <div
                key={player.rank}
                className={`flex items-center justify-between p-6 rounded-xl transition-transform hover:scale-[1.02] ${
                  player.rank === 1
                    ? "bg-[#F4A020]"
                    : player.rank === 2
                    ? "bg-[#71717A]"
                    : player.rank === 3
                    ? "bg-[#CD6116]"
                    : "bg-[#374151]"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-white w-8">
                    {player.rank}
                  </span>
                  <PlayerAvatar username={player.username} rank={player.rank} />
                  <div className="ml-2">
                    <h3 className="text-xl font-semibold text-white">
                      {player.username}
                    </h3>
                    <p className="text-sm text-white/70">
                      Level {player.level}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">
                    {player.points.toLocaleString()} pts
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

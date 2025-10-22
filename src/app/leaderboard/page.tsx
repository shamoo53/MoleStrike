"use client";

import { useState } from "react";
import { Trophy, Medal, Search } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  username: string;
  score: number;
  rewards: number;
  isCurrentUser: boolean;
}

export default function LeaderboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [leaderboardData] = useState<LeaderboardEntry[]>([
    {
      rank: 1,
      username: "MoleKing",
      score: 12945,
      rewards: 450,
      isCurrentUser: false,
    },
    {
      rank: 2,
      username: "WhackMaster",
      score: 11832,
      rewards: 380,
      isCurrentUser: false,
    },
    {
      rank: 3,
      username: "StarkPro",
      score: 10998,
      rewards: 320,
      isCurrentUser: false,
    },
    {
      rank: 42,
      username: "MoleWhacker",
      score: 8945,
      rewards: 185,
      isCurrentUser: true,
    },
    {
      rank: 43,
      username: "Player123",
      score: 8890,
      rewards: 180,
      isCurrentUser: false,
    },
    {
      rank: 44,
      username: "GameMaster",
      score: 8854,
      rewards: 178,
      isCurrentUser: false,
    },
  ]);

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "text-yellow-400";
      case 2:
        return "text-gray-400";
      case 3:
        return "text-amber-600";
      default:
        return "text-white";
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return "👑";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return rank;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 ml-64">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-yellow-400 flex items-center gap-3">
              <Trophy className="w-8 h-8" />
              Leaderboard
            </h1>
            <p className="text-gray-400 mt-1">
              Compete with other players and climb the ranks
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search players..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-lg py-2 pl-10 pr-4 w-64 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl overflow-hidden">
          <div className="grid grid-cols-4 gap-4 p-4 border-b border-gray-700/50 text-gray-400 font-medium">
            <div>Rank</div>
            <div>Player</div>
            <div>Score</div>
            <div>Rewards</div>
          </div>

          <div className="divide-y divide-gray-700/50">
            {leaderboardData.map((entry) => (
              <div
                key={entry.rank}
                className={`grid grid-cols-4 gap-4 p-4 ${
                  entry.isCurrentUser ? "bg-purple-500/10" : ""
                } hover:bg-gray-700/50 transition-colors`}
              >
                <div className={`font-bold ${getRankColor(entry.rank)}`}>
                  {getRankIcon(entry.rank)}
                </div>
                <div className={entry.isCurrentUser ? "text-purple-400" : ""}>
                  {entry.username}
                </div>
                <div>{entry.score.toLocaleString()}</div>
                <div>{entry.rewards} STARK</div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl p-6">
            <h3 className="text-gray-400 mb-2">Your Rank</h3>
            <div className="text-4xl font-bold">#42</div>
            <p className="text-sm text-gray-500 mt-1">Top 1%</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl p-6">
            <h3 className="text-gray-400 mb-2">High Score</h3>
            <div className="text-4xl font-bold">8,945</div>
            <p className="text-sm text-gray-500 mt-1">Personal best</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl p-6">
            <h3 className="text-gray-400 mb-2">Total Rewards</h3>
            <div className="text-4xl font-bold">185 STARK</div>
            <p className="text-sm text-gray-500 mt-1">Lifetime earnings</p>
          </div>
        </div>
      </div>
    </div>
  );
}

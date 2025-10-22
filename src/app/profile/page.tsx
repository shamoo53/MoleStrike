"use client";

import { User, Edit, Camera, Trophy, Timer, Coins } from "lucide-react";

export default function ProfilePage() {
  const userProfile = {
    username: "MoleWhacker",
    joinDate: "March 2024",
    gamesPlayed: 156,
    totalScore: 8945,
    rank: 42,
    rewards: 185,
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 ml-64">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-yellow-400 flex items-center gap-3">
            <User className="w-8 h-8" />
            Profile
          </h1>
          <p className="text-gray-400 mt-1">
            Manage your account and view your stats
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl p-6">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center text-3xl font-bold text-blue-400">
                    {userProfile.username[0]}
                  </div>
                  <button className="absolute bottom-0 right-0 p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <div className="mt-4 text-center">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold">
                      {userProfile.username}
                    </h2>
                    <button className="p-1 hover:text-blue-400 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Member since {userProfile.joinDate}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats and Activity */}
          <div className="lg:col-span-2">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl p-6">
                <div className="flex items-center gap-3 text-gray-400 mb-2">
                  <Trophy className="w-5 h-5" />
                  <h3>Global Rank</h3>
                </div>
                <div className="text-3xl font-bold">#{userProfile.rank}</div>
                <p className="text-sm text-gray-500 mt-1">Top 1%</p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl p-6">
                <div className="flex items-center gap-3 text-gray-400 mb-2">
                  <Timer className="w-5 h-5" />
                  <h3>Games Played</h3>
                </div>
                <div className="text-3xl font-bold">
                  {userProfile.gamesPlayed}
                </div>
                <p className="text-sm text-gray-500 mt-1">Total games</p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl p-6">
                <div className="flex items-center gap-3 text-gray-400 mb-2">
                  <Coins className="w-5 h-5" />
                  <h3>Rewards</h3>
                </div>
                <div className="text-3xl font-bold">
                  {userProfile.rewards} STARK
                </div>
                <p className="text-sm text-gray-500 mt-1">Total earned</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-700/50">
                  <div>
                    <p className="font-medium">
                      Completed Speed Demon Challenge
                    </p>
                    <p className="text-sm text-gray-400">Score: 2,450</p>
                  </div>
                  <span className="text-sm text-gray-400">2 hours ago</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-700/50">
                  <div>
                    <p className="font-medium">Won Daily Tournament</p>
                    <p className="text-sm text-gray-400">Reward: 25 STARK</p>
                  </div>
                  <span className="text-sm text-gray-400">1 day ago</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium">New High Score</p>
                    <p className="text-sm text-gray-400">Score: 8,945</p>
                  </div>
                  <span className="text-sm text-gray-400">2 days ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  Home,
  BarChart2,
  Wallet,
  Newspaper,
  Settings,
  HelpCircle,
  ChevronUp,
  ChevronDown,
  User,
  LogOut,
  Bell,
  Timer,
  Trophy,
  Coins,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface PortfolioItem {
  symbol: string;
  shares: number;
  price: number;
  change: number;
  value: number;
}

interface WatchlistItem {
  symbol: string;
  price: number;
  change: number;
}

export function Dashboard() {
  const router = useRouter();
  const username = "MoleWhacker"; // This would come from your auth system
  const [currentValue, setCurrentValue] = useState(8213.23);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([
    {
      symbol: "AAPL",
      shares: 20,
      price: 148.79,
      change: -0.24,
      value: 2975.8,
    },
    {
      symbol: "ARC",
      shares: 10,
      price: 40.57,
      change: 0.25,
      value: 405.7,
    },
    {
      symbol: "MRNA",
      shares: 5,
      price: 10.48,
      change: 4.66,
      value: 52.4,
    },
  ]);

  const [watchlistItems, setWatchlistItems] = useState<WatchlistItem[]>([
    { symbol: "AAPL", price: 148.79, change: -1.24 },
    { symbol: "AMZN", price: 3468.24, change: 2.31 },
    { symbol: "MRNA", price: 643.73, change: -1.55 },
  ]);

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-gray-800/50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700/50">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-blue-400">MoleStrike</h1>
        </div>
        <nav className="space-y-2 flex-grow">
          <Link
            href="/dashboard"
            className="flex items-center space-x-3 px-4 py-3 bg-gray-700/50 rounded-lg text-blue-400"
          >
            <Home className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/leaderboard"
            className="flex items-center space-x-3 px-4 py-3 text-gray-400 hover:bg-gray-700/50 rounded-lg"
          >
            <BarChart2 className="w-5 h-5" />
            <span>Leaderboard</span>
          </Link>
          <Link
            href="/wallet"
            className="flex items-center space-x-3 px-4 py-3 text-gray-400 hover:bg-gray-700/50 rounded-lg"
          >
            <Wallet className="w-5 h-5" />
            <span>Wallet</span>
          </Link>
          <Link
            href="/news"
            className="flex items-center space-x-3 px-4 py-3 text-gray-400 hover:bg-gray-700/50 rounded-lg"
          >
            <Newspaper className="w-5 h-5" />
            <span>News</span>
          </Link>
          <Link
            href="/profile"
            className="flex items-center space-x-3 px-4 py-3 text-gray-400 hover:bg-gray-700/50 rounded-lg"
          >
            <User className="w-5 h-5" />
            <span>Profile</span>
          </Link>
        </nav>

        <div className="space-y-2 pt-4 border-t border-gray-700/50">
          <Link
            href="/settings"
            className="flex items-center space-x-3 px-4 py-3 text-gray-400 hover:bg-gray-700/50 rounded-lg"
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </Link>
          <Link
            href="/help"
            className="flex items-center space-x-3 px-4 py-3 text-gray-400 hover:bg-gray-700/50 rounded-lg"
          >
            <HelpCircle className="w-5 h-5" />
            <span>Help</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-gray-700/50 rounded-lg"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-yellow-400">Dashboard</h1>
            <p className="text-gray-400 mt-1">
              Welcome back, <span className="text-purple-400">{username}</span>!
            </p>
          </div>
          <div className="flex gap-4">
            <button className="p-2 bg-gray-800/50 backdrop-blur-md rounded-lg border border-gray-700/50">
              <Bell className="w-6 h-6 text-gray-400" />
            </button>
            <button className="p-2 bg-gray-800/50 backdrop-blur-md rounded-lg border border-gray-700/50">
              <Settings className="w-6 h-6 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Daily Score Card */}
          <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl p-6">
            <h3 className="text-gray-400 mb-2">Daily Score</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold">8,945</span>
              <span className="text-green-400 text-sm">+12%</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">Your best score today</p>
          </div>

          {/* Global Rank Card */}
          <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl p-6">
            <h3 className="text-gray-400 mb-2">Global Rank</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold">#42</span>
              <span className="text-red-400 text-sm">-3%</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">Out of 10,284 players</p>
          </div>

          {/* Total Rewards Card */}
          <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl p-6">
            <h3 className="text-gray-400 mb-2">Total Rewards</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold">185 STARK</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">Lifetime earnings</p>
          </div>
        </div>

        {/* Challenge and Wallet Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Speed Demon Challenge Card */}
          <div className="md:col-span-2 bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold mb-1">Speed Demon</h3>
                <p className="text-gray-400">Whack 50 moles in 60 seconds</p>
              </div>
              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                Medium
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Reward:</span>
                <span className="text-purple-400">10 STARK Tokens</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-400">Time Left:</span>
                <span className="text-white">14:32:18</span>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Global Completion</span>
                  <span className="text-white">68%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full"
                    style={{ width: "68%" }}
                  ></div>
                </div>
              </div>

              <button className="w-full py-3 bg-purple-500 hover:bg-purple-600 rounded-lg font-medium transition-colors">
                Play Challenge
              </button>
            </div>
          </div>

          {/* Wallet Card */}
          <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Wallet className="w-6 h-6" />
              <h3 className="text-xl font-bold">Wallet</h3>
            </div>
            <p className="text-gray-400 mb-6">Connect your StarkNet wallet</p>
            <p className="text-sm text-gray-500 mb-8">
              Connect your wallet to access rewards and track your on-chain
              progress
            </p>
            <button className="w-full py-3 bg-purple-500 hover:bg-purple-600 rounded-lg font-medium transition-colors">
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

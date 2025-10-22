"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import {
  Home,
  BarChart2,
  Wallet,
  Newspaper,
  Settings,
  HelpCircle,
  User,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-gray-800/50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700/50">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-blue-400">MoleStrike</h1>
      </div>
      <nav className="space-y-2 flex-grow">
        <Link
          href="/dashboard"
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${
            pathname === "/dashboard"
              ? "bg-gray-700/50 text-blue-400"
              : "text-gray-400 hover:bg-gray-700/50"
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Dashboard</span>
        </Link>
        <Link
          href="/leaderboard"
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${
            pathname === "/leaderboard"
              ? "bg-gray-700/50 text-blue-400"
              : "text-gray-400 hover:bg-gray-700/50"
          }`}
        >
          <BarChart2 className="w-5 h-5" />
          <span>Leaderboard</span>
        </Link>
        <Link
          href="/wallet"
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${
            pathname === "/wallet"
              ? "bg-gray-700/50 text-blue-400"
              : "text-gray-400 hover:bg-gray-700/50"
          }`}
        >
          <Wallet className="w-5 h-5" />
          <span>Wallet</span>
        </Link>
        <Link
          href="/news"
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${
            pathname === "/news"
              ? "bg-gray-700/50 text-blue-400"
              : "text-gray-400 hover:bg-gray-700/50"
          }`}
        >
          <Newspaper className="w-5 h-5" />
          <span>News</span>
        </Link>
        <Link
          href="/profile"
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${
            pathname === "/profile"
              ? "bg-gray-700/50 text-blue-400"
              : "text-gray-400 hover:bg-gray-700/50"
          }`}
        >
          <User className="w-5 h-5" />
          <span>Profile</span>
        </Link>
      </nav>

      <div>
        <Link
          href="/settings"
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${
            pathname === "/settings"
              ? "bg-gray-700/50 text-blue-400"
              : "text-gray-400 hover:bg-gray-700/50"
          }`}
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </Link>
        <Link
          href="/help"
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${
            pathname === "/help"
              ? "bg-gray-700/50 text-blue-400"
              : "text-gray-400 hover:bg-gray-700/50"
          }`}
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
  );
}

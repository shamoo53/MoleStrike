"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import * as echarts from "echarts";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Add animation styles
const styles = `
@keyframes fadeIn {
from { opacity: 0; }
to { opacity: 1; }
}
@keyframes slideInLeft {
from { transform: translateX(-50px); opacity: 0; }
to { transform: translateX(0); opacity: 1; }
}
@keyframes slideInRight {
from { transform: translateX(50px); opacity: 0; }
to { transform: translateX(0); opacity: 1; }
}
@keyframes slideInUp {
from { transform: translateY(50px); opacity: 0; }
to { transform: translateY(0); opacity: 1; }
}
@keyframes pulse {
0% { transform: scale(1); }
50% { transform: scale(1.05); }
100% { transform: scale(1); }
}
@keyframes float {
0% { transform: translateY(0px); }
50% { transform: translateY(-10px); }
100% { transform: translateY(0px); }
}
@keyframes border-slide {
0% { background-position: 0% 0%; }
100% { background-position: 100% 0%; }
}
.animate-fadeIn {
animation: fadeIn 1s ease-out;
}
.animate-slideInLeft {
animation: slideInLeft 0.8s ease-out;
}
.animate-slideInRight {
animation: slideInRight 0.8s ease-out;
}
.animate-slideInUp {
animation: slideInUp 0.8s ease-out;
}
.animate-pulse {
animation: pulse 2s infinite;
}
.animate-float {
animation: float 3s ease-in-out infinite;
}
.animate-delay-100 {
animation-delay: 0.1s;
}
.animate-delay-200 {
animation-delay: 0.2s;
}
.animate-delay-300 {
animation-delay: 0.3s;
}
.animate-delay-400 {
animation-delay: 0.4s;
}
.animate-delay-500 {
animation-delay: 0.5s;
}
`;
const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [moles, setMoles] = useState(Array(9).fill(false));
  const [progress, setProgress] = useState(0);
  const [currentTab, setCurrentTab] = useState("dashboard");
  // Chart ref
  const statsChartRef = React.useRef<HTMLDivElement>(null);
  const rewardsChartRef = React.useRef<HTMLDivElement>(null);
  const swiperModules = [Pagination, Autoplay];
  // Add style element to document head
  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.innerHTML = styles;
    document.head.appendChild(styleElement);
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);
  // Initialize charts
  useEffect(() => {
    if (isLoggedIn && statsChartRef.current) {
      const statsChart = echarts.init(statsChartRef.current);
      const statsOption = {
        animation: false,
        tooltip: {
          trigger: "axis",
        },
        grid: {
          top: 5,
          left: 0,
          right: 0,
          bottom: 0,
          containLabel: false,
        },
        xAxis: {
          type: "category",
          data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
          show: false,
        },
        yAxis: {
          type: "value",
          show: false,
        },
        series: [
          {
            name: "Balance",
            data: [
              18000, 20000, 19000, 22000, 23000, 19000, 22000, 25000, 28000,
            ],
            type: "line",
            smooth: true,
            symbol: "none",
            lineStyle: {
              width: 3,
              color: "#3b82f6",
            },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(59, 130, 246, 0.5)",
                  },
                  {
                    offset: 1,
                    color: "rgba(59, 130, 246, 0.1)",
                  },
                ],
              },
            },
          },
        ],
        backgroundColor: "transparent",
      };
      statsChart.setOption(statsOption);
      window.addEventListener("resize", () => {
        statsChart.resize();
      });
    }
    if (isLoggedIn && rewardsChartRef.current) {
      const rewardsChart = echarts.init(rewardsChartRef.current);
      const rewardsOption = {
        animation: false,
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
          textStyle: {
            color: "#e2e8f0",
          },
        },
        series: [
          {
            name: "Rewards",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#111",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "18",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 1048, name: "Daily Rewards" },
              { value: 735, name: "Challenge Rewards" },
              { value: 580, name: "Community Rewards" },
              { value: 484, name: "Special Events" },
            ],
            color: ["#8b5cf6", "#3b82f6", "#10b981", "#f59e0b"],
          },
        ],
        backgroundColor: "transparent",
      };
      rewardsChart.setOption(rewardsOption);
      window.addEventListener("resize", () => {
        rewardsChart.resize();
      });
    }
  }, [isLoggedIn, currentTab]);
  // Game logic
  useEffect(() => {
    if (!gameStarted) return;
    const gameInterval = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft((prev) => prev - 1);
        setProgress(((30 - timeLeft + 1) / 30) * 100);
        // Randomly show moles
        const newMoles = [...moles];
        const randomIndex = Math.floor(Math.random() * 9);
        newMoles[randomIndex] = true;
        // Hide previous moles
        setTimeout(() => {
          const hideMoles = [...newMoles];
          hideMoles[randomIndex] = false;
          setMoles(hideMoles);
        }, 800);
        setMoles(newMoles);
      } else {
        clearInterval(gameInterval);
        setGameStarted(false);
      }
    }, 1000);
    return () => clearInterval(gameInterval);
  }, [gameStarted, timeLeft, moles]);
  const startGame = () => {
    setGameStarted(true);
    setTimeLeft(30);
    setScore(0);
    setMoles(Array(9).fill(false));
    setProgress(0);
  };
  const whackMole = (index: number) => {
    if (!gameStarted || !moles[index]) return;
    const newMoles = [...moles];
    newMoles[index] = false;
    setMoles(newMoles);
    setScore((prev) => prev + 10);
  };
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setShowSignUpModal(false);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentTab("dashboard");
  };
  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 text-white">
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <div className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
            <div className="p-4 border-b border-gray-800">
              <div className="flex items-center space-x-3 animate-slideInLeft">
                <div className="bg-black p-2 rounded-lg animate-float">
                  <i className="fas fa-cube text-cyan-300"></i>
                </div>
                <h1 className="text-xl font-bold text-cyan-300">Crypto UI</h1>
              </div>
            </div>
            <div className="p-4 border-b border-gray-800">
              <div className="flex items-center space-x-3 animate-slideInLeft animate-delay-200">
                <Avatar className="h-10 w-10 border-2 border-gray-700 animate-float">
                  <AvatarImage src="https://readdy.ai/api/search-image?query=stylized gaming avatar, neon purple glow, digital art, cyberpunk style, abstract face, high quality, detailed&width=40&height=40&seq=avatar1&orientation=squarish" />
                  <AvatarFallback>AM</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-cyan-300">Anthony Morales</p>
                  <p className="text-xs text-gray-400">Premium</p>
                </div>
              </div>
            </div>
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              <button
                onClick={() => setCurrentTab("dashboard")}
                className={`w-full flex items-center space-x-3 p-2 rounded-lg ${
                  currentTab === "dashboard"
                    ? "bg-blue-900"
                    : "hover:bg-gray-800"
                } transition-colors cursor-pointer whitespace-nowrap animate-slideInLeft animate-delay-100`}
              >
                <i className="fas fa-th-large text-lg text-cyan-300"></i>
                <span className="text-cyan-300">Dashboard</span>
              </button>
              <button
                onClick={() => setCurrentTab("coins")}
                className={`w-full flex items-center space-x-3 p-2 rounded-lg ${
                  currentTab === "coins" ? "bg-blue-900" : "hover:bg-gray-800"
                } transition-colors cursor-pointer whitespace-nowrap`}
              >
                <i className="fas fa-coins text-lg"></i>
                <span>My Coins</span>
              </button>
              <button
                onClick={() => setCurrentTab("markets")}
                className={`w-full flex items-center space-x-3 p-2 rounded-lg ${
                  currentTab === "markets" ? "bg-blue-900" : "hover:bg-gray-800"
                } transition-colors cursor-pointer whitespace-nowrap`}
              >
                <i className="fas fa-chart-line text-lg"></i>
                <span>Markets</span>
                {currentTab === "markets" && (
                  <Badge className="ml-2 bg-red-500 text-white">New</Badge>
                )}
              </button>
              <button
                onClick={() => setCurrentTab("portfolio")}
                className={`w-full flex items-center space-x-3 p-2 rounded-lg ${
                  currentTab === "portfolio"
                    ? "bg-blue-900"
                    : "hover:bg-gray-800"
                } transition-colors cursor-pointer whitespace-nowrap`}
              >
                <i className="fas fa-briefcase text-lg"></i>
                <span>Portfolio</span>
              </button>
              <a
                href="https://readdy.ai/home/7061d899-198c-4dcf-bd4f-38a7cc249d2f/0625b208-ff9f-4d68-a8c2-04f2b846517c"
                data-readdy="true"
                className={`w-full flex items-center space-x-3 p-2 rounded-lg ${
                  currentTab === "transactions"
                    ? "bg-blue-900"
                    : "hover:bg-gray-800"
                } transition-colors cursor-pointer whitespace-nowrap`}
              >
                <i className="fas fa-exchange-alt text-lg"></i>
                <span>Transactions</span>
              </a>
              <button
                onClick={() => setCurrentTab("academy")}
                className={`w-full flex items-center space-x-3 p-2 rounded-lg ${
                  currentTab === "academy" ? "bg-blue-900" : "hover:bg-gray-800"
                } transition-colors cursor-pointer whitespace-nowrap`}
              >
                <i className="fas fa-graduation-cap text-lg"></i>
                <span>Academy</span>
                {currentTab === "academy" && (
                  <Badge className="ml-2 bg-blue-500 text-white">New</Badge>
                )}
              </button>
              <button
                onClick={() => setCurrentTab("tools")}
                className={`w-full flex items-center space-x-3 p-2 rounded-lg ${
                  currentTab === "tools" ? "bg-blue-900" : "hover:bg-gray-800"
                } transition-colors cursor-pointer whitespace-nowrap`}
              >
                <i className="fas fa-tools text-lg"></i>
                <span>AI Tools</span>
              </button>
            </nav>
            <div className="p-4 mt-auto">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge className="bg-gray-700 text-white">Upgrade</Badge>
                  </div>
                  <p className="text-xs text-gray-400 mb-3">
                    Get access to premium features and unlock advanced trading
                    tools
                  </p>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      className="bg-gray-700 hover:bg-gray-600 text-white !rounded-button whitespace-nowrap"
                    >
                      Upgrade
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-700 hover:bg-gray-700 text-white !rounded-button whitespace-nowrap"
                    >
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="p-4 border-t border-gray-800 flex justify-between">
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full bg-transparent border-gray-700"
              >
                <i className="fas fa-wallet text-gray-400"></i>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full bg-transparent border-gray-700"
              >
                <i className="fas fa-cog text-gray-400"></i>
              </Button>
            </div>
          </div>
          {/* Main content */}
          <div className="flex-1 overflow-y-auto">
            {/* Header */}
            <header className="bg-gray-900 border-b border-gray-800 p-4 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-transparent border-gray-700"
                >
                  <i className="fas fa-search text-gray-400"></i>
                </Button>
                <Input
                  placeholder="Search here..."
                  className="bg-gray-800 border-gray-700 text-white w-64 h-8 text-sm"
                />
              </div>
              <div className="flex items-center space-x-4">
                <Badge className="bg-red-500 text-white">LIVE</Badge>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-transparent border-gray-700"
                >
                  <i className="fas fa-search text-gray-400"></i>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-transparent border-gray-700"
                >
                  <i className="fas fa-cog text-gray-400"></i>
                </Button>
                <span className="text-gray-400">Settings</span>
              </div>
            </header>
            {/* Dashboard Content */}
            {currentTab === "dashboard" && (
              <div className="p-6 space-y-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-cyan-300">
                      Today's Challenges
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Complete these challenges to earn rewards
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-700 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center space-x-3">
                            <div className="bg-purple-900 p-2 rounded-full">
                              <i className="fas fa-bolt text-yellow-400"></i>
                            </div>
                            <div>
                              <p className="font-medium">Speed Challenge</p>
                              <p className="text-sm text-gray-400">
                                Whack 50 moles in 30 seconds
                              </p>
                            </div>
                          </div>
                          <Badge className="bg-yellow-600 text-white">
                            50 SMT
                          </Badge>
                        </div>
                        <Progress value={60} className="h-2" />
                        <div className="flex justify-between mt-1 text-xs text-gray-400">
                          <span>30/50 moles</span>
                          <span>60% complete</span>
                        </div>
                      </div>
                      <div className="p-4 bg-gray-700 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center space-x-3">
                            <div className="bg-blue-900 p-2 rounded-full">
                              <i className="fas fa-calendar-check text-blue-400"></i>
                            </div>
                            <div>
                              <p className="font-medium">Daily Streak</p>
                              <p className="text-sm text-gray-400">
                                Play for 7 days in a row
                              </p>
                            </div>
                          </div>
                          <Badge className="bg-blue-600 text-white">
                            100 SMT
                          </Badge>
                        </div>
                        <Progress value={85} className="h-2" />
                        <div className="flex justify-between mt-1 text-xs text-gray-400">
                          <span>6/7 days</span>
                          <span>85% complete</span>
                        </div>
                      </div>
                      <div className="p-4 bg-gray-700 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center space-x-3">
                            <div className="bg-green-900 p-2 rounded-full">
                              <i className="fas fa-trophy text-green-400"></i>
                            </div>
                            <div>
                              <p className="font-medium">High Score</p>
                              <p className="text-sm text-gray-400">
                                Reach 1000 points in a single game
                              </p>
                            </div>
                          </div>
                          <Badge className="bg-green-600 text-white">
                            200 SMT
                          </Badge>
                        </div>
                        <Progress value={35} className="h-2" />
                        <div className="flex justify-between mt-1 text-xs text-gray-400">
                          <span>350/1000 points</span>
                          <span>35% complete</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-cyan-300">
                      Weekly Challenges
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Complete these challenges for bigger rewards
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-700 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center space-x-3">
                            <div className="bg-purple-900 p-2 rounded-full">
                              <i className="fas fa-medal text-purple-400"></i>
                            </div>
                            <div>
                              <p className="font-medium">Top 10 Finisher</p>
                              <p className="text-sm text-gray-400">
                                Finish in the top 10 on the weekly leaderboard
                              </p>
                            </div>
                          </div>
                          <Badge className="bg-purple-600 text-white">
                            500 SMT
                          </Badge>
                        </div>
                        <div className="flex justify-between mt-1 text-xs text-gray-400">
                          <span>Current position: 12th</span>
                          <span>4 days remaining</span>
                        </div>
                      </div>
                      <div className="p-4 bg-gray-700 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center space-x-3">
                            <div className="bg-blue-900 p-2 rounded-full">
                              <i className="fas fa-gamepad text-blue-400"></i>
                            </div>
                            <div>
                              <p className="font-medium">Dedicated Player</p>
                              <p className="text-sm text-gray-400">
                                Play 20 games this week
                              </p>
                            </div>
                          </div>
                          <Badge className="bg-blue-600 text-white">
                            300 SMT
                          </Badge>
                        </div>
                        <Progress value={40} className="h-2" />
                        <div className="flex justify-between mt-1 text-xs text-gray-400">
                          <span>8/20 games</span>
                          <span>40% complete</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-cyan-300">
                      Special Events
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Limited-time challenges with exclusive rewards
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-r from-purple-900 to-blue-900 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center space-x-3">
                            <div className="bg-yellow-500 p-2 rounded-full">
                              <i className="fas fa-crown text-yellow-900"></i>
                            </div>
                            <div>
                              <p className="font-medium">
                                StarkNet Championship
                              </p>
                              <p className="text-sm text-gray-300">
                                Compete in the global tournament
                              </p>
                            </div>
                          </div>
                          <Badge className="bg-yellow-500 text-gray-900 font-bold">
                            1000 SMT
                          </Badge>
                        </div>
                        <div className="flex justify-between mt-3 text-xs text-gray-300">
                          <span>Starts in 2 days</span>
                          <Button
                            size="sm"
                            className="bg-yellow-500 text-gray-900 hover:bg-yellow-400 !rounded-button whitespace-nowrap"
                          >
                            Register Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            {/* Challenges Content */}
            {currentTab === "challenges" && (
              <div className="p-6 space-y-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-cyan-300">
                      Today's Challenges
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Complete these challenges to earn rewards
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-700 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center space-x-3">
                            <div className="bg-purple-900 p-2 rounded-full">
                              <i className="fas fa-bolt text-yellow-400"></i>
                            </div>
                            <div>
                              <p className="font-medium">Speed Challenge</p>
                              <p className="text-sm text-gray-400">
                                Whack 50 moles in 30 seconds
                              </p>
                            </div>
                          </div>
                          <Badge className="bg-yellow-600 text-white">
                            50 SMT
                          </Badge>
                        </div>
                        <Progress value={60} className="h-2" />
                        <div className="flex justify-between mt-1 text-xs text-gray-400">
                          <span>30/50 moles</span>
                          <span>60% complete</span>
                        </div>
                      </div>
                      <div className="p-4 bg-gray-700 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center space-x-3">
                            <div className="bg-blue-900 p-2 rounded-full">
                              <i className="fas fa-calendar-check text-blue-400"></i>
                            </div>
                            <div>
                              <p className="font-medium">Daily Streak</p>
                              <p className="text-sm text-gray-400">
                                Play for 7 days in a row
                              </p>
                            </div>
                          </div>
                          <Badge className="bg-blue-600 text-white">
                            100 SMT
                          </Badge>
                        </div>
                        <Progress value={85} className="h-2" />
                        <div className="flex justify-between mt-1 text-xs text-gray-400">
                          <span>6/7 days</span>
                          <span>85% complete</span>
                        </div>
                      </div>
                      <div className="p-4 bg-gray-700 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center space-x-3">
                            <div className="bg-green-900 p-2 rounded-full">
                              <i className="fas fa-trophy text-green-400"></i>
                            </div>
                            <div>
                              <p className="font-medium">High Score</p>
                              <p className="text-sm text-gray-400">
                                Reach 1000 points in a single game
                              </p>
                            </div>
                          </div>
                          <Badge className="bg-green-600 text-white">
                            200 SMT
                          </Badge>
                        </div>
                        <Progress value={35} className="h-2" />
                        <div className="flex justify-between mt-1 text-xs text-gray-400">
                          <span>350/1000 points</span>
                          <span>35% complete</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-cyan-300">
                      Weekly Challenges
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Complete these challenges for bigger rewards
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-700 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center space-x-3">
                            <div className="bg-purple-900 p-2 rounded-full">
                              <i className="fas fa-medal text-purple-400"></i>
                            </div>
                            <div>
                              <p className="font-medium">Top 10 Finisher</p>
                              <p className="text-sm text-gray-400">
                                Finish in the top 10 on the weekly leaderboard
                              </p>
                            </div>
                          </div>
                          <Badge className="bg-purple-600 text-white">
                            500 SMT
                          </Badge>
                        </div>
                        <div className="flex justify-between mt-1 text-xs text-gray-400">
                          <span>Current position: 12th</span>
                          <span>4 days remaining</span>
                        </div>
                      </div>
                      <div className="p-4 bg-gray-700 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center space-x-3">
                            <div className="bg-blue-900 p-2 rounded-full">
                              <i className="fas fa-gamepad text-blue-400"></i>
                            </div>
                            <div>
                              <p className="font-medium">Dedicated Player</p>
                              <p className="text-sm text-gray-400">
                                Play 20 games this week
                              </p>
                            </div>
                          </div>
                          <Badge className="bg-blue-600 text-white">
                            300 SMT
                          </Badge>
                        </div>
                        <Progress value={40} className="h-2" />
                        <div className="flex justify-between mt-1 text-xs text-gray-400">
                          <span>8/20 games</span>
                          <span>40% complete</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-cyan-300">
                      Special Events
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Limited-time challenges with exclusive rewards
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-r from-purple-900 to-blue-900 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center space-x-3">
                            <div className="bg-yellow-500 p-2 rounded-full">
                              <i className="fas fa-crown text-yellow-900"></i>
                            </div>
                            <div>
                              <p className="font-medium">
                                StarkNet Championship
                              </p>
                              <p className="text-sm text-gray-300">
                                Compete in the global tournament
                              </p>
                            </div>
                          </div>
                          <Badge className="bg-yellow-500 text-gray-900 font-bold">
                            1000 SMT
                          </Badge>
                        </div>
                        <div className="flex justify-between mt-3 text-xs text-gray-300">
                          <span>Starts in 2 days</span>
                          <Button
                            size="sm"
                            className="bg-yellow-500 text-gray-900 hover:bg-yellow-400 !rounded-button whitespace-nowrap"
                          >
                            Register Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            {/* Leaderboard Content */}
            {currentTab === "leaderboard" && (
              <div className="p-6 space-y-6">
                <Tabs defaultValue="global" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-gray-800">
                    <TabsTrigger
                      value="global"
                      className="data-[state=active]:bg-purple-700 text-cyan-300"
                    >
                      Global
                    </TabsTrigger>
                    <TabsTrigger
                      value="friends"
                      className="data-[state=active]:bg-purple-700 text-cyan-300"
                    >
                      Friends
                    </TabsTrigger>
                    <TabsTrigger
                      value="weekly"
                      className="data-[state=active]:bg-purple-700 text-cyan-300"
                    >
                      Weekly Tournament
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="global" className="mt-4">
                    <Card className="bg-gray-800 border-gray-700">
                      <CardHeader>
                        <CardTitle className="text-cyan-300">
                          Global Leaderboard
                        </CardTitle>
                        <CardDescription className="text-gray-400">
                          Top players from around the world
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-[600px]">
                          <div className="space-y-2">
                            {Array.from({ length: 20 }).map((_, index) => (
                              <div
                                key={index}
                                className={`flex items-center justify-between p-3 rounded-lg ${
                                  index === 11 ? "bg-purple-900" : "bg-gray-700"
                                }`}
                              >
                                <div className="flex items-center space-x-3">
                                  <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                                      index === 0
                                        ? "bg-yellow-500 text-gray-900"
                                        : index === 1
                                        ? "bg-gray-400 text-gray-900"
                                        : index === 2
                                        ? "bg-amber-700 text-gray-900"
                                        : index === 11
                                        ? "bg-purple-700 text-white"
                                        : "bg-gray-600 text-white"
                                    }`}
                                  >
                                    {index + 1}
                                  </div>
                                  <Avatar
                                    className={`h-10 w-10 border-2 ${
                                      index === 0
                                        ? "border-yellow-500"
                                        : index === 1
                                        ? "border-gray-400"
                                        : index === 2
                                        ? "border-amber-700"
                                        : index === 11
                                        ? "border-purple-500"
                                        : "border-gray-600"
                                    }`}
                                  >
                                    <AvatarImage
                                      src={`https://readdy.ai/api/search-image?query=stylized gaming avatar, digital art, cyberpunk style, abstract face, high quality, detailed&width=40&height=40&seq=avatar${
                                        index + 5
                                      }&orientation=squarish`}
                                    />
                                    <AvatarFallback>U{index}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium">
                                      {index === 0
                                        ? "MoleKing"
                                        : index === 1
                                        ? "WhackMaster"
                                        : index === 2
                                        ? "MoleMaster99"
                                        : index === 11
                                        ? "CryptoWhacker"
                                        : `Player${1000 + index}`}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                      Level {24 - index > 0 ? 24 - index : 1}
                                    </p>
                                  </div>
                                </div>
                                <div className="font-bold">
                                  {2456 - index * 67} pts
                                </div>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="friends" className="mt-4">
                    <Card className="bg-gray-800 border-gray-700">
                      <CardHeader>
                        <CardTitle className="text-cyan-300">
                          Friends Leaderboard
                        </CardTitle>
                        <CardDescription className="text-gray-400">
                          See how you compare to your friends
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-3 bg-purple-900 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="bg-purple-700 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                                1
                              </div>
                              <Avatar className="h-10 w-10 border-2 border-purple-500">
                                <AvatarImage src="https://readdy.ai/api/search-image?query=stylized gaming avatar, neon purple glow, digital art, cyberpunk style, abstract face, high quality, detailed&width=40&height=40&seq=avatar1&orientation=squarish" />
                                <AvatarFallback>CW</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">
                                  CryptoWhacker (You)
                                </p>
                                <p className="text-xs text-gray-400">
                                  Level 12
                                </p>
                              </div>
                            </div>
                            <div className="font-bold">1,245 pts</div>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="bg-gray-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                                2
                              </div>
                              <Avatar className="h-10 w-10 border-2 border-gray-600">
                                <AvatarImage src="https://public.readdy.ai/ai/img_res/080c7971c0a92e5ea2f00a62696aa772.jpg" />
                                <AvatarFallback>BM</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">BlockMaster</p>
                                <p className="text-xs text-gray-400">
                                  Level 10
                                </p>
                              </div>
                            </div>
                            <div className="font-bold">1,120 pts</div>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="bg-gray-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                                3
                              </div>
                              <Avatar className="h-10 w-10 border-2 border-gray-600">
                                <AvatarImage src="https://public.readdy.ai/ai/img_res/7c76c23f42d22d01fe302cafeaa743a0.jpg" />
                                <AvatarFallback>CM</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">CryptoMole</p>
                                <p className="text-xs text-gray-400">Level 9</p>
                              </div>
                            </div>
                            <div className="font-bold">987 pts</div>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="bg-gray-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                                4
                              </div>
                              <Avatar className="h-10 w-10 border-2 border-gray-600">
                                <AvatarImage src="https://public.readdy.ai/ai/img_res/ba23dd886f0efc9c5abfe848ccb3070e.jpg" />
                                <AvatarFallback>SH</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">StarkHunter</p>
                                <p className="text-xs text-gray-400">Level 8</p>
                              </div>
                            </div>
                            <div className="font-bold">856 pts</div>
                          </div>
                        </div>
                        <div className="mt-6 flex justify-center">
                          <Button className="bg-purple-600 hover:bg-purple-700 text-white !rounded-button whitespace-nowrap">
                            <i className="fas fa-user-plus mr-2"></i> Add
                            Friends
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="weekly" className="mt-4">
                    <Card className="bg-gray-800 border-gray-700">
                      <CardHeader>
                        <CardTitle className="text-cyan-300">
                          Weekly Tournament
                        </CardTitle>
                        <CardDescription className="text-gray-400">
                          Compete for the weekly prize pool of 10,000 SMT
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-6 p-4 bg-gradient-to-r from-purple-900 to-blue-900 rounded-lg">
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-bold text-lg">
                                Tournament ends in:
                              </h3>
                              <p className="text-gray-300">
                                3 days, 14 hours, 22 minutes
                              </p>
                            </div>
                            <div className="text-right">
                              <h3 className="font-bold text-lg">
                                Your position:
                              </h3>
                              <p className="text-2xl font-bold text-yellow-400">
                                #12
                              </p>
                            </div>
                          </div>
                        </div>
                        <ScrollArea className="h-[500px]">
                          <div className="space-y-2">
                            {Array.from({ length: 20 }).map((_, index) => (
                              <div
                                key={index}
                                className={`flex items-center justify-between p-3 rounded-lg ${
                                  index === 11 ? "bg-purple-900" : "bg-gray-700"
                                }`}
                              >
                                <div className="flex items-center space-x-3">
                                  <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                                      index === 0
                                        ? "bg-yellow-500 text-gray-900"
                                        : index === 1
                                        ? "bg-gray-400 text-gray-900"
                                        : index === 2
                                        ? "bg-amber-700 text-gray-900"
                                        : index === 11
                                        ? "bg-purple-700 text-white"
                                        : "bg-gray-600 text-white"
                                    }`}
                                  >
                                    {index + 1}
                                  </div>
                                  <Avatar
                                    className={`h-10 w-10 border-2 ${
                                      index === 0
                                        ? "border-yellow-500"
                                        : index === 1
                                        ? "border-gray-400"
                                        : index === 2
                                        ? "border-amber-700"
                                        : index === 11
                                        ? "border-purple-500"
                                        : "border-gray-600"
                                    }`}
                                  >
                                    <AvatarImage
                                      src={`https://readdy.ai/api/search-image?query=stylized gaming avatar, digital art, cyberpunk style, abstract face, high quality, detailed&width=40&height=40&seq=avatar${
                                        index + 20
                                      }&orientation=squarish`}
                                    />
                                    <AvatarFallback>U{index}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium">
                                      {index === 0
                                        ? "MoleKing"
                                        : index === 1
                                        ? "WhackMaster"
                                        : index === 2
                                        ? "MoleMaster99"
                                        : index === 11
                                        ? "CryptoWhacker"
                                        : `Player${1000 + index}`}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                      Level {24 - index > 0 ? 24 - index : 1}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                  <div className="font-bold">
                                    {2456 - index * 67} pts
                                  </div>
                                  <div className="text-yellow-400 font-bold">
                                    {index === 0
                                      ? "5,000 SMT"
                                      : index === 1
                                      ? "2,500 SMT"
                                      : index === 2
                                      ? "1,000 SMT"
                                      : index <= 5
                                      ? "500 SMT"
                                      : index <= 10
                                      ? "250 SMT"
                                      : "100 SMT"}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            )}
            {/* Rewards Content */}
            {currentTab === "rewards" && (
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-cyan-300">
                        Your Balance
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        Current tokens and rewards
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="bg-yellow-500 p-2 rounded-full">
                              <i className="fas fa-coins text-yellow-900"></i>
                            </div>
                            <div>
                              <p className="font-medium">MoleStrike Tokens</p>
                              <p className="text-xs text-gray-400">SMT</p>
                            </div>
                          </div>
                          <div className="text-xl font-bold">320</div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="bg-purple-700 p-2 rounded-full">
                              <i className="fas fa-bolt text-purple-300"></i>
                            </div>
                            <div>
                              <p className="font-medium">Game Points</p>
                              <p className="text-xs text-gray-400">
                                Used for rankings
                              </p>
                            </div>
                          </div>
                          <div className="text-xl font-bold">1,245</div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="bg-green-700 p-2 rounded-full">
                              <i className="fas fa-ticket-alt text-green-300"></i>
                            </div>
                            <div>
                              <p className="font-medium">
                                Special Event Tickets
                              </p>
                              <p className="text-xs text-gray-400">
                                For tournament entry
                              </p>
                            </div>
                          </div>
                          <div className="text-xl font-bold">2</div>
                        </div>
                      </div>
                      <div className="mt-6">
                        <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white !rounded-button whitespace-nowrap">
                          <i className="fas fa-wallet mr-2"></i> Connect Wallet
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-800 border-gray-700 col-span-2">
                    <CardHeader>
                      <CardTitle className="text-cyan-300">
                        Rewards Distribution
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        How you've earned your tokens
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div ref={rewardsChartRef} className="h-64 w-full"></div>
                    </CardContent>
                  </Card>
                </div>
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-cyan-300">
                      Reward History
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Your recent earnings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[300px]">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="bg-green-700 p-2 rounded-full">
                              <i className="fas fa-trophy text-green-300"></i>
                            </div>
                            <div>
                              <p className="font-medium">
                                Daily Challenge Completed
                              </p>
                              <p className="text-xs text-gray-400">
                                Speed Challenge
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <div className="text-green-400 font-bold">
                              +50 SMT
                            </div>
                            <div className="text-xs text-gray-400">
                              Today, 10:23 AM
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="bg-blue-700 p-2 rounded-full">
                              <i className="fas fa-gamepad text-blue-300"></i>
                            </div>
                            <div>
                              <p className="font-medium">Game Completion</p>
                              <p className="text-xs text-gray-400">
                                Score: 350
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <div className="text-green-400 font-bold">
                              +10 SMT
                            </div>
                            <div className="text-xs text-gray-400">
                              Today, 9:45 AM
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="bg-purple-700 p-2 rounded-full">
                              <i className="fas fa-medal text-purple-300"></i>
                            </div>
                            <div>
                              <p className="font-medium">
                                Achievement Unlocked
                              </p>
                              <p className="text-xs text-gray-400">
                                Speed Demon
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <div className="text-green-400 font-bold">
                              +25 SMT
                            </div>
                            <div className="text-xs text-gray-400">
                              Yesterday, 4:12 PM
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="bg-yellow-700 p-2 rounded-full">
                              <i className="fas fa-calendar-week text-yellow-300"></i>
                            </div>
                            <div>
                              <p className="font-medium">Weekly Tournament</p>
                              <p className="text-xs text-gray-400">
                                Ranked #15
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <div className="text-green-400 font-bold">
                              +100 SMT
                            </div>
                            <div className="text-xs text-gray-400">
                              Apr 7, 2025
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="bg-green-700 p-2 rounded-full">
                              <i className="fas fa-trophy text-green-300"></i>
                            </div>
                            <div>
                              <p className="font-medium">
                                Daily Challenge Completed
                              </p>
                              <p className="text-xs text-gray-400">
                                High Score Challenge
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <div className="text-green-400 font-bold">
                              +30 SMT
                            </div>
                            <div className="text-xs text-gray-400">
                              Apr 6, 2025
                            </div>
                          </div>
                        </div>
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-cyan-300">
                      Token Utility
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Ways to use your MoleStrike Tokens
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-gradient-to-br from-purple-900 to-blue-900 rounded-lg flex flex-col items-center text-center">
                        <div className="bg-purple-700 p-3 rounded-full mb-3">
                          <i className="fas fa-palette text-2xl text-purple-300"></i>
                        </div>
                        <h3 className="font-bold mb-2">Custom Skins</h3>
                        <p className="text-sm text-gray-300 mb-3">
                          Personalize your mallet with unique skins
                        </p>
                        <p className="font-bold text-yellow-400">100 SMT</p>
                        <Button className="mt-3 bg-purple-600 hover:bg-purple-700 text-white !rounded-button whitespace-nowrap">
                          Shop Now
                        </Button>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-blue-900 to-green-900 rounded-lg flex flex-col items-center text-center">
                        <div className="bg-blue-700 p-3 rounded-full mb-3">
                          <i className="fas fa-bolt text-2xl text-blue-300"></i>
                        </div>
                        <h3 className="font-bold mb-2">Power-Ups</h3>
                        <p className="text-sm text-gray-300 mb-3">
                          Get advantages in daily challenges
                        </p>
                        <p className="font-bold text-yellow-400">50 SMT</p>
                        <Button className="mt-3 bg-blue-600 hover:bg-blue-700 text-white !rounded-button whitespace-nowrap">
                          Buy Power-Ups
                        </Button>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-green-900 to-yellow-900 rounded-lg flex flex-col items-center text-center">
                        <div className="bg-green-700 p-3 rounded-full mb-3">
                          <i className="fas fa-ticket-alt text-2xl text-green-300"></i>
                        </div>
                        <h3 className="font-bold mb-2">Tournament Entry</h3>
                        <p className="text-sm text-gray-300 mb-3">
                          Join special tournaments with bigger prizes
                        </p>
                        <p className="font-bold text-yellow-400">200 SMT</p>
                        <Button className="mt-3 bg-green-600 hover:bg-green-700 text-white !rounded-button whitespace-nowrap">
                          Enter Tournament
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            {/* Settings Content */}
            {currentTab === "settings" && (
              <div className="p-6 space-y-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-cyan-300">
                      Account Settings
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Manage your account details
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="username">Username</Label>
                          <Input
                            id="username"
                            defaultValue="CryptoWhacker"
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            defaultValue="user@example.com"
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="bio">Bio</Label>
                        <Input
                          id="bio"
                          defaultValue="StarkNet enthusiast and mole whacking champion!"
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="marketing" />
                        <Label htmlFor="marketing">
                          Receive marketing emails
                        </Label>
                      </div>
                      <Button className="bg-purple-600 hover:bg-purple-700 text-white !rounded-button whitespace-nowrap">
                        Save Changes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-cyan-300">
                      Game Settings
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Customize your gameplay experience
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="sound">Sound Effects</Label>
                        <div className="flex items-center space-x-2">
                          <i className="fas fa-volume-mute text-gray-400"></i>
                          <input
                            type="range"
                            id="sound"
                            min="0"
                            max="100"
                            defaultValue="80"
                            className="w-32"
                          />
                          <i className="fas fa-volume-up text-gray-400"></i>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="music">Background Music</Label>
                        <div className="flex items-center space-x-2">
                          <i className="fas fa-volume-mute text-gray-400"></i>
                          <input
                            type="range"
                            id="music"
                            min="0"
                            max="100"
                            defaultValue="60"
                            className="w-32"
                          />
                          <i className="fas fa-volume-up text-gray-400"></i>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="notifications" defaultChecked />
                        <Label htmlFor="notifications">
                          Game notifications
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="highcontrast" />
                        <Label htmlFor="highcontrast">High contrast mode</Label>
                      </div>
                      <Button className="bg-purple-600 hover:bg-purple-700 text-white !rounded-button whitespace-nowrap">
                        Save Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-cyan-300">
                      Wallet Connection
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Manage your blockchain wallet
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-700 rounded-lg flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <div className="bg-purple-700 p-2 rounded-full">
                            <i className="fas fa-wallet text-purple-300"></i>
                          </div>
                          <div>
                            <p className="font-medium">StarkNet Wallet</p>
                            <p className="text-xs text-gray-400">
                              Not connected
                            </p>
                          </div>
                        </div>
                        <Button className="bg-purple-600 hover:bg-purple-700 text-white !rounded-button whitespace-nowrap">
                          Connect
                        </Button>
                      </div>
                      <div className="p-4 bg-gray-700 rounded-lg">
                        <h3 className="font-medium mb-2">
                          Transaction History
                        </h3>
                        <p className="text-sm text-gray-400">
                          Connect your wallet to view transaction history
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="autoconnect" />
                        <Label htmlFor="autoconnect">
                          Auto-connect wallet on login
                        </Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 text-white">
      {/* Navigation */}
      <header className="w-full max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3 animate-slideInLeft">
          <img
            src="https://readdy.ai/api/search-image?query=cute cartoon mole character with goggles and a mining helmet, digital art style, game mascot, purple background, high quality, detailed, vibrant colors&width=60&height=60&seq=logo1&orientation=squarish"
            alt="MoleStrike Logo"
            className="h-12 w-12 animate-float"
          />
          <h1 className="text-2xl font-bold text-purple-300">MoleStrike</h1>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <a
            href="#features"
            className="text-cyan-300 hover:text-purple-300 transition-colors cursor-pointer animate-slideInLeft animate-delay-100"
          >
            Features
          </a>
          <a
            href="#how-to-play"
            className="text-cyan-300 hover:text-purple-300 transition-colors cursor-pointer animate-slideInLeft animate-delay-200"
          >
            How to Play
          </a>
          <a
            href="#leaderboard"
            className="text-cyan-300 hover:text-purple-300 transition-colors cursor-pointer animate-slideInLeft animate-delay-300"
          >
            Leaderboard
          </a>
          <a
            href="#about"
            className="text-cyan-300 hover:text-purple-300 transition-colors cursor-pointer animate-slideInLeft animate-delay-400"
          >
            About
          </a>
        </nav>
        <div className="flex items-center space-x-3 animate-slideInRight">
          <Button
            variant="outline"
            onClick={() => setShowLoginModal(true)}
            className="border-purple-500 hover:bg-purple-700 text-cyan-300 !rounded-button whitespace-nowrap"
          >
            Login
          </Button>
          <Button
            onClick={() => setShowSignUpModal(true)}
            className="bg-purple-600 hover:bg-purple-700 text-cyan-100 !rounded-button whitespace-nowrap animate-pulse"
          >
            Play Now
          </Button>
        </div>
      </header>
      {/* Hero Section */}
      <section
        className="relative w-full max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center"
        style={{
          backgroundImage: `url('https://public.readdy.ai/ai/img_res/7226c1dadead9ad8155b4f49d1ab00fd.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "1rem",
          overflow: "hidden",
        }}
      >
        <div className="md:w-1/2 z-10 bg-gray-900 bg-opacity-80 p-8 rounded-xl animate-fadeIn">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-purple-300">
            The Decentralized
            <br />
            Whack-a-Mole Experience
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            MoleStrike combines the classic fun of Whack-a-Mole with the
            transparency, security, and innovation of blockchain technology on
            StarkNet.
          </p>
          <div className="flex space-x-4">
            <Button
              onClick={() => setShowSignUpModal(true)}
              className="bg-purple-600 hover:bg-purple-700 text-purple-100 px-8 py-6 text-lg !rounded-button whitespace-nowrap animate-pulse"
            >
              Start Playing
            </Button>
            <Button
              variant="outline"
              className="border-purple-500 hover:bg-purple-700 text-purple-300 px-8 py-6 text-lg !rounded-button whitespace-nowrap"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section id="features" className="w-full max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16 animate-fadeIn">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-cyan-300">
            Key Features
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            MoleStrike brings the excitement of Whack-a-Mole into the
            decentralized era, offering a unique blend of fun, competition, and
            blockchain technology.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-gray-800 border-gray-700 animate-slideInUp animate-delay-100 relative overflow-hidden">
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
            <CardHeader className="pb-2">
              <div className="w-14 h-14 bg-purple-900 rounded-full flex items-center justify-center mb-4 animate-float">
                <i className="fas fa-gamepad text-2xl text-purple-300"></i>
              </div>
              <CardTitle className="text-cyan-300">Daily Challenges</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Engage in daily Whack-a-Mole challenges that test your reflexes
                and strategic thinking. Each day brings new challenges with
                varying difficulty levels.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700 animate-slideInUp animate-delay-200 relative overflow-hidden">
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
            <CardHeader className="pb-2">
              <div className="w-14 h-14 bg-blue-900 rounded-full flex items-center justify-center mb-4 animate-float">
                <i className="fas fa-coins text-2xl text-blue-300"></i>
              </div>
              <CardTitle className="text-cyan-300">On-Chain Rewards</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Earn rewards for your performance in the form of digital assets
                and tokens. All rewards are recorded on the blockchain, ensuring
                transparency.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700 animate-slideInUp animate-delay-300 relative overflow-hidden">
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
            <CardHeader className="pb-2">
              <div className="w-14 h-14 bg-green-900 rounded-full flex items-center justify-center mb-4 animate-float">
                <i className="fas fa-trophy text-2xl text-green-300"></i>
              </div>
              <CardTitle className="text-cyan-300">
                Decentralized Leaderboards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Compete with players from around the world on decentralized
                leaderboards. Track your progress and see how you stack up
                against others in real-time.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700 animate-slideInUp animate-delay-400 relative overflow-hidden">
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
            <CardHeader className="pb-2">
              <div className="w-14 h-14 bg-yellow-900 rounded-full flex items-center justify-center mb-4 animate-float">
                <i className="fas fa-shield-alt text-2xl text-yellow-300"></i>
              </div>
              <CardTitle className="text-cyan-300">
                Blockchain Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Enjoy the security and transparency of blockchain technology.
                All game data, scores, and rewards are secured on the StarkNet
                blockchain.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700 animate-slideInUp animate-delay-500 relative overflow-hidden">
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
            <CardHeader className="pb-2">
              <div className="w-14 h-14 bg-red-900 rounded-full flex items-center justify-center mb-4 animate-float">
                <i className="fas fa-users text-2xl text-red-300"></i>
              </div>
              <CardTitle className="text-cyan-300">
                Community Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Connect with other players through in-game social features.
                Share your achievements and compete for top spots on the global
                leaderboards.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700 animate-slideInUp animate-delay-500 relative overflow-hidden">
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
            <CardHeader className="pb-2">
              <div className="w-14 h-14 bg-indigo-900 rounded-full flex items-center justify-center mb-4 animate-float">
                <i className="fas fa-wallet text-2xl text-indigo-300"></i>
              </div>
              <CardTitle className="text-cyan-300">
                StarkNet Integration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Seamlessly connect your StarkNet wallet to play, earn, and track
                your rewards. Experience the future of gaming with blockchain
                technology.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      {/* How to Play Section */}
      <section
        id="how-to-play"
        className="w-full max-w-7xl mx-auto px-6 py-20 bg-gray-800 rounded-2xl"
      >
        <div className="text-center mb-16 animate-fadeIn">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-cyan-300">
            How to Play
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Getting started with MoleStrike is easy. Follow these simple steps
            to begin your decentralized Whack-a-Mole adventure.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="space-y-8">
              <div className="flex items-start space-x-4 animate-slideInLeft">
                <div className="bg-purple-900 text-cyan-100 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shrink-0 animate-float">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-cyan-300">
                    Sign Up
                  </h3>
                  <p className="text-gray-300">
                    Create your account and connect your StarkNet wallet to get
                    started.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4 animate-slideInLeft animate-delay-200">
                <div className="bg-purple-900 text-cyan-100 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shrink-0 animate-float">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-cyan-300">
                    Daily Challenges
                  </h3>
                  <p className="text-gray-300">
                    Participate in daily Whack-a-Mole challenges to earn rewards
                    and points.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4 animate-slideInLeft animate-delay-300">
                <div className="bg-purple-900 text-cyan-100 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shrink-0 animate-float">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-cyan-300">
                    Leaderboards
                  </h3>
                  <p className="text-gray-300">
                    Compete with other players and climb the global
                    leaderboards.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4 animate-slideInLeft animate-delay-400">
                <div className="bg-purple-900 text-cyan-100 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shrink-0 animate-float">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-cyan-300">
                    Rewards
                  </h3>
                  <p className="text-gray-300">
                    Collect your rewards and track your progress on the
                    blockchain.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2 animate-slideInRight">
            <img
              src="https://public.readdy.ai/ai/img_res/5fa66c2dd7781f3daf6212469675e347.jpg"
              alt="How to Play"
              className="rounded-xl shadow-2xl w-full animate-float"
            />
          </div>
        </div>
      </section>
      {/* Leaderboard Preview */}
      <section id="leaderboard" className="w-full max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16 animate-fadeIn">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-cyan-300">
            Global Leaderboard
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            See the top players from around the world and compete to claim your
            spot at the top.
          </p>
        </div>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-lg animate-slideInUp">
                <div className="flex items-center space-x-4">
                  <div className="bg-yellow-800 text-cyan-100 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg animate-pulse">
                    1
                  </div>
                  <Avatar className="h-12 w-12 border-2 border-yellow-800 animate-float">
                    <AvatarImage src="https://public.readdy.ai/ai/img_res/52333777ffb00525c98c3c9567f2338e.jpg" />
                    <AvatarFallback>MK</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-gray-900">MoleKing</p>
                    <p className="text-sm text-gray-800">Level 24</p>
                  </div>
                </div>
                <div className="font-bold text-gray-900 text-xl">2,456 pts</div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-500 to-gray-400 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-700 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
                    2
                  </div>
                  <Avatar className="h-12 w-12 border-2 border-gray-700">
                    <AvatarImage src="https://public.readdy.ai/ai/img_res/6f2ecd622433a2d17c6a9adae825fc0d.jpg" />
                    <AvatarFallback>WM</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-gray-900">WhackMaster</p>
                    <p className="text-sm text-gray-800">Level 22</p>
                  </div>
                </div>
                <div className="font-bold text-gray-900 text-xl">2,189 pts</div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-700 to-amber-600 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="bg-amber-900 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
                    3
                  </div>
                  <Avatar className="h-12 w-12 border-2 border-amber-900">
                    <AvatarImage src="https://public.readdy.ai/ai/img_res/4edfacf825ed745e77cac134c13583d4.jpg" />
                    <AvatarFallback>MM</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-gray-900">MoleMaster99</p>
                    <p className="text-sm text-gray-800">Level 20</p>
                  </div>
                </div>
                <div className="font-bold text-gray-900 text-xl">1,987 pts</div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
                    4
                  </div>
                  <Avatar className="h-12 w-12 border-2 border-gray-600">
                    <AvatarImage src="https://public.readdy.ai/ai/img_res/42d77c485387eebd6d9174cab6f69334.jpg" />
                    <AvatarFallback>BC</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold">BlockChampion</p>
                    <p className="text-sm text-gray-400">Level 19</p>
                  </div>
                </div>
                <div className="font-bold text-xl">1,845 pts</div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
                    5
                  </div>
                  <Avatar className="h-12 w-12 border-2 border-gray-600">
                    <AvatarImage src="https://public.readdy.ai/ai/img_res/f91aac01876a5ecec270a96126581b76.jpg" />
                    <AvatarFallback>SW</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold">StarkWhacker</p>
                    <p className="text-sm text-gray-400">Level 18</p>
                  </div>
                </div>
                <div className="font-bold text-xl">1,756 pts</div>
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <Button
                onClick={() => setShowSignUpModal(true)}
                className="bg-purple-600 hover:bg-purple-700 text-cyan-100 !rounded-button whitespace-nowrap animate-pulse"
              >
                Join the Competition
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
      {/* Testimonials */}
      <section className="w-full max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16 animate-fadeIn">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-cyan-300">
            What Players Say
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Hear from our community of players about their MoleStrike
            experience.
          </p>
        </div>
        <Swiper
          modules={swiperModules}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="pb-12"
        >
          <SwiperSlide>
            <Card className="bg-gray-800 border-gray-700 h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex-1">
                  <div className="text-yellow-400 mb-4">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <p className="text-gray-300 italic mb-6">
                    "MoleStrike combines the nostalgic fun of Whack-a-Mole with
                    cutting-edge blockchain technology. I love earning rewards
                    while having fun!"
                  </p>
                </div>
                <div className="flex items-center space-x-3 mt-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="https://public.readdy.ai/ai/img_res/bf65580788a23b6ac5611c085082dfb2.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">CryptoGamer</p>
                    <p className="text-xs text-gray-400">Level 17 Player</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card className="bg-gray-800 border-gray-700 h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex-1">
                  <div className="text-yellow-400 mb-4">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star-half-alt"></i>
                  </div>
                  <p className="text-gray-300 italic mb-6">
                    "The daily challenges keep me coming back every day. It's
                    addictive knowing that my scores are permanently recorded on
                    the blockchain!"
                  </p>
                </div>
                <div className="flex items-center space-x-3 mt-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="https://public.readdy.ai/ai/img_res/903fd32ce6593d6f90dbdbad97c75225.jpg" />
                    <AvatarFallback>AS</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">BlockchainBabe</p>
                    <p className="text-xs text-gray-400">Level 15 Player</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card className="bg-gray-800 border-gray-700 h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex-1">
                  <div className="text-yellow-400 mb-4">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <p className="text-gray-300 italic mb-6">
                    "I've been playing games for years, but MoleStrike is the
                    first one where I actually own my achievements and rewards.
                    The StarkNet integration is seamless!"
                  </p>
                </div>
                <div className="flex items-center space-x-3 mt-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="https://public.readdy.ai/ai/img_res/c8d2bdfc533a6dae5059d98eb1a08eb9.jpg" />
                    <AvatarFallback>TK</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">TokenKing</p>
                    <p className="text-xs text-gray-400">Level 20 Player</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card className="bg-gray-800 border-gray-700 h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex-1">
                  <div className="text-yellow-400 mb-4">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <p className="text-gray-300 italic mb-6">
                    "The community features are amazing! I've made friends from
                    all over the world who share my passion for both gaming and
                    blockchain technology."
                  </p>
                </div>
                <div className="flex items-center space-x-3 mt-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="https://public.readdy.ai/ai/img_res/55a3c59b4fa4d03657491c6d089796cb.jpg" />
                    <AvatarFallback>GG</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">GameGoddess</p>
                    <p className="text-xs text-gray-400">Level 16 Player</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </SwiperSlide>
        </Swiper>
      </section>
      {/* About Section */}
      <section
        id="about"
        className="w-full max-w-7xl mx-auto px-6 py-20 bg-gray-800 rounded-2xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://public.readdy.ai/ai/img_res/70acacf86e293d364a86aac69b82febd.jpg"
              alt="About MoleStrike"
              className="rounded-xl shadow-2xl w-full"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-cyan-300 animate-slideInUp">
              About MoleStrike
            </h2>
            <p className="text-lg text-gray-300 mb-6 animate-slideInUp animate-delay-100">
              MoleStrike was created by a team of passionate gamers and
              blockchain enthusiasts who wanted to bring the fun of classic
              arcade games to the decentralized world.
            </p>
            <p className="text-lg text-gray-300 mb-6 animate-slideInUp animate-delay-200">
              Built on StarkNet, MoleStrike leverages the power of Layer 2
              scaling to provide a seamless, fast, and low-cost gaming
              experience while maintaining all the benefits of blockchain
              technology.
            </p>
            <p className="text-lg text-gray-300 mb-8 animate-slideInUp animate-delay-300">
              Our mission is to bridge the gap between traditional gaming and
              blockchain technology, creating experiences that are both fun and
              rewarding.
            </p>
            <Button
              variant="outline"
              className="border-purple-500 hover:bg-purple-700 text-cyan-300 !rounded-button whitespace-nowrap animate-slideInUp animate-delay-400"
            >
              Learn More About StarkNet
            </Button>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="w-full max-w-7xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-purple-900 to-blue-900 rounded-2xl p-12 text-center animate-fadeIn">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-cyan-300">
            Ready to Join the Game?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Start your MoleStrike adventure today and experience the future of
            gaming on the blockchain.
          </p>
          <Button
            onClick={() => setShowSignUpModal(true)}
            className="bg-white text-purple-900 hover:bg-gray-200 px-8 py-6 text-lg font-bold !rounded-button whitespace-nowrap animate-pulse"
          >
            Play Now
          </Button>
        </div>
      </section>
      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-12 border-t border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="https://readdy.ai/api/search-image?query=cute cartoon mole character with goggles and a mining helmet, digital art style, game mascot, purple background, high quality, detailed, vibrant colors&width=60&height=60&seq=logo1&orientation=squarish"
                alt="MoleStrike Logo"
                className="h-10 w-10 animate-float"
              />
              <h3 className="text-xl font-bold text-cyan-300">MoleStrike</h3>
            </div>
            <p className="text-gray-400 mb-4">
              The Decentralized Whack-a-Mole Experience on StarkNet.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <i className="fab fa-twitter text-lg"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <i className="fab fa-discord text-lg"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <i className="fab fa-telegram text-lg"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <i className="fab fa-github text-lg"></i>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-cyan-300">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#features"
                  className="text-gray-400 hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#how-to-play"
                  className="text-gray-400 hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  How to Play
                </a>
              </li>
              <li>
                <a
                  href="#leaderboard"
                  className="text-gray-400 hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  Leaderboard
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-gray-400 hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  About
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-cyan-300">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  StarkNet Guide
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-cyan-300">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">
            © 2025 MoleStrike. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-gray-400">Powered by</span>
            <i className="fab fa-ethereum text-lg text-gray-300"></i>
            <span className="font-medium">StarkNet</span>
          </div>
        </div>
      </footer>
      {/* Login Modal */}
      <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl text-cyan-300">
              Welcome Back
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Login to your MoleStrike account to continue your adventure.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleLogin} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email or Username</Label>
              <Input
                id="email"
                type="text"
                placeholder="Enter your email or username"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="text-sm text-purple-400 hover:text-purple-300 cursor-pointer"
                >
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">Remember me</Label>
            </div>
            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-cyan-100 !rounded-button whitespace-nowrap animate-pulse"
            >
              Login
            </Button>
          </form>
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gray-800 px-2 text-gray-400 text-sm">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="bg-transparent border-gray-600 hover:bg-gray-700 text-white !rounded-button whitespace-nowrap"
            >
              <i className="fab fa-google mr-2"></i> Google
            </Button>
            <Button
              variant="outline"
              className="bg-transparent border-gray-600 hover:bg-gray-700 text-white !rounded-button whitespace-nowrap"
            >
              <i className="fab fa-discord mr-2"></i> Discord
            </Button>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
            <div className="text-sm text-gray-400">
              Don't have an account?{" "}
              <span
                className="text-purple-400 hover:text-purple-300 cursor-pointer"
                onClick={() => {
                  setShowLoginModal(false);
                  setShowSignUpModal(true);
                }}
              >
                Sign up
              </span>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Sign Up Modal */}
      <Dialog open={showSignUpModal} onOpenChange={setShowSignUpModal}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl text-cyan-300">
              Join MoleStrike
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Create your account to start playing and earning rewards.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSignUp} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Choose a username"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-email">Email</Label>
              <Input
                id="signup-email"
                type="email"
                placeholder="Enter your email"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-password">Password</Label>
              <Input
                id="signup-password"
                type="password"
                placeholder="Create a password"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms" className="text-sm">
                I agree to the{" "}
                <a href="#" className="text-purple-400 hover:text-purple-300">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-purple-400 hover:text-purple-300">
                  Privacy Policy
                </a>
              </Label>
            </div>
            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-cyan-100 !rounded-button whitespace-nowrap animate-pulse"
            >
              Create Account
            </Button>
          </form>
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gray-800 px-2 text-gray-400 text-sm">
                Or sign up with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="bg-transparent border-gray-600 hover:bg-gray-700 text-white !rounded-button whitespace-nowrap"
            >
              <i className="fab fa-google mr-2"></i> Google
            </Button>
            <Button
              variant="outline"
              className="bg-transparent border-gray-600 hover:bg-gray-700 text-white !rounded-button whitespace-nowrap"
            >
              <i className="fab fa-discord mr-2"></i> Discord
            </Button>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
            <div className="text-sm text-gray-400">
              Already have an account?{" "}
              <span
                className="text-purple-400 hover:text-purple-300 cursor-pointer"
                onClick={() => {
                  setShowSignUpModal(false);
                  setShowLoginModal(true);
                }}
              >
                Login
              </span>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default App;

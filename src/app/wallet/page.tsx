"use client";

import { useState } from "react";
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  Copy,
  ExternalLink,
} from "lucide-react";

interface Transaction {
  id: string;
  type: "send" | "receive";
  amount: number;
  address: string;
  timestamp: string;
  status: "completed" | "pending";
}

export default function WalletPage() {
  const [isConnected] = useState(false);
  const [balance] = useState(185);
  const [transactions] = useState<Transaction[]>([
    {
      id: "tx1",
      type: "receive",
      amount: 10,
      address: "0x1234...5678",
      timestamp: "2024-03-20 14:30",
      status: "completed",
    },
    {
      id: "tx2",
      type: "receive",
      amount: 25,
      address: "0x8765...4321",
      timestamp: "2024-03-19 16:45",
      status: "completed",
    },
    {
      id: "tx3",
      type: "send",
      amount: 5,
      address: "0x9876...1234",
      timestamp: "2024-03-18 09:15",
      status: "completed",
    },
  ]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 ml-64">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-yellow-400 flex items-center gap-3">
            <Wallet className="w-8 h-8" />
            Wallet
          </h1>
          <p className="text-gray-400 mt-1">
            Manage your STARK tokens and transactions
          </p>
        </div>

        {!isConnected ? (
          <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl p-8 text-center">
            <Wallet className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
            <p className="text-gray-400 mb-6">
              Connect your StarkNet wallet to access your balance and
              transaction history
            </p>
            <button className="px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg font-medium transition-colors">
              Connect Wallet
            </button>
          </div>
        ) : (
          <>
            {/* Balance Card */}
            <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl p-6 mb-8">
              <h2 className="text-gray-400 mb-2">Total Balance</h2>
              <div className="text-4xl font-bold mb-4">{balance} STARK</div>
              <div className="flex gap-4">
                <button className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg font-medium transition-colors flex items-center gap-2">
                  <ArrowUpRight className="w-4 h-4" />
                  Send
                </button>
                <button className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg font-medium transition-colors flex items-center gap-2">
                  <ArrowDownLeft className="w-4 h-4" />
                  Receive
                </button>
              </div>
            </div>

            {/* Wallet Info */}
            <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">Wallet Information</h2>
              <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                <span className="text-gray-400">Wallet Address</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono">0x1234...5678</span>
                  <button
                    onClick={() => copyToClipboard("FULL_ADDRESS_HERE")}
                    className="p-1 hover:text-purple-400 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 hover:text-purple-400 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Transaction History */}
            <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-gray-700/50">
                <h2 className="text-xl font-bold">Transaction History</h2>
              </div>
              <div className="divide-y divide-gray-700/50">
                {transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="p-4 hover:bg-gray-700/30 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {tx.type === "receive" ? (
                          <ArrowDownLeft className="w-5 h-5 text-green-400" />
                        ) : (
                          <ArrowUpRight className="w-5 h-5 text-red-400" />
                        )}
                        <div>
                          <div className="font-medium">
                            {tx.type === "receive" ? "Received" : "Sent"}{" "}
                            {tx.amount} STARK
                          </div>
                          <div className="text-sm text-gray-400">
                            {tx.address}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-400">
                          {tx.timestamp}
                        </div>
                        <div className="text-sm text-green-400">
                          {tx.status}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

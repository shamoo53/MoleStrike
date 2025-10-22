"use client";

import { useState } from "react";
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Book,
  MessageCircle,
  Mail,
} from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

export default function HelpPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs: FAQ[] = [
    {
      question: "How do I play MoleStrike?",
      answer:
        "MoleStrike is a blockchain-based whack-a-mole game. Click or tap on the moles as they appear to earn points. The faster you react, the more points you'll earn. Complete challenges and tournaments to earn STARK tokens!",
    },
    {
      question: "How do I earn STARK tokens?",
      answer:
        "You can earn STARK tokens by completing daily challenges, participating in tournaments, achieving high scores, and ranking high on the leaderboard. The better you perform, the more tokens you'll earn!",
    },
    {
      question: "How do I connect my wallet?",
      answer:
        "Click on the 'Connect Wallet' button in the Wallet page or game interface. We support various StarkNet wallets. Once connected, you'll be able to receive and manage your STARK tokens.",
    },
    {
      question: "What are daily challenges?",
      answer:
        "Daily challenges are special game modes with specific objectives. They refresh every 24 hours and offer bonus STARK token rewards for completion. Check the dashboard for active challenges!",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 ml-64">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-yellow-400 flex items-center gap-3">
            <HelpCircle className="w-8 h-8" />
            Help Center
          </h1>
          <p className="text-gray-400 mt-1">Find answers and get support</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FAQs */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-gray-700/50">
                <h2 className="text-xl font-bold">
                  Frequently Asked Questions
                </h2>
              </div>
              <div className="divide-y divide-gray-700/50">
                {faqs.map((faq, index) => (
                  <div key={index} className="p-6">
                    <button
                      className="w-full flex items-center justify-between"
                      onClick={() =>
                        setOpenFAQ(openFAQ === index ? null : index)
                      }
                    >
                      <h3 className="font-medium text-left">{faq.question}</h3>
                      {openFAQ === index ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                    {openFAQ === index && (
                      <p className="mt-4 text-gray-400">{faq.answer}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1 space-y-6">
            {/* Game Guide */}
            <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Book className="w-6 h-6 text-blue-400" />
                <h2 className="text-xl font-bold">Game Guide</h2>
              </div>
              <p className="text-gray-400 mb-4">
                Learn game mechanics, strategies, and tips to improve your
                score.
              </p>
              <button className="w-full py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition-colors">
                Read Guide
              </button>
            </div>

            {/* Contact Support */}
            <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <MessageCircle className="w-6 h-6 text-blue-400" />
                <h2 className="text-xl font-bold">Need Help?</h2>
              </div>
              <p className="text-gray-400 mb-4">
                Can't find what you're looking for? Our support team is here to
                help.
              </p>
              <button className="w-full py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                <Mail className="w-5 h-5" />
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

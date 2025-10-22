"use client";

import { Newspaper, Star, Clock, ChevronRight, Tag } from "lucide-react";

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  imageUrl: string;
  featured?: boolean;
}

export default function NewsPage() {
  const articles: NewsArticle[] = [
    {
      id: "1",
      title: "StarkNet Ecosystem Reaches New Milestone",
      excerpt:
        "The StarkNet ecosystem has achieved a significant milestone with over 1 million transactions processed in a single day...",
      category: "Ecosystem",
      date: "March 20, 2024",
      readTime: "5 min read",
      imageUrl: "/images/news/ecosystem.jpg",
      featured: true,
    },
    {
      id: "2",
      title: "New Gaming Partnership Announced",
      excerpt:
        "Major gaming studio partners with StarkNet to bring blockchain gaming to millions of players...",
      category: "Gaming",
      date: "March 19, 2024",
      readTime: "4 min read",
      imageUrl: "/images/news/gaming.jpg",
      featured: true,
    },
    {
      id: "3",
      title: "Technical Update: Performance Improvements",
      excerpt:
        "Latest protocol update brings significant performance improvements and reduced transaction costs...",
      category: "Technical",
      date: "March 18, 2024",
      readTime: "7 min read",
      imageUrl: "/images/news/technical.jpg",
    },
    {
      id: "4",
      title: "Community Spotlight: Developer Showcase",
      excerpt:
        "Highlighting the amazing projects built by our community developers this month...",
      category: "Community",
      date: "March 17, 2024",
      readTime: "6 min read",
      imageUrl: "/images/news/community.jpg",
    },
  ];

  const categories = [
    "All",
    "Ecosystem",
    "Gaming",
    "Technical",
    "Community",
    "Events",
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 ml-64">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-yellow-400 flex items-center gap-3">
            <Newspaper className="w-8 h-8" />
            News & Updates
          </h1>
          <p className="text-gray-400 mt-1">
            Stay updated with the latest from MoleStrike
          </p>
        </div>

        {/* Categories */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-full font-medium transition-colors whitespace-nowrap"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {articles
            .filter((article) => article.featured)
            .map((article) => (
              <div
                key={article.id}
                className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl overflow-hidden group cursor-pointer"
              >
                <div className="h-48 bg-gray-700 relative">
                  <div className="absolute top-3 left-3">
                    <span className="bg-yellow-500 text-black px-2 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                    <Tag className="w-4 h-4" />
                    {article.category}
                    <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                    <Clock className="w-4 h-4" />
                    {article.readTime}
                  </div>
                  <h2 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-gray-400 mb-4">{article.excerpt}</p>
                  <div className="flex items-center text-purple-400 font-medium">
                    Read More
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Regular Articles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles
            .filter((article) => !article.featured)
            .map((article) => (
              <div
                key={article.id}
                className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl overflow-hidden group cursor-pointer"
              >
                <div className="h-40 bg-gray-700"></div>
                <div className="p-4">
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                    <Tag className="w-4 h-4" />
                    {article.category}
                    <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                    <Clock className="w-4 h-4" />
                    {article.readTime}
                  </div>
                  <h3 className="font-bold mb-2 group-hover:text-purple-400 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-400">{article.excerpt}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
